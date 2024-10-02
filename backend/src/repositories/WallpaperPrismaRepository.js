import Post from "../entities/Wallpaper.js";
import { PrismaClient } from "@prisma/client";
import WallpaperRepository from "./WallpaperRepository.js";

class PrismaPostRepository extends WallpaperRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  };

  async create({ caption, imageName, imageHash }) {
    const data = await this.prisma.posts.create({
      data: { caption, imageName, imageHash },
    });
    return new Post(data);
  };

  async findByHash(imageHash) {
    const post = await this.prisma.posts.findFirst({
      where: { imageHash },
    });
    return post ? new Post(post) : null;
  }

  async findByImageName(imageName) {
    const post = await this.prisma.posts.findFirst({
      where: { imageName: { startsWith: imageName } },
    });

    return post;
  };

  async getAllPosts() {
    const posts = await this.prisma.posts.findMany({ 
      orderBy: [{ created: 'desc' }]
    });
    return posts;
  };
  
  async getSmallImages() {
    const posts = await this.prisma.posts.findMany({ 
      orderBy: [{ created: 'asc' }]
    });
    return posts;
  };

  async getLargeImages() {
    const posts = await this.prisma.posts.findMany({ 
      orderBy: [{ created: 'asc' }]
    });
    return posts;
  };
}

export default PrismaPostRepository;
