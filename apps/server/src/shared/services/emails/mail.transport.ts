import nodemailer from 'nodemailer';
import Logger from 'bunyan';
import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = config.createLogger('mailOptions');

class MailTransport {
  public async sendEmail(recieverMail: string, subject: string, body: string): Promise<void> {
    this.emailSender(recieverMail, subject, body);
  }

  private async emailSender(recieverMail: string, subject: string, body: string): Promise<void> {
    const mailConfig = {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD
      }
    };
    const transporter = nodemailer.createTransport(mailConfig);

    const mailOptions: IMailOptions = {
      from: `Openwire <${config.SENDER_EMAIL}>`,
      to: recieverMail,
      subject,
      html: body
    };

    try {
      await transporter.sendMail(mailOptions);
      log.info('Email sent successfully');
    } catch (error) {
      log.error('Error sending email', error);
      throw new BadRequestError('Error sending mail');
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
