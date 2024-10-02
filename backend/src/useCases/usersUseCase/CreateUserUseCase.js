import bcrypt from "bcrypt"

class CreateUserUseCase {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  async execute({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await this.prismaRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserUseCase;