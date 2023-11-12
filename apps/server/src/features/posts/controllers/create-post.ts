import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { postSchema } from '../schema/post.scheme';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { IPostDocument } from '../interfaces/post.interface';
import HTTP_CODES from 'http-status-codes';
import { postCache } from '@service/redis/post.cache';
import { socketIOPostObject } from '@socket/post';
import { postQueue } from '@service/queues/post.queue';

export class Create {
  @joiValidation(postSchema)
  public async post(req: Request, res: Response): Promise<Response> {
    const { post, bgColor, privacy, gifUrl, profilePicture, feelings } = req.body;

    const postObjectId: ObjectId = new ObjectId();

    const createdPost: IPostDocument = {
      _id: postObjectId,
      userId: req.currentUser!.userId,
      username: req.currentUser!.username,
      email: req.currentUser!.email,
      avatarColor: req.currentUser!.avatarColor,
      profilePicture,
      post,
      bgColor,
      feelings,
      privacy,
      gifUrl,
      commentsCount: 0,
      imgVersion: '',
      imgId: '',
      createdAt: new Date(),
      reactions: { like: 0, love: 0, haha: 0, sad: 0, angry: 0, wow: 0 }
    } as IPostDocument;

    // emitting created post from the socket
    socketIOPostObject.emit('add post', createdPost);

    // save data to redis cache
    await postCache.savePostToCache({
      createdPost,
      currentUserId: `${req.currentUser!.userId}`,
      uId: `${req.currentUser!.uId}`,
      key: postObjectId
    });

    // save data to the mongodb via worker
    await postQueue.addPostJob('addPostToDB', { key: req.currentUser!.userId, value: createdPost });

    return res.status(HTTP_CODES.OK).json({
      message: 'Post created'
    });
  }
}
