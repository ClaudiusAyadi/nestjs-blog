import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/database/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getPosts() {
    return await this.db.query.posts.findMany({ with: { author: true } });
  }

  async createPost(post: typeof schema.posts.$inferInsert) {
    await this.db.insert(schema.posts).values(post);
    return {
      message: 'Post created successfully',
    };
  }
}
