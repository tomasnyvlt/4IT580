import nodemailer from 'nodemailer';
import {MAIL_HOST, MAIL_USER, MAIL_PASSWORD, FRONTEND_URL} from "../config/variables.js"

const FALLBACK_EMAIL = "noreply@sportify.com"

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 587,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
});

type SendMailArgs = {
    from?: string,
    recipient: string,
    subject: string,
    content: string
}

export const sendMail = async (args: SendMailArgs) => {
    const info = await transporter.sendMail({
        from: args.from ?? FALLBACK_EMAIL,
        to: args.recipient,
        subject: args.subject,
        html: args.content
    })
}

export const createRegistrationEmailContent = (firstName: string, lastName: string ,confirmationCode: string) => {
    return `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
</head>
<body>
    <h1>Hello ${firstName} ${lastName},</h1>
    <p>Thank you for joining to our Sportify Community.</p>
    <br />
    <p>The confirmation code you are looking for is right here:</p>
    <h2>${confirmationCode}</h2>
    <br/>
    <p>Or you can confirm your registration by clicking <a href="${FRONTEND_URL}activation?confirmationCode=${confirmationCode}" target="_blank">on this link.</a></p>
    <br/>
    <p>If you experience any issues logging into your account, reach out to us at support@sportify.com.</p>
    <br/>
    <p>Best,<br/>
    The Sportify team  </p>
</body>
</html>
    `;
}