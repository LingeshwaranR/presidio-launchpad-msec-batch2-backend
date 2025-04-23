import { where } from "sequelize";
import blogs from "../models/blogs";
import Favourites from "../models/favorites";
import { IBlog, IGetBlogs } from "../Interfaces/blogs";
import User from "../models/user";
import { Blog } from "../models/associations";

export const createBlog = async (blogData: IBlog) => {
  try {
    return await blogs.create({ ...blogData });
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getAllBlogs = async () => {
  try {
    return await blogs.findAll();
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getMyBlogs = async (userId: number) => {
  try {
    const addBlog = await blogs.findAll({
      where: {
        user_id: userId,
      },
    });
    return addBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getMyFavouriteBlogs = async (userId: number) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          through: { attributes: [] },
        },
      ],
    });

    if (!user) return [];

    return user.get("Blogs");
  } catch (error) {
    console.error("Error fetching favorite blogs:", error);
    return { error: true, message: error };
  }
};

export const updateBlog = async (blogData: IBlog, blogId: number) => {
  try {
    const blog = await blogs.findByPk(blogId);
    if (!blog) return null;

    const updateBlog = await blogs.update(
      { ...blogData },
      {
        where: {
          id: blogId,
          user_id: blogData.user_id,
        },
      }
    );
    return updateBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteBlog = async (blogId: number, userId:number) => {
  try {
    const existingBlog = await blogs.findByPk(blogId);
    if (!existingBlog) {
      return null;
    }
    const deleteBlog = await blogs.destroy({
      where: {
        id: blogId,
        user_id: userId,
      },
    });
    return deleteBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};
