import { CreateUserService } from "../../users/createUser";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUserRepository"; 

export const makeCreateUserService = () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new CreateUserService(
    prismaUsersRepository,
  );

  return service;
};
