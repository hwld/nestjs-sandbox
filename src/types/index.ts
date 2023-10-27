import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Request } from 'express';

export class ValidatedUser {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export type UserPayload = {
  username: string;
  sub: number;
};

export type ValidatedRequest = Request & { user: ValidatedUser };
