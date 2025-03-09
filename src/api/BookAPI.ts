import { Request, Response } from "express";
import { BookService, getAllBooksWithPagination } from "../service/BookService";

export class BookAPI {
  getAllBooksWithPagination(pageSize: number, pageNo: number): any {
      throw new Error('Method not implemented.');
  }
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  // ดึงข้อมูลหนังสือทั้งหมด
  async getAllBooks(req: Request, res: Response): Promise<void> {
    const books = await this.bookService.getAllBooks();
    res.json(books);
  }

  // ค้นหาหนังสือจากชื่อ
  async searchBooks(req: Request, res: Response): Promise<void> {
    const { title } = req.query;
    const books = await this.bookService.searchBooksByTitle(title as string);
    res.json(books);
  }

  // ค้นหาหนังสือที่มีกำหนดวันคืนตามวันที่ที่กำหนด
  async getBooksByDueDate(req: Request, res: Response): Promise<void> {
    const { dueDate } = req.query;
    const books = await this.bookService.getBooksByDueDate(new Date(dueDate as string));
    res.json(books);
  }

  // ค้นหาหนังสือที่ยังไม่ได้คืน
  async getBooksNotReturned(req: Request, res: Response): Promise<void> {
    const books = await this.bookService.getBooksNotReturned();
    res.json(books);
  }
}

