import { Book } from '@prisma/client';
import * as repo from '../repository/BookRepository';

export class BookService {
  countBooks() {
    throw new Error("Method not implemented.");
  }
  private bookRepository: repo.BookRepository;

  constructor() {
    this.bookRepository = new repo.BookRepository();
  }

  // ดึงข้อมูลหนังสือทั้งหมด
  async getAllBooks(pageSize: number, pageNo: number): Promise<Book[]> {
    return await this.bookRepository.getAllBooks(pageSize, pageNo);
  }

  // ดึงข้อมูลหนังสือตาม id
  async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.getBookById(id);
  }

  // เพิ่มหนังสือใหม่
  async addBook(newBook: Book): Promise<Book> {  // ใช้ประเภท Book แทน any
    return await this.bookRepository.addBook(newBook);
  }

  // ค้นหาหนังสือจากชื่อ
  async searchBooksByTitle(title: string): Promise<Book[]> {
    return await this.bookRepository.searchBooksByTitle(title);
  }

  // ค้นหาหนังสือที่มีกำหนดวันคืนตามวันที่ที่กำหนด
  async getBooksByDueDate(dueDate: Date): Promise<Book[]> {
    return await this.bookRepository.getBooksByDueDate(dueDate);
  }

  // ค้นหาหนังสือที่ยังไม่ได้คืน
  async getBooksNotReturned(): Promise<Book[]> {
    return await this.bookRepository.getBooksNotReturned();
  }

  // ดึงหนังสือพร้อม pagination
  async getBooksByPage(pageSize: number, pageNo: number): Promise<Book[]> {
    return await this.bookRepository.getBooksByPage(pageSize, pageNo);
  }

  // ดึงหนังสือพร้อมผู้เขียน (พร้อม pagination)
  async getAllBooksWithAuthorPagination(
    pageSize: number,
    pageNo: number
  ): Promise<Book[]> {
    return await this.bookRepository.getAllBooksWithAuthorPagination(pageSize, pageNo);
  }

  // ดึงหนังสือตาม category พร้อม pagination
  async getBooksByCategoryWithPagination(
    category: string,
    pageSize: number,
    pageNo: number
  ): Promise<Book[]> {
    return await this.bookRepository.getBooksByCategoryWithPagination(category, pageSize, pageNo);
  }

  // นับจำนวนหนังสือทั้งหมด
  async count(): Promise<number> {
    return await this.bookRepository.countBooks();
  }

  // ใน BookService

  // นับจำนวนหนังสือตาม category
  async countBooksByCategory(category: string): Promise<number> {
    return await this.bookRepository.countBooksByCategory(category);
  }

  // เพิ่มฟังก์ชันที่ต้องการ
  async getAllBooksWithPagination(
    pageSize: number,
    pageNo: number
  ): Promise<Book[]> {
    return await this.bookRepository.getBooksByPage(pageSize, pageNo);
  }
}

// ฟังก์ชัน export ที่อยู่ภายนอก BookService
export async function getAllBooksWithPagination(
  pageSize: number,
  pageNo: number
): Promise<Book[]> {
  return await repo.getAllBooksWithAuthorPagination(pageSize, pageNo);
}

export async function getBooksByCategoryWithPagination(
  category: string,
  pageSize: number,
  pageNo: number
): Promise<Book[]> {
  return await repo.getBooksByCategoryWithPagination(category, pageSize, pageNo);
}

export async function count(): Promise<number> {
  const bookRepository = new repo.BookRepository();
  return bookRepository.countBooks();
}

export async function countBooksByCategory(category: string): Promise<number> {
  const bookRepository = new repo.BookRepository();
  return bookRepository.countBooksByCategory(category);
}
