import { model, Schema } from "mongoose";

export interface IHistory {
  user_id: string;
  product_id: string;
  created_at: Date;
}

const historySchema = new Schema<IHistory>({
  user_id: {
    type: String,
    required: true,
  },

  product_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const History = model("History", historySchema);

export default History;
