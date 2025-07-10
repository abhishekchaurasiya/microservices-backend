import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { ValidatorSource, zodValidator } from "../helpers/validator";
import { placeOrderSchema, userRegisterSchema } from "../zod/user.schema";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       "201":
 *         description: User registered
 */

userRouter
  .route("/register")
  .post(
    zodValidator(userRegisterSchema, ValidatorSource.BODY),
    userController.registerUser
  );

/**
 * @swagger
 * /place-order:
 *   post:
 *     summary: Place an order
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       "201":
 *         description: Order placed successfully
 *       "400":
 *         description: Invalid order details
 *       "500":
 *         description: Internal server error
 */
userRouter
  .route("/place-order")
  .post(
    zodValidator(placeOrderSchema, ValidatorSource.BODY),
    userController.placeOrder
  );

export default userRouter;
