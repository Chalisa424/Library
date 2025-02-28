import { PrismaClient } from '@prisma/client';
import { Author } from '../models/Author';

export class AuthorRepository {
  searchAuthors(name: string): Author[] | PromiseLike<Author[]> {
    throw new Error('Method not implemented.');
  }
  getAuthorById(authorId: number): Author | PromiseLike<Author | null> | null {
    throw new Error('Method not implemented.');
  }
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.prisma.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            books: true,
        },
    }) as unknown as Author[];
  }
}