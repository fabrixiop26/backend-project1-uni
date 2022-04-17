import UserRoute from "./user.route";
import PostRoute from "./post.route";
import type { Express } from "express";
//@see https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6
const setUpRoutes = (app: Express) => {
  app.use("/users", UserRoute);
  app.use("/posts", PostRoute);
};

export default setUpRoutes;
