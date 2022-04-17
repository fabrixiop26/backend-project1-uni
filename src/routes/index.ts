import UserRoute from "./user.route";
import type { Express } from "express";
const setUpRoutes = (app: Express) => {
  app.use("/users", UserRoute);
};

export default setUpRoutes;
