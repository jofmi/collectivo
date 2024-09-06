export default defineEventHandler(async (event) => {
  try {
    return await sendAdminMail(event);
  } catch (error) {
    console.log("Error in campaigns_create.post.ts");
    throw error;
  }
});

async function sendAdminMail(event: any) {
  // Protect route with API Token
  verifyCollectivoApiToken(event);
  const body = await readBody(event);
  console.log("Received request in send_admin_mail.post.ts");

  const config = useRuntimeConfig();

  if (!body.subject || !body.body) {
    throw new Error("Missing required fields");
  }

  if (!config.public.contactEmail) {
    throw new Error("Missing required config COLLECTIVO_CONTACT_EMAIL");
  }

  const mailSender = MailSender.fromRuntimeConfig();
  await mailSender.sendMail({
    to: config.public.contactEmail as string,
    subject: body.subject,
    htmlBody: body.body,
  });
}
