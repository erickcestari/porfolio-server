import z from 'zod'
import { NextFunction, Request, Response } from 'express'
import { makeRegisterUserService } from '@/services/factories/users/makeRegisterUserService'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registerBodySchema = z.object({
      code: z.string()
    })
    const {code} = registerBodySchema.parse(req.body)
    const registerService = makeRegisterUserService()
    const {token} = await registerService.execute({code})

    return res.status(200).json({token})
  } catch (err) {
    return next(err);
  }
}