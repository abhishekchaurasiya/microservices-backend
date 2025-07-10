import { Schema, Types, Model, model, Document } from "mongoose";

export interface OrderDoc extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  createdAt?: Date;
}

export const OrderDocumentName = "Order";
export const OrderCollectionName = "orders";

const orderSchema = new Schema<OrderDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel: Model<OrderDoc> = model<OrderDoc>(
  OrderDocumentName,
  orderSchema,
  OrderCollectionName
);
