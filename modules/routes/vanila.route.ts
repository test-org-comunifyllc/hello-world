import { DefaultState } from 'koa';
import Router from 'koa-router';

import { CustomContext, Routes } from '@interfaces/interface';
import VanilaController from '@modules/integration/controller/vanila.controlers';
import { ConnectDto } from '@modules/integration/dto/connect.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

class VanilaRoute implements Routes {
  public path = '/vanila';

  public router = new Router<DefaultState, CustomContext>();

  public vanilaController = new VanilaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/connect`,
      validationMiddleware(ConnectDto, 'body'),
      this.vanilaController.connectAccount
    );
    this.router.get(`${this.path}/get-members`, this.vanilaController.getUsers);
    this.router.get(`${this.path}/get-discsussion`, this.vanilaController.getActivity);
    this.router.get(`${this.path}/get-comments`, this.vanilaController.getComments);
  }
}

export default VanilaRoute;
