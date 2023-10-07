import { Prisma } from "@prisma/client";

export interface CreateUserType {
  user: Prisma.UserUncheckedCreateInput;
}
