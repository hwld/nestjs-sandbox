import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { CreateUserDTO } from './create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

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
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ) {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      data: { title, content, author: { connect: { email: authorEmail } } },
    });
  }

  @Post('user')
  async signupUser(@Body() userData: CreateUserDTO) {
    return this.userService.createUser({ data: userData });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost({ where: { id: Number(id) } });
  }
}
