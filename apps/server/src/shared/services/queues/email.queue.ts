import { IEmailJob } from '@user/interfaces/user.interface';
import { BaseQueue } from './base.queue';
import { emailWorker } from '@worker/email.worker';

class EmailQueue extends BaseQueue {
  constructor() {
    super('emailQueue');
    this.processJob('forgotPasswordEmail', 5, emailWorker.addNotificationEmail);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addEmailJob(name: string, data: IEmailJob): void {
    this.addJob(name, data);
  }
}

export const emailQueue: EmailQueue = new EmailQueue();
