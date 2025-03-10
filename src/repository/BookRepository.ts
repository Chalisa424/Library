// src/repository/BookRepository.ts
import { PrismaClient } from '@prisma/client';
import { Book } from '@prisma/client';

const prisma = new PrismaClient();


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

export async function getAllBooksWithAuthorPagination(
  pageSize: number,
  pageNo: number
) {
  return await prisma.book.findMany({
    skip: pageSize * (pageNo - 1), // ข้ามข้อมูลตามหน้า
    take: pageSize, // จำนวนข้อมูลต่อหน้า
    select: {
      id: true,
      title: true,
      category: true,
      author: {
        select: {
          firstName: true, // เลือกเฉพาะชื่อ author
          lastName: true, // เลือกเฉพาะนามสกุล author
        },
      },
    },
  });
}

export function countBooks() {
    return prisma.book.count();
  }
  
  