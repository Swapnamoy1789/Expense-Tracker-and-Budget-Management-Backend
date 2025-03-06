import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Expense extends Model {
  public id!: number;
  public userId!: number;
  public description!: string; // ✅ Added description field
  public category!: string;
  public amount!: number;
  public date!: Date;
}

Expense.init(
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
    description: {  // ✅ Added description field
      type: DataTypes.STRING,
      allowNull: true, // Allows flexibility (optional)
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "expenses",
  }
);

Expense.belongsTo(User, { foreignKey: "userId" });

export default Expense;
