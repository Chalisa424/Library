// src/repository/MemberRepository.ts
import { PrismaClient } from '@prisma/client';
import { Member } from '../models/Member';

export class MemberRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getMemberByName(name: string): Promise<Member[]> {
    return await this.prisma.member.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: name,
              mode: 'insensitive',
            },
          },
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
