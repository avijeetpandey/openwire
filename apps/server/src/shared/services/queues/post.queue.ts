import { BaseQueue } from './base.queue';
import { postWorker } from '@worker/post.worker';
import { IPostJobData } from '@root/features/posts/interfaces/post.interface';

class PostQueue extends BaseQueue {
  constructor() {
    super('post');
    this.processJob('addPostToDB', 5, postWorker.addPostToDB);
  }

  public addPostJob(name: string, data: IPostJobData): void {
    this.addJob(name, data);
  }
}

export const postQueue: PostQueue = new PostQueue();
