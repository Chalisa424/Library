import { PrismaClient } from '@prisma/client';
import * as repo from '../repository/BookRepository';

const prisma = new PrismaClient();

export class BookService {
  // ดึงข้อมูลหนังสือทั้งหมด
  async getAllBooks() {
    return await prisma.book.findMany();
  }

  // ดึงข้อมูลหนังสือตาม id
  async getBookById(id: number) {
    return await prisma.book.findUnique({
      where: { id }
    });
  }

  // เพิ่มหนังสือใหม่
  async addBook(newBook: any) {
    return await prisma.book.create({
      data: newBook
    });
  }

  // ค้นหาหนังสือจากชื่อ
  async searchBooksByTitle(title: string) {
    const lowerCaseTitle = title.toLowerCase();
    return await prisma.book.findMany({
      where: {
        title: {
          contains: lowerCaseTitle,
        },
      },
    });
  }

  // ค้นหาหนังสือที่มีกำหนดวันคืนตามวันที่ที่กำหนด
  async getBooksByDueDate(dueDate: Date) {
    return await prisma.loan.findMany({
      where: {
        dueDate: {
          lte: dueDate, // ค้นหาหนังสือที่มีกำหนดการคืนก่อนวันที่กำหนด
        },
      },
      include: {
        book: true, // ดึงข้อมูลของหนังสือที่เกี่ยวข้อง
      },
    });
  }

  // ค้นหาหนังสือที่ยังไม่ได้คืน
  async getBooksNotReturned() {
    return await prisma.loan.findMany({
      where: {
        returnDate: null, // ตรวจสอบว่า returnDate เป็น null (ยังไม่คืน)
      },
      include: {
        book: true, // ดึงข้อมูลหนังสือที่เกี่ยวข้อง
      },
    });
  }
}

export function getAllBooksWithPagination(pageSize: number, pageNo: number) {
    return repo.getAllBooksWithAuthorPagination(pageSize, pageNo);
  }
  
  export function count(){
      return repo.countBooks();
    }
      