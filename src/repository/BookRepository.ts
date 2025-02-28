// src/repository/BookRepository.ts
import { PrismaClient } from '@prisma/client';
import { Book } from '@prisma/client';

export class BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async searchBooksByTitle(title: string): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
          // ค้นหาชื่อหนังสือที่ตรงกับคำที่ค้นหา
        },
      },
    });
  }

  async getBooksByDueDate(dueDate: Date): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        loans: {
          some: {
            dueDate: dueDate,
            returnDate: null,
          },
        },
      },
    });
  }

  async getBooksNotReturned(): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        loans: {
          some: {
            returnDate: null,
          },
        },
      },
    });
  }
}
