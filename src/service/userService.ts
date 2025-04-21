import { checkForExistingUser, createUser } from "../repositories/userRepo";
const bcrypt = require("bcryptjs");

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const exists = await checkForExistingUser(email);
  if (exists) {
    throw new Error("User already exists");
  }

  return await createUser({ email, username, password });
};

