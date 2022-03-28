import config from "../config";
import db from "../utils/sequelize";
import Responses from "../utils/response";

/**
 * Admin Controller
 */
class AdminController {
  /**
   * Run migrations
   * @param req
   * @param res
   * @return void
   */
  async runMigrations(req: Request, res: Response) {
    const returnValue: any = [];
    const pendingMigrations = await db.migrations.pending();
    if (Array.isArray(pendingMigrations) && pendingMigrations.length > 0) {
      const migrations = await db.migrations.up();

      migrations.forEach((item: any) => {
        returnValue.push(item.file);
      });
    }

    // Run db seeds
    // const pendingSeeds = await db.demoSeeds.pending();
    // if (Array.isArray(pendingSeeds) && pendingSeeds.length > 0) {
    //   db.demoSeeds.up();
    // }

    if (returnValue.length !== 0) {
      return Responses.handleSuccess(200, "Migrations ran successfully", res, {
        migrations: returnValue,
      });
    } else {
      returnValue.push({ message: "No migrations to run" });
      return Responses.handleSuccess(200, "No migrations to run", res, {
        migrations: returnValue,
      });
    }

    // return Responses.handleSuccess(200, "success", res, returnValue);
  }
}

export default new AdminController();
