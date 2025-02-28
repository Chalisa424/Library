
import { BookRepository } from '../repository/BookRepository';
import { Book } from '../models/ฺBook';

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAllBooks();
  }

  async searchBooksByTitle(title: string): Promise<Book[]> {
    return this.bookRepository.searchBooksByTitle(title);
  }

  async getBooksByDueDate(dueDate: Date): Promise<Book[]> {
    return this.bookRepository.getBooksByDueDate(dueDate);
  }

  async getBooksNotReturned(): Promise<Book[]> {
    return this.bookRepository.getBooksNotReturned();
  }
}
