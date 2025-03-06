import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define attributes for User
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Allow some fields to be optional when creating a user
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Extend Sequelize Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
