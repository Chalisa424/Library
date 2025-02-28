
import { MemberRepository } from '../repository/MemberRepository';
import { Member } from '../models/Member';

export class MemberService {
  private memberRepository: MemberRepository;

  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async getMemberByName(name: string): Promise<Member[]> {
    return this.memberRepository.getMemberByName(name);
  }

  async getMemberById(memberId: number): Promise<Member | null> {
    return this.memberRepository.getMemberById(memberId);
  }
}
