import express from "express";
import { Request, Response } from "express";
import {
  addFavouriteService,
  removeFavouriteService,
} from "../service/favouritesService";
import { createResponse } from "../utils/responseWrapper"; 
import { authenticateToken } from "../middleware/auth";
import { get } from "http";
import { getUserIdFromToken } from "../utils/jwt";

const router = express.Router();

router.post("/:id", authenticateToken, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(createResponse("All fields are required", {}, "Missing blog ID"));
    }

    const favouriteBlogs = await addFavouriteService({
      user_id: getUserIdFromToken(req.headers["authorization"]),
      blog_id: parseInt(id),
    });

    if (favouriteBlogs === null) {
      return res
        .status(409)
        .json(createResponse("Already in favourites", {}, null));
    }

    return res
      .status(200)
      .json(createResponse("Favourites created successfully", favouriteBlogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

router.delete("/:id", authenticateToken , async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(createResponse("All fields are required", {}, "Missing blog ID"));
    }

    const favouriteBlogs = await removeFavouriteService({
      user_id: getUserIdFromToken(req.headers["authorization"]),
      blog_id: parseInt(id),
    });

    if (favouriteBlogs === null) {
      return res
        .status(409)
        .json(createResponse("Favourite not found", {}, null));
    }

    return res
      .status(200)
      .json(createResponse("Favourites deleted successfully", favouriteBlogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

export default router;
