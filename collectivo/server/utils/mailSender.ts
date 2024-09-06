import nodemailer, { type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Mail {
  to: string;
  subject: string;
  htmlBody: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class MailSender {
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
    await this.transporter.sendMail({
      from: this.fromAddress ? this.fromAddress : "",
      to: mail.to,
      subject: mail.subject,
      html: mail.htmlBody,
    });

    return "success";
  }
}
