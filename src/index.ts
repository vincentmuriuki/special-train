import * as express from "express";
import * as helmet from "helmet";
import * as passport from "passport";
import { urlencoded, json } from "body-parser";

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

export default app;
