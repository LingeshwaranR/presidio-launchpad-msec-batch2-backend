import { Op } from "sequelize";
import User from "../models/user";
export const createUser = async (register: any) => {
  const { email, username, password } = register;
  try {
    const user = await User.create({
      email,
      username,
      password,
    });
    return user.dataValues;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const checkForExistingUser = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    return { error: true, message: error };
  }
}