import { Prisma, User } from "@prisma/client"

export interface CreateUserType {
  user: Prisma.UserUncheckedCreateInput
}

interface UpdateUser extends Prisma.UserUpdateInput {
  id: string;
}

export interface UpdateUserType {
  user: UpdateUser
}

export interface SearchManyPetsReturn {
  users: User[]
}

export interface RegisterUserType {
  code: string
}