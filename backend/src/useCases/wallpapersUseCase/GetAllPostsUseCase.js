class GetAllPosts {
  constructor(prismaRepository, bucketService) {
    this.prismaRepository = prismaRepository;
    this.bucketService = bucketService;
  }

  async execute() {
    const posts = await this.prismaRepository.getAllPosts();

    const postsWithUrl = posts.map(post => ({
      ...post,
      imageUrl: this.bucketService.getImageUrl("small", post.imageName),
    }));

    return postsWithUrl;
  }
}

export default GetAllPosts;