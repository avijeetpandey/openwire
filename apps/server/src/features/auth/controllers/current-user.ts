import { Request, Response } from 'express';
import { UserCache } from '@service/redis/user.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_CODES from 'http-status-codes';

const userCache = new UserCache();

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<Response> {
    let isUser = false;
    let token = null;
    let user = null;
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(`${req.currentUser!.userId}`)) as IUserDocument;

    const existinguser: IUserDocument = cachedUser ? cachedUser : await userService.getUserbyId(`${req.currentUser!.userId}`);

    if (Object.keys(existinguser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existinguser;
    }

    return res.status(HTTP_CODES.OK).json({
      message: 'Succesfully done',
      data: {
        isUser,
        user,
        token
      }
    });
  }
}
