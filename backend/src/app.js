import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./docs/swaggerConfig.js";

const app = express();
const PORT = 8080;
const swaggerDocs = swaggerJsDoc(swaggerOptions(PORT));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api`)
})