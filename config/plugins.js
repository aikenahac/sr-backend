module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'mail.aerio.cloud'),
      port: env('SMTP_PORT', 587),
      auth: {
        user: env('SMTP_USERNAME'),
        pass: env('SMTP_PASSWORD'),
      },
    },
    settings: {
      defaultFrom: 'no-reply@aerio.cloud',
      defaultReplyTo: 'no-reply@aerio.cloud',
    },
  },
})