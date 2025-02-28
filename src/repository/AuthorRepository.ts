import { PrismaClient } from '@prisma/client';
import { Author } from '../models/Author';

export class AuthorRepository {
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