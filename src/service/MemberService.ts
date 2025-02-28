import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MemberService {
  async getAllMembers() {
    // ดึงข้อมูลสมาชิกทั้งหมดพร้อมกับ loans
    return await prisma.member.findMany({
      include: {
        loans: true, // ให้ดึงข้อมูล loans ด้วย
      },
    });
  }

  async getMemberByName(name: string) {
    // ค้นหาสมาชิกตามชื่อ โดยใช้ toLowerCase
    const lowerCaseName = name.toLowerCase();
    return await prisma.member.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: lowerCaseName,
            },
          },
          {
            lastName: {
              contains: lowerCaseName,
            },
          },
        ],
      },
      include: {
        loans: true, 
      },
    });
  }

  async getMemberById(memberId: number) {
    // ค้นหาสมาชิกตาม ID พร้อมกับ loans
    return await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        loans: true, 
      },
    });
  }
}
