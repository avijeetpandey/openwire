import { type Application } from 'express';
import { BASE_PATH } from './utils/constants';
import { authRoutes } from '@auth/routes/authRoutes';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, authRoutes.routes());
  };

  routes();
};
