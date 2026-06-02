import mongoose from "mongoose";
import Post from "../models/postModels.js";


// CREATE POST
export async function createPost(req, res) {
  try {
    const formData = req.body;

    // image
    if (req.file) {
      formData.image = req.file.path;
    }

   
    if (!formData.title && !formData.image) {
      return res.status(400).send({
        success: false,
        message: "title or image required",
      });
    }

    const post = await Post.create(formData);

    return res.status(201).send({
      success: true,
      message: "post created",
      post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
// GET ALL POSTS
export async function getAll(req, res) {
  try {
    const posts = await Post.find({})
      .populate("userId", "name email")
      .populate("likes", "name")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}


// LIKE POST
export async function likePost(req, res) {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: "invalid user id",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "post not found",
      });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).send({
      success: true,
      message: "like updated",
      likes: post.likes,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}


// COMMENT POST
export async function commentPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "post not found",
      });
    }

    const { userId, text } = req.body;

    post.comments.push({
      userId,
      text,
    });

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate("comments.userId", "name");

    return res.status(200).send({
      success: true,
      message: "comment added",
      comments: updatedPost.comments,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}