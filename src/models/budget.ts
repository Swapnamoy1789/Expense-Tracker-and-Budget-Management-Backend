import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Budget extends Model {
  public id!: number;
  public userId!: number;
  public category!: string;
  public limit!: number;
}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "budgets",
  }
);

Budget.belongsTo(User, { foreignKey: "userId" });

export default Budget;
