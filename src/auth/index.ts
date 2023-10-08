import { env } from "@/env";

export const auth = {
  secret: String(env.JWT_SECRET),
  expires: '30 days',
};