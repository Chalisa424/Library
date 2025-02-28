import { Loan } from '@prisma/client';
import { LoanService } from '../service/LoanService';
import { Request, Response } from 'express';

export class LoanAPI {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  async createLoan(req: Request, res: Response): Promise<void> {
    const loanData = req.body;
    try {
      const loan = await this.loanService.createLoan(loanData);
      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: 'Error creating loan', error });
    }
  }

  async getLoansByDueDate(req: Request, res: Response): Promise<void> {
    const { dueDate } = req.query;
    try {
      const loans = await this.loanService.getLoansByDueDate(new Date(dueDate as string));
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching loans by due date', error });
    }
  }

  async getLoansNotReturned(req: Request, res: Response): Promise<void> {
    try {
      const loans = await this.loanService.getLoansNotReturned();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching loans not returned', error });
    }
  }

  async getLoanHistory(req: Request, res: Response): Promise<void> {
    const { memberId } = req.params;
    if (!memberId) {
      res.status(400).json({ message: 'Member ID is required' });
      return;
    }

    try {
      const history = await this.loanService.getLoanHistory(Number(memberId));
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching loan history', error });
    }
  }

  async getAllLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await this.loanService.getAllLoans();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all loans', error });
    }
  }
}