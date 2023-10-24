import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CreateCatDtoClass } from './dto/create-cat.dto';
import { DummyInterceptor } from 'src/dummy/dummy.interceptor';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDtoClass) {
    console.log(createCatDto);
    return this.catsService.create(createCatDto);
  }

  @Get()
  @UseInterceptors(DummyInterceptor)
  findAll(@Req() req: Request) {
    console.log((req as any)['user']);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
