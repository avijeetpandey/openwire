import { type Application } from 'express';

export default (app: Application) => {
  const routes = () => {
    console.log(app);
  };

  routes();
};
