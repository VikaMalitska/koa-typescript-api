import Router from "koa-router";
import Koa from "koa";
import MessageController from "./controllers/message";
import UserController from "./controllers/user";
const router = new Router();
const messageController = new MessageController();
const userController = new UserController();

router.get("/", (ctx: Koa.Context) => {
  ctx.body = "Server is up";
});

router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.post("/message", messageController.create);

router.get("/message", messageController.selectMessageById);

router.get("/messagehistory", messageController.selectHistoryMessage);

router.post("/change", messageController.changeMessage);

router.get("/delete", messageController.deleteMessage);

export default router;