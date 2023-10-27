import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserService } from 'src/prisma-user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: PrismaUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.user({
      username,
    });

    if (!user) {
      console.log('not user');
      return null;
    }

    const isCorrectPassword = await bcrypt.compare(pass, user.passwordHash);
    if (!isCorrectPassword) {
      console.log('incorrect password');
      return null;
    }

    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
