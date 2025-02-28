import { LoanRepository } from '../repository/LoanRepository';
import { Loan } from '@prisma/client'; 

export class LoanService {
  private loanRepository: LoanRepository;

  constructor() {
    this.loanRepository = new LoanRepository();
  }

  
  async createLoan(loanData: { bookId: number; memberId: number; quantity: number; dueDate: Date }): Promise<Loan> {
    return this.loanRepository.createLoan(loanData);
  }

 
  async getLoansByDueDate(dueDate: Date): Promise<Loan[]> {
    return this.loanRepository.getLoansByDueDate(dueDate);
  }

  async getLoansNotReturned(): Promise<Loan[]> {
    return this.loanRepository.getLoansNotReturned();
  }
}
