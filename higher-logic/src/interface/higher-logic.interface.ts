import { Context } from 'koa';
import Router from 'koa-router';

export interface Routes {
    path?: string;
    router: Router;
  }