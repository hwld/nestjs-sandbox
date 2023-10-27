import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserService {
  constructor(private prisma: PrismaService) {}

  async user(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  async users(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany({ ...args });
  }

  async createUser(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create({ ...args });
  }

  async deleteUser(args: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete({ ...args });
  }
}
