import express from "express";
import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  updateBlogService,
} from "../service/blogService";
import { createResponse } from "../utils/responseWrapper";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { title, content, description, image_url } = req.body;

  if (!title || !content || !description || !image_url) {
    return res
      .status(400)
      .json(createResponse("All fields are required", {}, "Missing fields"));
  }

  try {
    // TODO: Replace with actual user ID from auth
    const blogData = { title, content, description, image_url, user_id: 1 };
    const newBlog = await createBlogService(blogData);
    return res
      .status(200)
      .json(createResponse("Blog created successfully", newBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

router.get("/", async (req: any, res: any) => {
  const { explore, myBlogs, favourites } = req.query;

  try {
    // TODO: Replace with actual user ID from auth
    const blogs = await getAllBlogsService({
      user_id: 1,
      explore: explore === "true",
      myBlogs: myBlogs === "true",
      favourites: favourites === "true",
    });

    return res
      .status(200)
      .json(createResponse("Blogs fetched successfully", blogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

router.delete("/:id", async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(createResponse("Blog ID is required", {}, "Missing blog ID"));
  }

  try {
    const deletedBlog = await deleteBlogService(parseInt(id));
    if (!deletedBlog) {
      return res
        .status(404)
        .json(createResponse("Blog not found", {}, null));
    }

    return res
      .status(200)
      .json(createResponse("Blog deleted successfully", deletedBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

router.put("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { title, content, description, image_url } = req.body;

  if (!title || !content || !description || !image_url || !id) {
    return res
      .status(400)
      .json(createResponse("All fields are required", {}, "Missing fields"));
  }

  try {
    // TODO: Replace with actual user ID from auth
    const blogData = {
      id,
      title,
      content,
      description,
      image_url,
      user_id: 1,
    };

    const updatedBlog = await updateBlogService(blogData, parseInt(id));
    if (updatedBlog === null) {
      return res
        .status(404)
        .json(createResponse("Blog not found", {}, null));
    }

    return res
      .status(200)
      .json(createResponse("Blog updated successfully", updatedBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse("Internal server error", {}, error));
  }
});

export default router;
