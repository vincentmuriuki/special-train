/* eslint-disable arrow-parens */
import { Sequelize } from "sequelize-typescript";

import * as path from "path";
import configEnv from "../config";
import logger from "../utils/winston";

import * as Umzug from "umzug";

const config = configEnv.default.database;
const db: any = {};

let sequelize: any;

const sequelizeConfig: any = {
  logging: false,
  dialect: "postgres",
  protocol: "postgres",
  repositoryMode: true,
  models: [path.resolve(__dirname, "../models")],
  modelMatch: (filename: string, member: string) => {
    return filename.toLowerCase() === member.toLowerCase();
  },
  define: {},
  query: { raw: true },
  pool: {
    max: 5,
    min: 0,
    idle: 10 * 1000,
  },
};

if (configEnv.default.env === "production") {
  sequelize = new Sequelize(config.database, config.user, config.password, {
    ...sequelizeConfig,
    host: config.hostCloudSql,
    ssl: false,
    dialectOptions: {
      socketPath: `${config.hostCloudSql}`,
    },
    logging: (msg: any) => logger.info(msg),
  });
} else {
  sequelize = new Sequelize(config.database, config.user, config.password, {
    ...sequelizeConfig,
    host: config.host,

    dialectOptions: {},
    logging: (msg: any) => logger.info(msg),
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// @ts-ignore
db.migrations = new Umzug({
  migrations: {
    path: path.resolve(__dirname, "../migrations"),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize,
  },
  logging: (msg: any) => logger.info(`Migrations ${msg}`),
});

// @ts-ignore
db.demoSeeds = new Umzug({
  migrations: {
    path: path.resolve("database", "seeders"),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  // @ts-ignore
  storage: "none",
  storageOptions: {
    sequelize,
  },
  logging: (msg: any) => logger.info(`Seeds ${msg}`),
});

export default db;
