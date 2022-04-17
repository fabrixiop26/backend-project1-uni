import { model, Schema } from "mongoose";

export interface IPost {
  owner_id: string;
  img_url: string;
  display_name: string;
  description: string;
  price: number;
  created_at: Date;
}

const postSchema = new Schema<IPost>({
  owner_id: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
  },
  display_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

export default Post;
