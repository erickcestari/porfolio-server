import { UsersRepository } from "../../repositories/userRepository";
import { RegisterUserType } from "../../types/userTypes";
import axios from "axios";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { auth } from "@/auth";

interface RegisterUserServiceResponse {
  token: string;
}

export class RegisterUserService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    code
  }: RegisterUserType): Promise<RegisterUserServiceResponse> {
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const { access_token } = accessTokenResponse.data;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    });

    const userInfo = userSchema.parse(userResponse.data);

    let user = await this.usersRepository.findByGithubId(userInfo.id);

    if (!user) {
      user = await this.usersRepository.create({
        user: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        }
      });
    }

    const token = sign({
      sub: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, 
    auth.secret,
    {
      expiresIn: auth.expires
    });

    return {
      token,
    };
  }
}
