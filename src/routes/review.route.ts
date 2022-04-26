import { Router } from "express";
import Review, { IReview } from "../models/review.model";
import { BodyResponse, Error, UserQueryParams } from "./common.types";
//<Params,ResBody,ReqBody,ReqQuery,Locals>
const route = Router();

interface ReviewQueryParams {
  product_id: string;
}

type ReviewsReponse = IReview[] | Error;

//get reviews by product
route.get<{}, ReviewsReponse, {}, ReviewQueryParams>("/", async (req, res) => {
  const { product_id } = req.query;
  try {
    //find all reviews for this product
    const r = await Review.find({ product_id });
    res.status(200).json(r);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//get reviews by user
route.get<{}, ReviewsReponse, {}, UserQueryParams>("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    //find all reviews made by this user
    const r = await Review.find({ user_id });
    res.status(200).json(r);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//create review
route.post<{}, BodyResponse<IReview>, IReview>("/", async (req, res) => {
  try {
    //creates a review
    const h = await Review.create(req.body);
    res.status(200).json(h);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

export default route;
