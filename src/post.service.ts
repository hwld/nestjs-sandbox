import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async post(args: Prisma.PostFindUniqueArgs) {
    return this.prisma.post.findUnique({ ...args });
  }

  async posts(args: Prisma.PostFindManyArgs) {
    return this.prisma.post.findMany({ ...args });
  }

  async createPost(args: Prisma.PostCreateArgs) {
    return this.prisma.post.create({ ...args });
  }

  async updatePost(args: Prisma.PostUpdateArgs) {
    return this.prisma.post.update({ ...args });
  }

  async deletePost(args: Prisma.PostDeleteArgs) {
    return this.prisma.post.delete({ ...args });
  }
}
