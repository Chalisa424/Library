import express from 'express';
import { BookAPI } from '../api/BookAPI';

const router = express.Router();
const bookAPI = new BookAPI();

router.get('/', bookAPI.getAllBooks.bind(bookAPI)); // ดึงข้อมูลหนังสือทั้งหมด
router.get('/search', bookAPI.searchBooks.bind(bookAPI)); // ค้นหาหนังสือตามชื่อ
router.get('/due-date', bookAPI.getBooksByDueDate.bind(bookAPI)); // ค้นหาหนังสือตามกำหนดการคืน
router.get('/not-returned', bookAPI.getBooksNotReturned.bind(bookAPI)); // หนังสือที่ยังไม่ได้คืน

export default router;
