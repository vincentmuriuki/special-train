import * as express from 'express';
import AdminController from '../../controllers/migrations.controller';
import catchErrors from '../../utils/helper';

const router = express.Router();

router.post(
  '/migrations',
  catchErrors(AdminController.runMigrations)
);

export default router;
