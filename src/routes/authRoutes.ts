import express from "express";
import bcrypt from "bcryptjs";
import { loginService, register } from "../service/userService";
import { createResponse } from "../utils/responseWrapper";

const router = express.Router();

router.post("/register", async (req: any, res: any) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json(createResponse("All fields are required", {}, "Missing fields"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await register(email, username, hashedPassword);

    return res
      .status(201)
      .json(createResponse("User registered successfully", registeredUser));
  } catch (error) {
    const errMsg = (error as Error).message;

    if (errMsg === "User already exists") {
      return res
        .status(409)
        .json(createResponse(errMsg, {}, "Conflict"));
    }

    return res
      .status(500)
      .json(createResponse("Internal server error", {}, errMsg));
  }
});

router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(createResponse("Email and password are required", {}, "Missing fields"));
  }

  try {
    const token = await loginService(email, password);

    if (!token) {
      return res
        .status(401)
        .json(createResponse("Invalid credentials", {}, "Unauthorized"));
    }

    return res
      .status(200)
      .json(createResponse("Login successful", { token }));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse("Login failed", {}, err));
  }
});

export default router;
