import { RegisterUserService } from "@/services/users/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUserRepository"; 

export const makeRegisterUserService = () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new RegisterUserService(
    prismaUsersRepository,
  );

  return service;
};
