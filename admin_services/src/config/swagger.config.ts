import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin Service API",
      version: "1.0.0",
      description: "Admin Service API documentation",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-api.com/api"
            : "http://localhost:4002/api/v1/admin",
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
