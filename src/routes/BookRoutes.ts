import express from 'express';
import { BookAPI } from '../api/BookAPI';

const router = express.Router();
const bookAPI = new BookAPI();

// ดึงข้อมูลหนังสือทั้งหมด (พร้อมรองรับ pagination)
router.get('/', async (req, res) => {
    if (req.query.pageSize && req.query.pageNo) {
      // ถ้ามีการส่ง pageSize และ pageNo มา ให้ทำ pagination
      const pageSize = parseInt(req.query.pageSize as string);
      const pageNo = parseInt(req.query.pageNo as string);
      res.json(await bookAPI.getAllBooksWithPagination(pageSize, pageNo));
    } else if (req.query.category){
      // ถ้าไม่มี pageSize และ pageNo ให้ดึงข้อมูลหนังสือทั้งหมด
     const category = req.query.category;
    }
  });

router.get('/', bookAPI.getAllBooks.bind(bookAPI)); // ดึงข้อมูลหนังสือทั้งหมด
router.get('/search', bookAPI.searchBooks.bind(bookAPI)); // ค้นหาหนังสือตามชื่อ
router.get('/due-date', bookAPI.getBooksByDueDate.bind(bookAPI)); // ค้นหาหนังสือตามกำหนดการคืน
router.get('/not-returned', bookAPI.getBooksNotReturned.bind(bookAPI)); // หนังสือที่ยังไม่ได้คืน

export default router;
