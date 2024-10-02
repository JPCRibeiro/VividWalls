import jwt from "jsonwebtoken";

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ user: null });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user; 
    next();
  });
}

export default cookieJwtAuth;