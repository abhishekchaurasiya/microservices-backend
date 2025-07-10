import { Types, Schema, model, Document } from "mongoose";

export interface ProductDoc extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export const ProductDocumentName = "Product";
export const ProductCollectionName = "products";

const productSchema = new Schema<ProductDoc>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ProductModel = model<ProductDoc>(
  ProductDocumentName,
  productSchema,
  ProductCollectionName
);
