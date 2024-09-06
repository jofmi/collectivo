import nodemailer, { type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { createItems, readItem, readUser, updateItem } from "@directus/sdk";
import { parse } from "marked";

// Disable for development
const SENDING_ACTIVE = true;

// Wait for given milliseconds
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Handle endpoint calls
export default defineEventHandler(async (event) => {
  try {
    return await handleCampaignUpdate(event);
  } catch (error) {
    console.log("Error in campaigns_update_send.post.ts");
    throw error;
  }
});

async function handleCampaignUpdate(event: any) {
  // Protect route with API Token
  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  console.log("Received request", body);

  // Ignore requests where there were no changes to the campaign status or the new status is not "pending"
  if (
    !body.payload ||
    !body.payload.messages_campaign_status ||
    body.payload.messages_campaign_status !== "pending"
  ) {
    return;
  }

  let i = 0;

  // Wait for maximum 1h if other campaign is currently sending
  while (campaignEndpoint.isActive || i > 3600) {
    i++;
    await sleep(1000);
  }

  campaignEndpoint.isActive = true;

  try {
    const campaignKeys = body.key ? [body.key] : body.keys;
    const results: Map<number, string> = new Map<number, string>();

    for (const campaignKey of campaignKeys) {
      const result = await executeCampaign(campaignKey);

      results.set(campaignKey, result);
    }

    campaignEndpoint.isActive = false;
    return results;
  } catch (error) {
    campaignEndpoint.isActive = false;
    throw error;
  }
}

async function executeCampaign(campaignKey: number): Promise<string> {
  try {
    const campaignData = await readCampaignData(campaignKey);

    if (campaignData.templateMethod !== "email") {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Campaign " +
          campaignKey +
          " is using a non-email template. Only templates with method 'email' are supported.",
      });
    }

    if (campaignData.campaignStatus !== "pending") {
      throw createError({
        statusCode: 400,
        statusMessage: "Campaign " + campaignKey + " is no longer pending",
      });
    }

    const pendingMessages = await writeMessagesAsPending(campaignData);

    const mailSender = MailSender.fromRuntimeConfig();

    let anySucceeded = false;
    let anyFailure = false;

    const unpersonalizedTemplate = campaignData.templateDesign.replaceAll(
      "{{content}}",
      campaignData.templateContent,
    );

    for (const pendingMessage of pendingMessages) {
      try {
        const recipientData = await readRecipientData(pendingMessage.recipient);

        const emailBody = renderTemplateForRecipient(
          unpersonalizedTemplate,
          recipientData,
          campaignData.campaignContext,
        );

        const sendMailOutcome = await mailSender.sendMail({
          to: recipientData.email,
          subject: campaignData.templateSubject,
          htmlBody: emailBody,
        });

        await updateMessageStatus(pendingMessage, sendMailOutcome);

        // Wait half a second before sending next message
        sleep(500);

        if (sendMailOutcome == "success") {
          anySucceeded = true;
        } else {
          anyFailure = true;
        }
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage:
            "Unexpected error while sending " +
            pendingMessage +
            " for campaign " +
            campaignKey +
            ": " +
            getErrorMessage(error),
        });
      }
    }

    let campaignStatus: string;

    if (anyFailure) {
      campaignStatus = anySucceeded ? "partially_failed" : "completely_failed";
    } else {
      campaignStatus = "sent";
    }

    await updateCampaignStatus(campaignKey, campaignStatus);

    return campaignStatus;
  } catch (error) {
    console.log("Executing campaign " + campaignKey + " failed unexpectedly");
    throw error;
  }
}

async function updateCampaignStatus(
  campaignKey: number,
  campaignStatus: string,
) {
  const directus = await useDirectusAdmin();

  directus.request(
    updateItem("messages_campaigns", campaignKey, {
      messages_campaign_status: campaignStatus,
    }),
  );
}

async function updateMessageStatus(
  handledMessage: MessageRecord,
  sendMailOutcome: string,
) {
  const directus = await useDirectusAdmin();

  directus.request(
    updateItem("messages_messages", handledMessage.recordId, {
      messages_message_status: sendMailOutcome == "success",
      messages_error_message:
        sendMailOutcome !== "success" ? sendMailOutcome : "",
    }),
  );
}

