import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeCreateUserService } from "@/services/factories/users/makeCreateUserService";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const create = async (request: Request, response: Response, next: NextFunction) => {
  try {
  const createUserBodySchema = z.object({
    name: z.string().min(1).max(255),
    login: z.string().min(1).max(255),
    avatarUrl: z.string().min(1).max(255),
    githubId: z.number(),
  });

  const {
    name,
    login,
    avatarUrl,
    githubId,
  } = createUserBodySchema.parse(request.body);

  const createUserService = makeCreateUserService();
    await createUserService.execute({
      user: {
        name,
        login,
        avatarUrl,
        githubId,
      },
    });
    return response.status(201).send();
  } catch (err) {
    return next(err);
  }
};
