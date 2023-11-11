import HTTP_CODES from 'http-status-codes';
import { Request, Response } from 'express';

export class SignOut {
  public async update(req: Request, res: Response): Promise<Response> {
    req.session = null;
    return res.status(HTTP_CODES.OK).json({
      message: 'Logout successful'
    });
  }
}
