import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return await this.db.query.users.findMany({ with: { posts: true } });
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    await this.db.insert(schema.users).values(user);
    return {
      message: 'User created successfully',
    };
  }
}
