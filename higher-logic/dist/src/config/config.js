"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.BASE_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// export const CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.BASE_URL = _a.BASE_URL, exports.PORT = _a.PORT;
console.log(process.env.PORT);
