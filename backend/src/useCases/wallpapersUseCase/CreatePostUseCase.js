import crypto from "crypto";

class CreatePostUseCase {
  constructor(prismaRepository, bucketService) {
    this.prismaRepository = prismaRepository;
    this.bucketService = bucketService;
  }

  async execute({ caption, fileBuffer, mimetype }) {
    const imageHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
    const existingPost = await this.prismaRepository.findByHash(imageHash);

    if (existingPost) {
      throw new Error("Imagem já existe no sistema");
    }

    const imageName = `vividwalls-${crypto.randomBytes(4).toString("hex")}.${mimetype.split("/")[1]}`;

    await this.bucketService.uploadFull(imageName, fileBuffer, mimetype);
    await this.bucketService.uploadLarge(imageName, fileBuffer, mimetype);
    await this.bucketService.uploadSmall(imageName, fileBuffer, mimetype);

    const post = await this.prismaRepository.create({
      caption,
      imageName,
      imageHash,
    });

    return post;
  }
}

export default CreatePostUseCase;