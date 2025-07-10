import { Types, Schema, model, Document } from "mongoose";

export interface UserDoc extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
}

export const UserDocumentName = "User";
export const UserCollectionName = "users";

const userSchema = new Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<UserDoc>(
  UserDocumentName,
  userSchema,
  UserCollectionName
);
