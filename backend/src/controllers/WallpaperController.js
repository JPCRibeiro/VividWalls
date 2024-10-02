import S3Service from "../services/s3Service.js";
import PrismaPostRepository from "../repositories/WallpaperPrismaRepository.js";
import CreatePostUseCase from "../useCases/wallpapersUseCase/CreatePostUseCase.js";
import GetAllPosts from "../useCases/wallpapersUseCase/GetAllPostsUseCase.js";
import FindByImageName from "../useCases/wallpapersUseCase/FindByImageNameUseCase.js";
import GetSmallImages from "../useCases/wallpapersUseCase/GetSmallImagesUseCase.js";
import GetLargeImages from "../useCases/wallpapersUseCase/GetLargeImagesUseCase.js";

class PostController {
  constructor() {
    const prismaRepository = new PrismaPostRepository();
    const bucketService = new S3Service();
    this.createPostUseCase = new CreatePostUseCase(prismaRepository, bucketService);
    this.findByImageNameUseCase = new FindByImageName(prismaRepository, bucketService);
    this.getAllPostsUseCase = new GetAllPosts(prismaRepository, bucketService);
    this.getSmallImagesUseCase = new GetSmallImages(prismaRepository, bucketService);
    this.getLargeImagesUseCase = new GetLargeImages(prismaRepository, bucketService);
  }

  create = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }

      const post = await this.createPostUseCase.execute({
        caption: req.body.caption,
        fileBuffer: req.file.buffer,
        mimetype: req.file.mimetype,
      });

      res.status(201).json(post);
    } catch (error) {
      if (error.message === "Imagem já existe no sistema") {
        return res.status(400).json({ message: error.message });
      }
      console.error("Erro ao criar post:", error);
      res.status(500).json({ message: "Erro ao criar post" });
    }
  };

  findByImageName = async (req, res) => {
    try {
      const { imageName } = req.params; 
      const post = await this.findByImageNameUseCase.execute(imageName);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar wallpaper" });
    }
  };
  
  getAllPosts = async (req, res) => {
    try {
      const posts = await this.getAllPostsUseCase.execute();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  };

  getSmallImages = async (req, res) => {
    try {
      const posts = await this.getSmallImagesUseCase.execute();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  };

  getLargeImages = async (req, res) => {
    try {
      const posts = await this.getLargeImagesUseCase.execute();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  };
}

export default PostController;