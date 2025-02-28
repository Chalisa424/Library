
import { PrismaClient, Book } from '@prisma/client';


export class LoanRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createLoan(loanData: Partial<Loan>): Promise<Loan> {
    return await this.prisma.loan.create({
      data: loanData,
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
