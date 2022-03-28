import * as express from "express";
import * as helmet from "helmet";
import * as passport from "passport";
import { urlencoded, json } from "body-parser";
import config from "./config";
import logger from "./utils/winston";
import Responses from "./utils/response";
import ErrorHandler from "./utils/error";
import * as morganLogger from "morgan";
import * as expressSession from "express-session";
import * as fs from "fs";
import * as cors from "cors";
import router from "./routes";

const isDevelopment = config.env;
const app = express();

// @ts-ignore
app.use(helmet());
app.use(
  expressSession({
    secret: config.default.secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
app.use(
  morganLogger("common", {
    stream: fs.createWriteStream(".logs/request.log", { flags: "a" }),
  })
);

app.use(morganLogger("dev"));
app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());
app.set("port", config.default.PORT || 8080);

const server: any = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.get("/", (req, res) =>
  Responses.handleSuccess(200, "Typescript template", res)
);

app.use(router);
app.use((req, res) => Responses.handleError(404, "Route not found", res));

// development error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (isDevelopment !== "development") {
    next(err);
  }
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - Stack: ${err.stack}`
  );
  return Responses.handleError(err.statusCode || 500, `${err.message}.`, res);
});

// Production and testing error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((err: any, req: any, res) => {
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - Stack: ${err.stack}`
  );
  return Responses.handleError(err.statusCode || 500, err.message, res);
});

process.on("unhandledRejection", (reason) => {
  throw new ErrorHandler(reason);
});

process.on("uncaughtException", (error) => {
  logger.error(
    `Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`
  );
  process.kill(process.pid, "SIGTERM");
});
// Gracefull shut downs.
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  logger.info("Closing http server.");
  server.close(() => {
    logger.info("Http server closed.");
  });
});

export default app;
