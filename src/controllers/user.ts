import Koa from "koa";
import User from "../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const secret = "jwt_secret";
export default class UserController {
    async registration(ctx: Koa.Context) {
        const req = ctx.request.body;
        if (req.login && req.password) {
            const newUser = new User();
            const res = await newUser.addNewUser(req.login, req.password);
            if (res == 23000) {
                ctx.body = {
                    success: false,
                    error: "'Duplicate entry /" + req.login + "/ for key \'login_UNIQUE\'"
                };
            } else {
                ctx.body = {
                    success: true,
                    userId: res.insertId
                };
              }
        }
    }

    async login(ctx: Koa.Context) {
        const req = ctx.request.body;
        const newUser = new User();
        const user = await newUser.findUserByLogin(req.login);
        if (!user) {
            ctx.body = {
                success: false,
                message: "Login not exist"
            };
            return;
        }
        const {
            password,
            ...userInfoWithoutPassword
          } = user[0];
        try {
            if (await bcrypt.compare(ctx.request.body.password, password)) {
                ctx.body = {
                    token: jsonwebtoken.sign({
                    data: userInfoWithoutPassword.id,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 seconds * 60 minutes = 1 hour
                    }, secret)
                };
            } else {
                ctx.body = {
                    success: false,
                    message: "Password not valid"
                };
            }
        }
        catch (err) {
            ctx.body = {
                success: false,
                message: err
            };
            return;
        }
    }
}