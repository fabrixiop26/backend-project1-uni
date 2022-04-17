import { Router } from "express";
import Cart, { ICart } from "../models/cart.model";
import History from "../models/history.model";
import { BodyResponse, Error, UserQueryParams } from "./common.types";
//<Params,ResBody,ReqBody,ReqQuery,Locals>
const route = Router();

type CartsResponse = ICart[] | Error;
type CartResponse = ICart | Error;
interface CartQueryParams {
  item_id: string;
}

//fetch Cart
route.get<{}, CartsResponse, {}, UserQueryParams>("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    //find all cart documents for this user
    const c = await Cart.find({ user_id });
    res.status(200).json(c);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//add to cart
route.post<{}, BodyResponse<ICart>, ICart>("/", async (req, res) => {
  try {
    //add a new cart document
    const c = await Cart.create(req.body);
    res.status(200).json({ data: c });
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//delete from cart
route.delete<{}, CartResponse, {}, CartQueryParams>("/", async (req, res) => {
  const { item_id } = req.query;
  try {
    const c = await Cart.findByIdAndDelete(item_id);
    if (!c) {
      return res.status(404).json({ message: "Cart item does not exist" });
    }
    res.status(200).json(c);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

//buy cart, deletes all cart elements from the user
route.post<{}, {}, UserQueryParams>("/buy", async (req, res) => {
  const { user_id } = req.body;
  try {
    //find all cart documents for this user
    const cartItems = await Cart.find({ user_id });
    //create the history
    const history = cartItems.map((item) =>
      History.create({ product_id: item.product_id, user_id })
    );
    //save the history of products bought
    await Promise.all(history);
    //deletes all of the user
    await Cart.deleteMany({ user_id });
    res.status(200).json({});
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

export default route;
