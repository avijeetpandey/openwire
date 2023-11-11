import { Request, Response } from 'express';
import { config } from '@root/config';
import HTTP_CODES from 'http-status-codes';
import { BadRequestError } from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { emailSchema } from '@auth/schemes/password';
import { authService } from '@service/db/auth.service';
import crypto from 'crypto';
import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-template';
import { emailQueue } from '@service/queues/email.queue';

export class Password {
  @joiValidation(emailSchema)
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const existingUser = await authService.getAuthUserByEmail(email);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const randombytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randombytes.toString('hex');
    await authService.updatePasswordToken(`${existingUser._id}`, randomCharacters, Date.now() * 60 * 60 * 1000);

    const resetLink: string = `${config.CLIENT_URL}/reset-password?token=${randomCharacters}`;
    const template: string = forgotPasswordTemplate.passwordResetTemplate(existingUser.username, resetLink);

    emailQueue.addEmailJob('forgotPasswordEmail', { template, receiverEmail: email, subject: 'Reset your password' });

    return res.status(HTTP_CODES.OK).json({
      message: 'Password reset email sent'
    });
  }
}
