import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
//interface representing a document in MongoDB.
export interface IUser {
  displayName: string;
  username: string;
  password: string;
}
//Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export const hashPw = async (pw: string): Promise<string> => {
  const hash = await bcrypt.hash(pw, bcrypt.genSaltSync(10));
  return hash;
};

export const comparePasswords = (pw: string, hash: string) => {
  return bcrypt.compareSync(pw, hash);
};

//pre save hook to hash pw before saving
//@see https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
userSchema.pre("save", async function () {
  if (this.isModified("password") || this.isNew) {
    this.password = await hashPw(this.password);
  }
});

// 3. Create a Model.
const User = model("User", userSchema);

export default User;
