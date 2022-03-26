import dotenv = require("dotenv");

dotenv.config();
const config = {
  PORT: process.env.PORT || 8080,
  secret: process.env.SECRET,
  database: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DB_PORT,
  },
  HASH_SALT_ROUNDS: 10,
  env: process.env.NODE_ENV || "development",
  jwtExpiresIn: "144h",
  jwtRefreshExpiresIn: 43200,
};

export default config;
