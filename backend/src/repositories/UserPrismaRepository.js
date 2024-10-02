import User from "../entities/User.js";
import UserRepository from "./UserRepository.js";
import { PrismaClient } from "@prisma/client";

class UserPrismaRepository extends UserRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async create({ email, username, password }) {
    const data = await this.prisma.users.create({
      data: { email, username, password },
    });

    return new User(data);
  }

  async getUser({ email }) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    return user ? new User(user) : null;
  }
}

export default UserPrismaRepository;