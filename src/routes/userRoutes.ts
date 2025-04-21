const express = require("express");
import { Request, Response } from "express";
import { register } from "../service/userService";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
  
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const registerUser = await register(email, username, password);
  
      return res
        .status(201)
        .json({ message: "User created successfully", data: registerUser });
    } catch (error) {
      const errMsg = (error as Error).message;

      if (errMsg === "User already exists") {
        return res.status(409).json({ message: errMsg });
      }
      return res.status(500).json({ message: errMsg || "Internal Server Error" });
    }
  });
  

export default router;
