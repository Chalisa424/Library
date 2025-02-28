import { Loan } from '@prisma/client';
import { LoanService } from '../service/LoanService';

export class LoanAPI {
    private loanService: LoanService;
  
    constructor() {
      this.loanService = new LoanService();
    }
  
   
    async createLoan(loanData: { bookId: number; memberId: number; quantity: number; dueDate: Date }): Promise<Loan> {
      return this.loanService.createLoan(loanData);
    }
  
  
    async getLoansByDueDate(dueDate: Date): Promise<Loan[]> {
      return this.loanService.getLoansByDueDate(dueDate);
    }

    async getLoansNotReturned(): Promise<Loan[]> {
      return this.loanService.getLoansNotReturned();
    }
  }