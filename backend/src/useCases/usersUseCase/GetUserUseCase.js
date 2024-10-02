import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class GetUserUseCase {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  async execute({ email, password }) {
    const user = await this.prismaRepository.getUser({ email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
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