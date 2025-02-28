import { Request, Response } from 'express';
import { AuthorService } from '../service/AuthorService';

export class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  async getAllAuthors(req: Request, res: Response): Promise<void> {
    const authors = await this.authorService.getAllAuthors();
    res.json(authors);
  }
}