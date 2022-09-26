"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const higherlogic_service_1 = __importDefault(require("./services/higherlogic.service"));
let token = "AHGYYVWYVWY76236ty-hfdgqwv";
console.log("controller");
class higherlogicController {
    constructor() {
        this.higherLogicService = new higherlogic_service_1.default();
        this.getActivity = (ctx) => __awaiter(this, void 0, void 0, function* () {
            console.log("test");
            const findUserAtivity = yield this.higherLogicService.fetchUserActivity(token);
            ctx.response.body = { data: findUserAtivity, message: 'findAllActivity' };
            ctx.response.status = 200;
        });
        this.getMessage = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const findUserMessages = yield this.higherLogicService.fetchUserMessages(token);
            ctx.response.body = { data: findUserMessages, message: 'findAllMessages' };
            ctx.response.status = 200;
        });
        this.getDiscussion = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const findUserMessages = yield this.higherLogicService.fetchUserSubscribedDiscussion(token);
            ctx.response.body = { data: findUserMessages, message: 'findSubscribedDiscussion' };
            ctx.response.status = 200;
        });
    }
}
;
exports.default = higherlogicController;
