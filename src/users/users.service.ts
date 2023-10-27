import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    { userId: 1, username: 'john', password: 'changeme' },
    { userid: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }
}
