import { LoanRepository } from '../repository/LoanRepository';
import { Loan, PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

export class LoanService {
   // สร้างการยืม
   async createLoan(loanData: { bookId: number; memberId: number; quantity: number; dueDate: Date }) {
    return await prisma.loan.create({
        data: {
            bookId: loanData.bookId,
            memberId: loanData.memberId,
            quantity: loanData.quantity,
            dueDate: loanData.dueDate,
        },
    });
}

// ดึงข้อมูลการยืมทั้งหมด
async getAllLoans() {
    return await prisma.loan.findMany({
        include: {
            book: true, // ดึงข้อมูลหนังสือ
            member: true, // ดึงข้อมูลสมาชิก
        },
    });
}

// ดึงข้อมูลการยืมตาม dueDate
async getLoansByDueDate(dueDate: Date) {
    return await prisma.loan.findMany({
        where: {
            dueDate: {
                lte: dueDate, // ค้นหาก่อน dueDate
            },
        },
        include: {
            book: true, // ดึงข้อมูลหนังสือ
            member: true, // ดึงข้อมูลสมาชิก
        },
    });
}

// ดึงข้อมูลการยืมที่ยังไม่ถูกคืน
async getLoansNotReturned() {
    return await prisma.loan.findMany({
        where: {
            returnDate: null, // ค้นหาที่ยังไม่มีการคืน
        },
        include: {
            book: true, // ดึงข้อมูลหนังสือ
            member: true, // ดึงข้อมูลสมาชิก
        },
    });
}

// ดึงข้อมูลประวัติการยืมของสมาชิก
async getLoanHistory(memberId: number) {
    return await prisma.loan.findMany({
        where: {
            memberId: memberId, // ค้นหาตามสมาชิก
        },
        include: {
            book: true, // ดึงข้อมูลหนังสือ
        },
    });
}
}