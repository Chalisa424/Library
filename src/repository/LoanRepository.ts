import { PrismaClient, Loan } from '@prisma/client';  
import { Loan as LoanModel } from '../models/Loan'; 
export class LoanRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // ยืมใหม่
  async createLoan(loanData: { bookId: number; memberId: number; quantity: number; dueDate: Date }): Promise<Loan> {
    return this.prisma.loan.create({
      data: {
        ...loanData,  
      },
    });
  }

  // ดึงข้อมูลการยืม
  async getLoansByDueDate(dueDate: Date): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      where: {
        dueDate: dueDate,
        returnDate: null,  
      },
      include: {
        book: true, 
        member: true,  
      },
    });
  }

  // ดึงข้อมูลการยืมที่ยังไม่ได้คืน
  async getLoansNotReturned(): Promise<Loan[]> {
    return this.prisma.loan.findMany({
      where: {
        returnDate: null,  
      },
      include: {
        book: true,  
        member: true, 
      },
    });
  }
}
