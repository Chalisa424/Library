import { Request, Response } from "express";
import { BookService } from "../service/BookService";

export class BookAPI {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  // ดึงข้อมูลหนังสือทั้งหมด (พร้อมรองรับ pagination)
  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const pageSize = parseInt(req.query.pageSize as string) || 3;
      const pageNo = parseInt(req.query.pageNo as string) || 1;
      const books = await this.bookService.getAllBooksWithPagination(pageSize, pageNo);
      const totalBooks = await this.bookService.count();
      console.log(totalBooks);  // ตรวจสอบค่า totalBooks
  
      if (typeof totalBooks === 'number') {
        res.setHeader("x-total-count", totalBooks.toString()); // ใช้ .toString() ได้
      } else {
        res.status(500).json({ error: 'Error in counting books' });
        return;
      }
  
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // ค้นหาหนังสือจากชื่อ
  async searchBooks(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.query;
      const books = await this.bookService.searchBooksByTitle(title as string);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // ค้นหาหนังสือที่มีกำหนดวันคืนตามวันที่ที่กำหนด
  async getBooksByDueDate(req: Request, res: Response): Promise<void> {
    try {
      const { dueDate } = req.query;
      const books = await this.bookService.getBooksByDueDate(new Date(dueDate as string));
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // ค้นหาหนังสือที่ยังไม่ได้คืน
  async getBooksNotReturned(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getBooksNotReturned();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
