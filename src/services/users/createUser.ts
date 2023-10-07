import { UsersRepository } from "../../repositories/userRepository";
import { User } from "@prisma/client";
import { CreateUserType } from "../../types/userTypes";

interface CreateUserServiceResponse {
  createdUser: User;
}

export class CreateUserService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    user
  }: CreateUserType): Promise<CreateUserServiceResponse> {
    const createdUser = await this.usersRepository.create({
      user,
    });

    return {
      createdUser,
    };
  }
}
