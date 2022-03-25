import * as express from "express";
import * as helmet from "helmet";
import * as passport from "passport";
import { urlencoded, json } from "body-parser";
import config from "./config";
import logger from "./utils/winston";
import Responses from "./utils/response";
import ErrorHandler from "./utils/error";

const isDevelopment = config.env;
const app = express();

// @ts-ignore
app.use(helmet());

app.use(passport.initialize());
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

app.use(urlencoded({ extended: false }));
app.use(json());
app.set("port", 8080);

const server: any = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// app.get("/", (req, res) => console.log("Hello World!"));

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
