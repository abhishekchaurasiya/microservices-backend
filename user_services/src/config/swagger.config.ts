import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "User Service API documentation",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-api.com/api"
            : "http://localhost:4001/api/v1/user",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to your JSDoc-annotated route files
};

export const swaggerSpec = swaggerJSDoc(options);
