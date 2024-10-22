class GetQueryImage {
  constructor(prismaRepository, bucketService) {
    this.prismaRepository = prismaRepository;
    this.bucketService = bucketService;
  }

  async execute(caption) {
    const posts = await this.prismaRepository.getQueryImage(caption);

    const postsWithUrl = posts.map(post => ({
      ...post,
      imageUrl: this.bucketService.getImageUrl("small", post.imageName),
    }));

    return postsWithUrl;
  }
}

export default GetQueryImage;