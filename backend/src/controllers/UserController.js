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
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios: email, username e password" });
      }

      const newUser = await this.createUserUseCase.execute({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      if (error.code === 'P2002') {
        const targetField = error.meta.target;
  
        if (targetField === 'Users_email_key') {
          return res.status(409).json({ message: "E-mail fornecido já em uso" });
        } 
        if (targetField === 'Users_username_key') {
          return res.status(409).json({ message: "Nome de usuário fornecido já em uso" });
        }
      }

      res.status(500).json({ message: "Erro interno do servidor ao criar usuário" });
    }
  }

  getUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      const token = await this.getUserUseCase.execute({ email, password });

      if (!token) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        secure: true,
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
      
      if (error.code === "USER_NOT_FOUND") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      } else if (error.code === "INVALID_CREDENTIALS") {
        return res.status(401).json({ message: "Senha incorreta" });
      }
  
      res.status(500).json({ message: "Erro interno do servidor ao tentar logar." });
    }
  }
}

export default UserController;