import express = require("express");
import authRouter from "./users.route";
import migrationsRouter from './migrations.route'

const router = express.Router();
const prefix = "/api/v1";

router.use(prefix, authRouter);
router.use(prefix, migrationsRouter);

export default router;
