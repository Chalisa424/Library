
import { PrismaClient, Book, Loan } from '@prisma/client';


export class LoanRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createLoan(loanData: { bookId: number; memberId: number; quantity: number; dueDate: Date }): Promise<Loan> {
    return await this.prisma.loan.create({
      data: {
        bookId: loanData.bookId,
        memberId: loanData.memberId,
        quantity: loanData.quantity,
        dueDate: loanData.dueDate,

      },
    });
  }

  async getLoansByDueDate(dueDate: Date): Promise<Loan[]> {
    return await this.prisma.loan.findMany({
      where: {
        dueDate: dueDate,
        returnDate: null,
      },
    });
  }

  async getLoansNotReturned(): Promise<Loan[]> {
    return await this.prisma.loan.findMany({
      where: {
        returnDate: null,
      },
    });
  }
}
