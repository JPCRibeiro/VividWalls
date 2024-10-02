import express from "express";
import UserController from "../controllers/UserController.js";
import cookieJwtAuth from "../middleware/cookieJwtAuth.js";

const router = express.Router();

const userController = new UserController();

router.get("/api/user", cookieJwtAuth, (req, res) => {
  const user = req.user;
  res.json({ user });
});
router.post("/api/register", userController.create);
router.post("/api/login", userController.getUser);
router.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
  });
  res.status(200).json({ message: 'Logout bem-sucedido' });
});

export default router;