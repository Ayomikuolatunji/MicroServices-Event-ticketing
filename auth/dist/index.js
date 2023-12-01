"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const current_user_1 = require("./routes/current-user");
const signout_1 = require("./routes/signout");
const signIn_1 = require("./routes/signIn");
const signup_1 = require("./routes/signup");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(current_user_1.currentUserRouter);
app.use(signout_1.signOutRouter);
app.use(signIn_1.signInRouter);
app.use(signup_1.signupRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Auth service server is running on port 3000");
});
