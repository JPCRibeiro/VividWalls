import sharp from "sharp";

class findByImageName {
  constructor(prismaRepository, bucketService) {
    this.prismaRepository = prismaRepository;
    this.bucketService = bucketService;
  }

  async execute(imageName) {
    const post = await this.prismaRepository.findByImageName(imageName);

    if (!post) {
      throw new Error("Imagem não encontrada");
    }

    const imageUrl = this.bucketService.getImageUrl("full", post.imageName); 
    post.imageUrl = imageUrl;

    const imageBuffer = await this.bucketService.getImageBuffer("full", post.imageName);

    const metadata = await sharp(imageBuffer).metadata();
    post.width = metadata.width;   
    post.height = metadata.height;

    return post;
  }
}

export default findByImageName;