import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in .env file");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",  // ✅ Set dialect to MySQL
  logging: false,    // Disable logging SQL queries
});

export default sequelize;
