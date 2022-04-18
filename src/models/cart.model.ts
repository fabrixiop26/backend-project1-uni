import { model, Schema } from "mongoose";

export interface ICart {
  user_id: string;
  product_id: string;
  created_at: Date;
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
