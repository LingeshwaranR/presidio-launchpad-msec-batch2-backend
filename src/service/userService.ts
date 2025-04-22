import { checkForExistingUser, createUser } from "../repositories/userRepo";
const bcrypt = require("bcryptjs");
import { generateJwtToken } from "../utils/jwt";

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const exists = await checkForExistingUser(email);
  console.log("exists", exists);
  if (exists !== null) {
    throw new Error("User already exists");
  }
  return await createUser({ email, username, password });
};

export const loginService = async (
  email: string,
  password: string
) => {
  const user = await checkForExistingUser(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials")
      }

  const token = generateJwtToken(user.id, user.username, user.email);
  return token;
}


