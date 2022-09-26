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
const HttpException_1 = require("../exceptions/HttpException");
const request_1 = __importDefault(require("../request/request"));
const axios_1 = __importDefault(require("axios"));
class HigherLogicServices {
    fetchUserActivity(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new HttpException_1.HttpException(401, 'Unauthorized');
            const { data, status } = yield axios_1.default.get('https://api.higherlogic.com/api/v2.0/Blogs/GetLatestEntries', {
                headers: {
                    Accept: 'application/json',
                },
                data: request_1.default
            });
            console.log(JSON.stringify(data, null, 4));
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
            return data;
        });
    }
    ;
    fetchUserMessages(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new HttpException_1.HttpException(401, 'Unauthorized');
            const { data, status } = yield axios_1.default.get('https://api.higherlogic.com/api/v2.0/Messaging/GetInboxMessages', {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log(JSON.stringify(data, null, 4));
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
            return data;
        });
    }
    ;
    fetchUserSubscribedDiscussion(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new HttpException_1.HttpException(401, 'Unauthorized');
            const { data, status } = yield axios_1.default.get('https://api.higherlogic.com/api/v2.0/Discussions/GetSubscribedDiscussions', {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log(JSON.stringify(data, null, 4));
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
            return data;
        });
    }
    ;
}
exports.default = HigherLogicServices;
