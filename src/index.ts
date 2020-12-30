//modules
import express from "express";
import { router } from "./routes/loginRoutes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const app = express();

//parse form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["ilovebabyyoda"] }));

app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
