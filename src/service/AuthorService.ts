
import { AuthorRepository } from '../repository/AuthorRepository';
import { Author } from '../models/Author';

export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.getAllAuthors();
  }

  async getAuthorById(authorId: number): Promise<Author | null> {
    return await this.authorRepository.getAuthorById(authorId) ?? null;
  }

  async searchAuthors(name: string): Promise<Author[]> {
    return await this.authorRepository.searchAuthors(name);
  }
}
