import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { ValidatorSource, zodValidator } from "../helpers/validator";
import { addProductSchema } from "../zod/product.schema";

const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /add-product:
 *   post:
 *     summary: Add a new product
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       "201":
 *         description: Product added successfully
 *       "400":
 *        description: Invalid product details
 *       "500":
 *         description: Internal server error
 */

adminRouter
  .route("/add-product")
  .post(
    zodValidator(addProductSchema, ValidatorSource.BODY),
    productController.addProduct
  );

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       "200":
 *         description: Returns a single product
 *       "400":
 *         description: Product not found
 *       "500":
 *         description: Internal server error
 */

adminRouter.route("/product/:productId").get(productController.product);

/**
 * @swagger
 *  /products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: Returns a list of products
 *       "400":
 *         description: No products found
 *       "500":
 *         description: Internal server error
 */

adminRouter.route("/products").get(productController.productList);

/**
 * @swagger
 * /update-stock/{productId}:
 *   patch:
 *     summary: Update the stock of a product
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       "200":
 *         description: Product stock updated successfully
 *       "400":
 *         description: Invalid quantity or product not found
 *       "500":
 *         description: Internal server error
 *
 */
adminRouter
  .route("/update-stock/:productId")
  .patch(productController.updateProductStock);

export default adminRouter;
