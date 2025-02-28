import express from 'express';
import { LoanAPI } from '../api/LoanAPI';

const router = express.Router();
const loanAPI = new LoanAPI();

router.get('/', loanAPI.getAllLoans.bind(loanAPI)); // ดึงข้อมูลการยืมทั้งหมด
router.post('/', loanAPI.createLoan.bind(loanAPI)); // สร้างการยืมใหม่
router.get('/history/:memberId', loanAPI.getLoanHistory.bind(loanAPI)); // ดูประวัติการยืมของสมาชิก

export default router;
