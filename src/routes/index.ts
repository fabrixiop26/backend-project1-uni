import UserRoute from "./user.route";
import PostRoute from "./post.route";
import CartRoute from "./cart.route";
import HistoryRoute from "./history.route";
import ReviewRoute from "./review.route";
import type { Express } from "express";
//@see https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6
const setUpRoutes = (app: Express) => {
  app.use("/users", UserRoute);
  app.use("/posts", PostRoute);
  app.use("/cart", CartRoute);
  app.use("/history", HistoryRoute);
  app.use("/reviews", ReviewRoute);
};

export default setUpRoutes;
