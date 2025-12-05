import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Proyecto Backend 3",
      version: "1.0.0",
      description: "Documentación del módulo de Users",
    },
  },
  apis: ["./routes/users.routes.js"], // 👈 acá estará la documentación
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpecs);
