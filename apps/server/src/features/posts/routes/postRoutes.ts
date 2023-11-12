import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';
import { Create } from '../controllers/create-post';

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/post', authMiddleware.checkAuthentication, Create.prototype.post);
    return this.router;
  }
}

export const postRoutes: PostRoutes = new PostRoutes();
