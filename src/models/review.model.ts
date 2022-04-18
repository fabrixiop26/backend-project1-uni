import { model, Schema } from "mongoose";

export interface IReview {
  user_id: string;
  product_id: string;
  description: string;
  rating: number;
  created_at: Date;
}

const reviewSchema = new Schema<IReview>({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

export default Review;
