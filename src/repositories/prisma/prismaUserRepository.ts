import { User } from "@prisma/client";
import { UsersRepository } from "../userRepository";
import {
  CreateUserType,
  SearchManyPetsReturn,
  UpdateUserType,
} from "@/types/userTypes";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async searchMany(): Promise<SearchManyPetsReturn> {
    const users = await prisma.user.findMany({})

    return { users };
  }

  async update({ user }: UpdateUserType): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return updatedUser;
  }

  async create({ user }: CreateUserType) {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByGithubId(githubId: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        githubId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
