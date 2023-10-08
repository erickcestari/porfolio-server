import { CreateUserType } from "../types/userTypes";
import { User } from "@prisma/client";

export interface UsersRepository {
  create(data: CreateUserType): Promise<User>;
  findByGithubId(githubId: number): Promise<User | null>;
}