import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
//interface representing a document in MongoDB.
export interface IUser {
  display_name: string;
  username: string;
  password: string;
  created_at: Date;
}
//Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  display_name: {
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const hashPw = async (pw: string): Promise<string> => {
  return bcrypt.hash(pw, bcrypt.genSaltSync(10));
};

export const comparePasswords = (pw: string, hash: string) => {
  return bcrypt.compare(pw, hash);
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
