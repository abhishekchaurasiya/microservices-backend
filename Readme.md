# Microservices Backend System (Node.js + Express + MongoDB)

A production-ready microservices backend using Node.js, Express, MongoDB, Axios, and a Gateway layer. It includes three independent services:

- **User Service** — Handles user registration and order placement
- **Admin Service** — Manages products and Add and Get all products
- **Gateway Service** — Routes requests to user/admin services

## User api endpoint:

1. http://localhost:4001/api/v1/user/register ✅
2. http://localhost:4001/api/v1/user/place-order ✅

## Admin api endpoint:

1. http://localhost:4002/api/v1/admin/add-product ✅
2. http://localhost:4002/api/v1/admin/products ✅
3. http://localhost:4002/api/v1/admin/product/productId ✅
4. http://localhost:4002/api/v1/admin/update-stock/productId ✅

## Gateway api Endpoint

1. http://localhost:4000/api/v1/user/register ✅
2. http://localhost:4000/api/v1/user/place-order ✅
3. http://localhost:4000/api/v1/admin/add-product ✅
4. http://localhost:4000/api/v1/admin/products ✅
5. http://localhost:4000/api/v1/admin/product/productId ✅
6. http://localhost:4000/api/v1/admin/update-stock/productId ✅

// Check Postman Collection:

## https://documenter.getpostman.com/view/18752395/2sB34eKNSP#1a38f268-bd3b-461f-ac75-46464dd1f407

## 🏗 Architecture

Client → Gateway (Port: 4000)
├── /api/v1/user/_ → User Service (Port: 4001)
└── /api/v1/admin/_ → Admin Service (Port: 4002)

- Internal communication via **Axios**
- Gateway routing via **express-http-proxy**
- All services run independently and communicate over HTTP

## Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** + **Mongoose**
- **Axios** (internal REST communication)
- **express-http-proxy** (gateway routing)
- **Swagger** (API docs)
- **Postman** (API testing)
- **dotenv** (env config)

## 📁 Monorepo Structure

microservices-app/
├── user-services/
├── admin-services/
├── gateway-services/
├── .gitignore
├── README.md
└── microservices.postman_collection.json

## Service Responsibilities

### User Service (`/api/v1/user`)

1. Endpoint : `/register`
2. Method: POST
3. Description: Register a user

4. Endpoint : `/place-order`
5. Method: POST
6. Description: Place an order (calls admin API)

### Admin Service (`/api/v1/admin`)

1. Endpoint : `/add-product`
2. Method: POST
3. Description: Add a product

4. Endpoint : `/producs`
5. Method: GET
6. Description: List all products

7. Endpoint : `/produc/productId`
8. Method: GET
9. Description: Get single product

10. Endpoint : ``/update-stock/:productId`
11. Method: PATCH
12. Description: Decrease product stock

### Gateway Service

- Proxies `/api/v1/user/*` to User Service
- Proxies `/api/v1/admin/*` to Admin Service
- Runs on **Port 4000**

## API Documentation (Swagger)

User Service : http://localhost:4001/api-docs
Admin Service: http://localhost:4002/api-docs

Swagger setup uses `swagger-ui-express` + `swagger docs`.

## Postman Collection

A ready-to-use Postman collection is available:

- `microservices.postman_collection.json`

### Includes:

- Register User
- Add Product
- Place Order
- Get Products
- Get Single Product

## ⚙️ Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/microservices-backend.git
cd microservices-backend
```
