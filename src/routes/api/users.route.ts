import express = require("express");
import { validation } from "../../validation/validation";
import Users from "../../controllers/user.controller";
import catchErrors from "../../utils/helper";

const router = express.Router();

router.post("/auth/signup", validation, catchErrors(Users.signUp));

export default router;
