import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getMyFavouriteBlogs,
  updateBlog,
} from "../repositories/blogRepo";
import { IBlog, IGetBlogs } from "../Interfaces/blogs";
export const createBlogService = async (blogData: IBlog) => {
  try {
    const addBlog = await createBlog(blogData);
    return addBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getAllBlogsService = async (blogData: IGetBlogs) => {
  try {
    if (blogData.explore) {
      const exploreBlogs = await getAllBlogs();
      return exploreBlogs;
    }
    if (blogData.myBlogs) {
      const myBlogs = await getMyBlogs(blogData.user_id);
      return myBlogs;
    }
    if (blogData.favourites) {
      const myFavourites = await getMyFavouriteBlogs(blogData.user_id);
      return myFavourites;
    }
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteBlogService = async (blogId: number) => {
  try {
    const removeBlog = await deleteBlog(blogId);
    return removeBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const updateBlogService = async (blogData: IBlog, blogId: number) => {
  try {
    const Blog = await updateBlog(blogData, blogId);
    console.log(Blog);
    return Blog;
  } catch (error) {
    return { error: true, message: error };
  }
};