async function readCampaignData(campaignKey: number): Promise<CampaignData> {
  const directus = await useDirectusAdmin();

  const readResult: Record<string, any> = await directus.request(
    readItem("messages_campaigns", campaignKey, {
      fields: [
        "messages_campaign_status",
        "messages_context",
        "messages_template.messages_method",
        "messages_template.messages_subject",
        "messages_template.messages_content",
        "messages_template.messages_design.messages_design_html",
        "messages_recipients.directus_users_id",
      ],
    }),
  );

  return {
    campaignKey: campaignKey,
    campaignStatus: readResult["messages_campaign_status"],
    campaignContext: readResult["messages_context"],
    templateMethod: readResult["messages_template"]["messages_method"],
    templateSubject: readResult["messages_template"]["messages_subject"],
    templateContent: readResult["messages_template"]["messages_content"],
    templateDesign: readResult["messages_template"]["messages_design"]
      ? readResult["messages_template"]["messages_design"][
          "messages_design_html"
        ]
      : "{{content}}",
    recipients: readResult["messages_recipients"].map(
      (item: any) => item.directus_users_id,
    ),
  };
}

async function readRecipientData(recipientId: string): Promise<RecipientData> {
  const directus = await useDirectusAdmin();

  const readResult: Record<string, any> = await directus.request(
    readUser(recipientId, {
      fields: ["first_name", "last_name", "email"],
    }),
  );

  return {
    id: recipientId,
    first_name: readResult["first_name"],
    last_name: readResult["last_name"],
    email: readResult["email"],
  };
}

async function writeMessagesAsPending(
  campaignData: CampaignData,
): Promise<MessageRecord[]> {
  const directus = await useDirectusAdmin();

  const writeResults = await directus.request(
    createItems(
      "messages_messages",
      campaignData.recipients.map((recipient) => {
        return {
          messages_message_status: "pending",
          messages_campaign: campaignData.campaignKey,
          messages_recipient: recipient,
        };
      }),
    ),
  );

  return writeResults.map(toMessageRecord);
}

function toMessageRecord(writeResult: Record<string, any>): MessageRecord {
  return {
    recordId: writeResult.id,
    recipient: writeResult.messages_recipient,
  };
}

function replaceTemplateTags(
  template: string,
  context: { [key: string]: string },
): string {
  return template.replace(/{{\s*([^}]+)\s*}}/g, (match, p1) => {
    const value = context[p1.trim()] || "";
    if (value.startsWith("markdown:")) {
      return parse(value.split("markdown:")[1]);
    }
    return value;
  });
}

function renderTemplateForRecipient(
  unpersonalizedTemplate: string,
  recipientData: RecipientData,
  campaignContext: any,
): string {
  //let renderedContent = unpersonalizedTemplate;

  campaignContext = campaignContext ? campaignContext : {};

  campaignContext.recipient_first_name = recipientData.first_name;
  campaignContext.recipient_last_name = recipientData.last_name;
  campaignContext.recipient_email = recipientData.email;

  const renderedContent = replaceTemplateTags(
    unpersonalizedTemplate,
    campaignContext,
  );

  return renderedContent;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

interface MessageRecord {
  recordId: number;
  recipient: string;
}

interface CampaignData {
  campaignKey: number;
  campaignContext: string;
  campaignStatus: string;
  templateMethod: string;
  templateSubject: string;
  templateContent: string;
  templateDesign: string;
  recipients: string[];
}

interface RecipientData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Mail {
  to: string;
  subject: string;
  htmlBody: string;
}

class MailSender {
  transporter: Transporter;
  fromAddress?: string;

  constructor(transportConfig: SMTPTransport.Options, fromAddress?: string) {
    this.transporter = nodemailer.createTransport(transportConfig);
    this.fromAddress = fromAddress;
  }

  static fromRuntimeConfig() {
    const config = useRuntimeConfig();
    return new MailSender(
      {
        host: config.emailSmtpHost,
        port: Number(config.emailSmtpPort),
        // secure: true, // use TLS
        auth: {
          user: config.emailSmtpUser,
          pass: config.emailSmtpPassword,
        },
      },
      config.emailFrom,
    );
  }

  async sendMail(mail: Mail): Promise<string> {
    const maxAttempts = 1000;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await this.sendMailOnce(mail);
      } catch (error) {
        // Wait a minute if we hit the rate limit (HTTP 429)
        if (
          error &&
          typeof error == "object" &&
          "responseCode" in error &&
          error.responseCode == 429
        ) {
          await sleep(60000);
        } else {
          return getErrorMessage(error);
        }
      }
    }

    return "Rate limit exceeded, maximum attempts reached";
  }

  async sendMailOnce(mail: Mail): Promise<string> {
    if (SENDING_ACTIVE) {
      await this.transporter.sendMail({
        from: this.fromAddress ? this.fromAddress : "",
        to: mail.to,
        subject: mail.subject,
        html: mail.htmlBody,
      });
    }
    return "success";
  }
}
