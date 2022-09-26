import { Context } from 'koa';
import { Members } from '@modules/integration/interface/member.interface';

import VanilaForumService from '../../../../integrations/vanila';

class VanilaController {
  public vanilaService = new VanilaForumService();

  public connectAccount = async (ctx: Context) => {
    const { domain } = ctx.request.body;
    const { token } = ctx.request.body;
    const connectAccount = await this.vanilaService.connectUserAccount(domain, token);
    ctx.response.body = { data: connectAccount, message: 'connected' };
    ctx.response.status = 200;
  };

  public getUsers = async (ctx: Context) => {
    const findAllUsersData: Members[] | string = await this.vanilaService.getUsers();
    ctx.response.body = { data: findAllUsersData, message: 'findAll' };
    ctx.response.status = 200;
  };

  public getActivity = async (ctx: Context) => {
    const findDiscussion: [] | string = await this.vanilaService.getActivityList();
    ctx.response.body = { data: findDiscussion, message: 'findAll' };
    ctx.response.status = 200;
  };

  public getComments = async (ctx: Context) => {
    const findComments: [] | string = await this.vanilaService.getComments();
    ctx.response.body = { data: findComments, message: 'findAll' };
    ctx.response.status = 200;
  };
}

export default VanilaController;
