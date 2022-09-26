'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require('koa');
const app = new Koa();
const app_1 = __importDefault(require("./src/app"));
const config_1 = require("./src/config/config");
const higherlogic = new app_1.default();
higherlogic.getActivity;
app.use((ctx) => {
    ctx.body = 'Hello World';
});
app.listen(config_1.PORT);
