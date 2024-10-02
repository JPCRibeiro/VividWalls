class GetLargeImages {
  constructor(prismaRepository, bucketService) {
    this.prismaRepository = prismaRepository;
    this.bucketService = bucketService;
  }

  async execute() {
    const posts = await this.prismaRepository.getLargeImages();

    const postsWithUrl = posts.map(post => ({
      ...post,
      imageUrl: this.bucketService.getImageUrl("large", post.imageName),
    }));

    return postsWithUrl;
  }
}

export default GetLargeImages;