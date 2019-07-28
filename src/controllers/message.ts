import Koa from "koa";
import Message from "../models/message";
import chackJwt from "../jwt/verifyJwt";

export default class MessageController {
    async create(ctx: Koa.Context) {
        const message = ctx.request.body;
        const userId: any = await chackJwt(ctx.request.headers["x-access-token"]);
        if (userId) {
          if (message.text) {
            const createMessage = new Message(userId, message.text);
            const res = await createMessage.save();
            ctx.body = {
            success: true,
            messageId: res.insertId
            };
          }
        } else {
            ctx.body = {
            success: false,
            messageId: "Login or sing up"
            };
        }
    }
    async selectMessageById(ctx: Koa.Context) {
      const selectId = ctx.request.body;
      if (!selectId.id || !Number(selectId.id)) {
        ctx.body = {
          message: "Request is empty!"
        };
        return;
      }
      const userId = await chackJwt(ctx.request.headers["x-access-token"]);
      if (userId) {
        if (selectId.id) {
          const selectMesById = new Message();
          const res = await selectMesById.findById(selectId.id);
          if (userId === res[0].userid) {
            ctx.body = {
              success: true,
              text: res[0].text
            };
          } else {
            ctx.body = {
              message: "You can`t select this message"
            };
          }
        }
      } else {
        ctx.body = {
          success: false,
          messageId: "Login or sing up"
          };
      }
    }
    async changeMessage (ctx: Koa.Context) {
      const req = ctx.request.body;
      const changeMesById = new Message();
      const userId = await chackJwt(ctx.request.headers["x-access-token"]);
      if (!userId) {
          ctx.body = {
          success: false,
          messageId: "Login or sing up"
          };
          return;
      }
      const useridFromDb = await changeMesById.findById(req.id);
      if (userId == useridFromDb[0].userid) {
        if (req.newText) {
          const res = await changeMesById.changeById(req.newText, req.id);
            ctx.body = {
              update: true
            };
        }
      } else {
        ctx.body = {
          message: "You can`t change this message"
        };
      }
    }
    async deleteMessage (ctx: Koa.Context) {
      const req = ctx.request.body;
      const deleteMessageById = new Message();
      const userId = await chackJwt(ctx.request.headers["x-access-token"]);
      if (!userId) {
        ctx.body = {
        success: false,
        messageId: "Login or sing up"
        };
        return;
      }
      const useridFromDb = await deleteMessageById.findById(req.id);
      if (userId === useridFromDb[0].userid) {
        const res = await deleteMessageById.deleteById(req.id);
        ctx.body = {
          delete: true
        };
      } else {
        ctx.body = {
           message: "you can`t delete this message"
        };
      }
    }

    async selectHistoryMessage(ctx: Koa.Context) {
      const req = ctx.request.body;
      let numberOfHistory = 20;
      if (req.number > 0) {
        numberOfHistory = req.number;
      }
      const selectHistory = new Message();
      const userId = await chackJwt(ctx.request.headers["x-access-token"]);
      if (!userId) {
        ctx.body = {
        success: false,
        messageId: "Login or sing up"
        };
        return;
      }
      const res = await selectHistory.selectHistory();
      let history: any[] = new Array(numberOfHistory);
      for (let i = 0; i < numberOfHistory; i++) {
        history[i] = JSON.parse(JSON.stringify(res[i]));
      }
      ctx.body = {
        history: history
        };
    }
}