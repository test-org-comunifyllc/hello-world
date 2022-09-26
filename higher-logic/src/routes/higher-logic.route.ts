import { Context, DefaultState } from 'koa';
import Router from 'koa-router';


import { Routes } from '../interface/higher-logic.interface';
import higherlogicController from '../controller/higher-logic.controller';

import compose from 'koa-compose';

class HigherLogicRoute implements Routes {
  public path = `/higher-logic`;
  public router = new Router<DefaultState, any>();
  public higherlogicController = new higherlogicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.higherlogicController.getActivity);
  }
}

export default HigherLogicRoute;
