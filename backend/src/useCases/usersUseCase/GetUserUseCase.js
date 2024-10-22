import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class GetUserUseCase {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  async execute({ email, password }) {
    const user = await this.prismaRepository.getUser({ email });

    if (!user) {
      const error = new Error("Usuário não encontrado");
      error.code = "USER_NOT_FOUND";
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Senha incorreta");
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    const validUser = {
      email: user.email,
      username: user.username,
    };

    const accessToken = jwt.sign(validUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

    return accessToken;
  }
}

export default GetUserUseCase;