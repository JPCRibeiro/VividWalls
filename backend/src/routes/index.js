import express from "express";
import wallpapers from "./wallpapersRoutes.js";
import users from "./usersRoutes.js";

const routes = (app) => {
  app.use(express.json(), wallpapers, users);
};

export default routes;