import UserPrismaRepository from "../repositories/UserPrismaRepository.js";
import CreateUserUseCase from "../useCases/usersUseCase/CreateUserUseCase.js";
import GetUserUseCase from "../useCases/usersUseCase/GetUserUseCase.js";

class UserController {
  constructor() {
    const prismaRepository = new UserPrismaRepository();
    this.createUserUseCase = new CreateUserUseCase(prismaRepository);
    this.getUserUseCase = new GetUserUseCase(prismaRepository);
  }

  create = async (req, res) => {
    try {
      const post = await this.createUserUseCase.execute({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  getUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.getUserUseCase.execute({ email, password });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        secure: false,
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
      res.status(401).json({ message: "Erro ao buscar usuário" });
    }
  }


}

export default UserController;