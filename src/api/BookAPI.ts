import { Request,Response } from "express";
import { BookService } from "../service/BookService";

export class BookAPI{
    private bookService : BookService;

    constructor(){
        this.bookService = new BookService();
    }

    async getAllBooks(req: Request, res: Response): Promise<void>{
        const books =await this.bookService.getAllBooks();
        res.json(books);
    }
    async  searchBooks(req: Request, res: Response): Promise<void>{
        const {title} = req.query;
        const books = await this.bookService.searchBooksByTitle(title as string);
        res.json(books);
    }
    async  getBooksByDueDate(req:Request, res:Response): Promise<void>{
        const { dueDate } = req.query;
        const books = await this.bookService.getBooksByDueDate(new Date(dueDate as string));
        res.json(books); 
    }
    async getBooksNotReturned(req: Request, res: Response): Promise<void> {
        const books = await this.bookService.getBooksNotReturned();
        res.json(books);
      }
}