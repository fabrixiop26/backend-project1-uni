import { Router } from "express";
import Post, { IPost } from "../models/post.model";
import { BodyResponse, Error, UserQueryParams } from "./common.types";
//<Params,ResBody,ReqBody,ReqQuery,Locals>
const route = Router();

type PostsResponse = IPost[] | Error;
type PostResponse = IPost | Error;

export interface PostQueryParams {
  post_id: string;
}

//fetch user post
route.get<{}, PostsResponse, {}, UserQueryParams>("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    const posts = await Post.find({ owner_id: user_id });
    res.status(200).json(posts);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//fetch recent posts (sorted by date and limit to 20?)
route.get<{}, PostsResponse>("/recent", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ created_at: "desc" }).limit(20);
    res.status(200).json(posts);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//getPost
route.get<{}, PostResponse, {}, PostQueryParams>("/", async (req, res) => {
  const { post_id } = req.query;
  try {
    const p = await Post.findById(post_id);
    if (!p) {
      return res.status(404).json({ message: "Post does not exist" });
    }
    res.status(200).json(p);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//createPost
route.post<{}, BodyResponse<IPost>, IPost>("/", async (req, res) => {
  try {
    const p = await Post.create(req.body);
    res.status(200).json({ data: p });
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

export default route;
