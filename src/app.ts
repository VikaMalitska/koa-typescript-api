import Koa from "koa";
import router from "./routes";
import bodyParser from "koa-bodyparser";
const app = new Koa();

app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());

export default app;

