import express from 'express';
import { MemberAPI } from '../api/MemberAPI';

const router = express.Router();
const memberAPI = new MemberAPI();

// Routes สำหรับสมาชิก
router.get('/', memberAPI.getAllMembers.bind(memberAPI)); // ดึงข้อมูลสมาชิกทั้งหมด
router.get('/search', memberAPI.searchMember.bind(memberAPI)); // ค้นหาสมาชิกตามชื่อ
router.get('/:id', memberAPI.getMemberById.bind(memberAPI)); // ดึงข้อมูลสมาชิกตาม ID

export default router;