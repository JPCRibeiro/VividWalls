import express from "express";
import UserController from "../controllers/UserController.js";
import cookieJwtAuth from "../middleware/cookieJwtAuth.js";

const router = express.Router();

const userController = new UserController();

/**
 *  @swagger
 *  /api/user:
 *    get:
 *      tags: 
 *        - user
 *      summary: Retorna informações do usuário autenticado.
 *      requestBody:
 *        content: 
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Sucesso.
 *        401:
 *          description: Não autorizado.
 */
router.get("/api/user", cookieJwtAuth, (req, res) => {
  const user = req.user;
  res.json({ user });
});

/**
 *  @swagger
 *  /api/register:
 *    post:
 *      tags: 
 *        - user
 *      summary: Criação do usuário
 *      requestBody:
 *        content: 
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Sucesso.
 *        401:
 *          description: Não autorizado.
 */
router.post("/api/register", userController.create);

/**
 *  @swagger
 *  /api/login:
 *    post:
 *      tags: 
 *        - user
 *      summary: Retorna informações do usuário autenticado.
 *      requestBody:
 *        content: 
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Sucesso.
 *        401:
 *          description: Não autorizado.
 */
router.post("/api/login", userController.getUser);

/**
 *  @swagger
 *  /api/logout:
 *    post:
 *      tags: 
 *        - user
 *      summary: Retorna informações do usuário autenticado.
 *      requestBody:
 *        content: 
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Sucesso.
 *        401:
 *          description: Não autorizado.
 */
router.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
  });
  res.status(200).json({ message: 'Logout bem-sucedido' });
});

export default router;