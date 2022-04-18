import { Router } from "express";
import History, { IHistory } from "../models/history.model";
import { BodyResponse, Error, UserQueryParams } from "./common.types";
//<Params,ResBody,ReqBody,ReqQuery,Locals>
const route = Router();

type HistoryResponse = IHistory[] | Error;

//get history
route.get<UserQueryParams, HistoryResponse>("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    //find all history of this user
    const h = await History.find({ user_id });
    res.status(200).json(h);
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

export default route;
