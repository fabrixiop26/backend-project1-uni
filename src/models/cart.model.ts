import { model, Schema } from "mongoose";

export interface ICart {
  user_id: string;
  product_id: string;
}

const cartSchema = new Schema<ICart>({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  product_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
