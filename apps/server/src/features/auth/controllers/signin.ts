import { Request, Response } from 'express';
import { config } from '@root/config';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_CODES from 'http-status-codes';
import { BadRequestError } from '@global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import JWT from 'jsonwebtoken';
import { signinSchema } from '@auth/schemes/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

export class SignIn {
  @joiValidation(signinSchema)
  public async read(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const existingUser: IAuthDocument = await authService.getUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const userUserJWT: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId, 
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JSON_TOKEN_SECRET!
    );

    req.session = { jwt: userUserJWT };

    return res.status(HTTP_CODES.OK).json({
      message: 'User login succesfull',
      data: {
        user: existingUser,
        token: userUserJWT
      }
    });
  }
}
