import express from "express";
import PostController from "../controllers/WallpaperController.js";
import uploadImage from "../middleware/imageUpload.js";

const router = express.Router();
const postController = new PostController();

router.get("/api/posts/latest", postController.getAllPosts);
router.get("/api/posts/small", postController.getSmallImages);
router.get("/api/posts/large", postController.getLargeImages);
router.get("/api/posts/:imageName", postController.findByImageName);
router.post("/api/posts", uploadImage, postController.create);

export default router;