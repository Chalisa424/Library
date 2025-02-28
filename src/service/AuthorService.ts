
import { AuthorRepository } from '../repository/AuthorRepository';
import { Author } from '../models/Author';

export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.authorRepository.getAllAuthors();
  }
}
