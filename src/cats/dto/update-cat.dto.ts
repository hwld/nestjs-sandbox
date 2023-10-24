import { PartialType } from '@nestjs/swagger';
import { CreateCatDtoClass } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDtoClass) {}
