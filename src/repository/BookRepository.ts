import { PrismaClient, Book } from '@prisma/client';
import { PageBook } from '../models/Book';

const prisma = new PrismaClient();

export class BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //  ดึงข้อมูลหนังสือทั้งหมด (รองรับ pagination)
  async getAllBooks(pageSize: number, pageNo: number): Promise<Book[]> {
    const skip = (pageNo - 1) * pageSize;
    return await this.prisma.book.findMany({
      skip,
      take: pageSize,
    });
  }

  //  ดึงข้อมูลหนังสือตาม id
  async getBookById(id: number): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }

  // เพิ่มหนังสือใหม่
  async addBook(newBook: Book): Promise<Book> {
    return await this.prisma.book.create({
      data: newBook,
    });
  }

  // ค้นหาหนังสือจากชื่อ
  async searchBooksByTitle(title: string): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  // ค้นหาหนังสือที่ยังไม่ได้คืน
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

  //  ดึงหนังสือพร้อม pagination (รวมข้อมูลคนเขียน)
  async getAllBooksWithAuthorPagination(
    pageSize: number,
    pageNo: number,
    keyword: string = '' // กำหนดค่าเริ่มต้นให้ keyword เป็นค่าว่าง
  ): Promise<{ count: number; books: Book[] }> {
    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { description: { contains: keyword } },
            { category: { contains: keyword } },
          ],
        }
      : {};
  
    const books = await this.prisma.book.findMany({
      where,
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  
    const booksWithAuthorId = books.map(book => ({
      ...book,
      authorId: book.authorId, 
    }));
  
    const count = await this.prisma.book.count({ where });
    return { count, books: booksWithAuthorId };
  }
  
  async countBooks(): Promise<number> {
    return await this.prisma.book.count();
    
  }

  // ดึงหนังสือตาม category พร้อม pagination
  async getBooksByCategoryWithPagination(category: string, pageSize: number, pageNo: number): Promise<Book[]> {
    const skip = (pageNo - 1) * pageSize;
    return await this.prisma.book.findMany({
      skip,
      take: pageSize,
      where: {
        category,
      },
    });
  }

  // นับจำนวนหนังสือตาม category
  async countBooksByCategory(category: string): Promise<number> {
    return await this.prisma.book.count({
      where: {
        category,
      },
    });
  }

  async getBooksByDueDate(dueDate: Date): Promise<Book[]> {
    return await prisma.book.findMany({
      where: {
        loans: {
          some: {
            dueDate: {
              equals: dueDate,
            },
          },
        },
      },
    });
  }
async getBooksByPage(pageSize: number, pageNo: number): Promise<Book[]> {
    const skip = (pageNo - 1) * pageSize;
    return await prisma.book.findMany({
      skip,
      take: pageSize,
    });
  }
}

// ฟังก์ชันที่อยู่ภายนอก BookRepository สำหรับการใช้ `export`
export async function getAllBooksWithAuthorPagination(
  pageSize: number,
  pageNo: number
): Promise<Book[]> {
  const skip = (pageNo - 1) * pageSize;
  return await prisma.book.findMany({
    skip,
    take: pageSize,
    include: {
      author: true,
    },
  });
}

export async function countBooks(): Promise<number> {
  return await prisma.book.count();
}

export async function getBooksByCategoryWithPagination(
  category: string,
  pageSize: number,
  pageNo: number
): Promise<Book[]> {
  const skip = (pageNo - 1) * pageSize;
  return await prisma.book.findMany({
    skip,
    take: pageSize,
    where: {
      category,
    },
  });
}

export async function countBooksByCategory(category: string): Promise<number> {
  return await prisma.book.count({
    where: {
      category,
    },
  });
}
