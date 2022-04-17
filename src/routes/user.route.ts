import { Router } from "express";
import User, { comparePasswords, hashPw, IUser } from "../models/user.model";
import { BodyResponse, UserQueryParams } from "./common.types";
//<Params,ResBody,ReqBody,ReqQuery,Locals>
const route = Router();

interface LoginReqBody {
  username: string;
  password: string;
}

//getUser
route.get<{}, BodyResponse<IUser>, {}, UserQueryParams>(
  "/",
  async (req, res) => {
    const { user_id } = req.query;
    try {
      const u = await User.findById(user_id);
      if (!u) {
        return res.status(404).json({ message: "User does not exists" });
      }
      res.status(200).json({ data: u });
    } catch (e: any) {
      res.status(500).json({ message: "Ops, something went wrong" });
      console.error(e);
    }
  }
);

//login
route.post<{}, BodyResponse<IUser>, LoginReqBody>(
  "/login",
  async (req, res) => {
    const { password, username } = req.body;
    try {
      const u = await User.findOne({ username });
      if (!u) {
        return res.status(404).json({ message: "User not found" });
      }
      const isSamePw = comparePasswords(password, u.password);

      if (!isSamePw) {
        return res.status(400).json({ message: "Password does not match" });
      }
      res.status(200).json({ data: u });
    } catch (e: any) {
      res.status(500).json({ message: "Ops, something went wrong" });
      console.error(e);
    }
  }
);

//prev-login
route.post<{}, BodyResponse<IUser>, UserQueryParams>(
  "/prev-login",
  async (req, res) => {
    const { user_id } = req.body;
    try {
      const u = await User.findById(user_id);
      if (!u) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data: u });
    } catch (e: any) {
      res.status(500).json({ message: "Ops, something went wrong" });
      console.error(e);
    }
  }
);

//register
route.post<{}, BodyResponse<IUser>, IUser>("/register", async (req, res) => {
  const { displayName, password, username } = req.body;
  try {
    const hashedPw = await hashPw(password);
    const u = await User.create({
      displayName,
      username,
      password: hashedPw,
    });
    res.status(200).json({ data: u });
  } catch (e: any) {
    res.status(500).json({ message: "Ops, something went wrong" });
    console.error(e);
  }
});

export default route;
