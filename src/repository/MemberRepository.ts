// src/repository/MemberRepository.ts
import { PrismaClient, Member } from '@prisma/client';

export class MemberRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getMemberByName(name: string): Promise<Member[]> {
    return await this.prisma.member.findMany({
      where: {
        OR: [
          { firstName: { contains: name.toLowerCase() } },
          { lastName: { contains: name.toLowerCase() } },
        ],
      },
    });
  }

  async getMemberById(memberId: number): Promise<Member | null> {
    return await this.prisma.member.findUnique({
      where: { id: memberId },
    });
  }
}