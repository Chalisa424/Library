import { Request, Response } from 'express';
import { MemberService } from '../service/MemberService';

export class MemberAPI {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
  }

  async getAllMembers(req: Request, res: Response): Promise<void> {
    const members = await this.memberService.getAllMembers();
    res.json(members);
  }
  
  async searchMember(req: Request, res: Response): Promise<void> {
    const { name } = req.query;
    const members = await this.memberService.getMemberByName(name as string);
    res.json(members);
  }

  async getMemberById(req: Request, res: Response): Promise<void> {
    const { memberId } = req.params;
    const member = await this.memberService.getMemberById(Number(memberId));
    res.json(member);
  }
}