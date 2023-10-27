import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PrismaUserService } from './prisma-user.service';
import { PostService } from './post.service';
import { CreateUserDTO } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import bcrypt from 'bcrypt';

class LoginDTO {
  @ApiProperty({ default: 'me' })
  username: string;

  @ApiProperty({ default: 'password' })
  password: string;
}

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly userService: PrismaUserService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiBody({ type: LoginDTO })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: string) {
    return this.postService.post({ where: { id: Number(id) } });
  }

  @Get('feed')
  async getPublishedPosts() {
    return this.postService.posts({ where: { published: true } });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string) {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    // ...
    @Body() postData: { title: string; content?: string; authorName: string },
  ) {
    const { title, content, authorName } = postData;
    return this.postService.createPost({
      data: { title, content, author: { connect: { username: authorName } } },
    });
  }

  @Post('user')
  @ApiBody({ type: CreateUserDTO })
  async signupUser(@Body() userData: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    return this.userService.createUser({
      data: { username: userData.username, passwordHash },
    });
  }

  @Get('user')
  async getAllUsers() {
    return this.userService.users({ select: { username: true } });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost({ where: { id: Number(id) } });
  }
}
