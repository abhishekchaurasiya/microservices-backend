import { adminUrl } from "../config/config";
import { OrderModel } from "../models/order.model";
import { UserDoc, UserModel } from "../models/user.model";
import { BadRequestError, InternalServerError } from "../utils/CustomError";
import { resMsg } from "../utils/resMsg";
import { placeOrderSchema, userRegisterSchema } from "../zod/user.schema";
import axios from "axios";

export const UserServices = {
  // Register a user
  async RegisterUser(payload: UserDoc) {
    const parsedPayload = userRegisterSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new BadRequestError(resMsg.INVALID_RESIGTRATION_DETAILS);
    }
    const { name, email, phone } = parsedPayload.data;

    const existsUser = await UserModel.findOne({ email });
    if (existsUser) throw new BadRequestError(resMsg.USER_ALREADY_EXISTS);

    const user = new UserModel({ name, email, phone });
    if (!user) throw new BadRequestError(resMsg.USER_REGISTRATION_FAILED);
    await user.save();
    return user;
  },

  //   Place Order
  async PlaceOrder(payload: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    const parsedPayload = placeOrderSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new BadRequestError(resMsg.INVALID_ORDER_DETAILS);
    }
    const { userId, productId, quantity } = parsedPayload.data;

    try {
      // Validate user
      const user = await UserModel.findById(userId).select({ _id: 1 });
      if (!user) throw new BadRequestError(resMsg.USER_NOT_FOUND);

      // Validate product by Admin services
      const { data } = await axios.get(`${adminUrl}/product/${productId}`);
      const product = data.product;
      if (!product) throw new BadRequestError(resMsg.PRODUCT_NOT_FOUND);

      if (product.stock < quantity) {
        throw new BadRequestError(resMsg.INSUFFICIENT_STOCK);
      }

      // save the order to the database
      const order = new OrderModel({
        userId,
        productId,
        quantity,
        createdAt: new Date(),
      });
      if (!order) throw new BadRequestError(resMsg.ORDER_CREATION_FAILED);
      await order.save();

      // Notify the admin service to update the
      await axios.patch(`${adminUrl}/update-stock/${productId}`, {
        quantity,
      });

      return order;
    } catch (err: any) {
      if (err instanceof BadRequestError) throw err;
      throw new InternalServerError(resMsg.SOMETHING_WENT_WRONG);
    }
  },
};
