import { Request, Response } from 'express';
import { AuthorService } from '../service/AuthorService';

export class AuthorAPI {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  async getAllAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await this.authorService.getAllAuthors();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching authors', error });
    }
  }

  async searchAuthors(req: Request, res: Response): Promise<void> {
    const { query } = req.query;
    try {
      const authors = await this.authorService.searchAuthors(query as string);
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: 'Error searching authors', error });
    }
  }

  async getAuthorById(req: Request, res: Response): Promise<void> {
    const { authorId } = req.params;
    try {
      const author = await this.authorService.getAuthorById(Number(authorId));
      if (author) {
        res.json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching author by ID', error });
    }
  }
}

