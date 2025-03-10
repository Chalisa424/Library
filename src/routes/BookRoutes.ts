import express from 'express';
import { BookAPI } from "../api/BookAPI";
import * as service from "../service/BookService";
import type { Book } from "../models/Book";

const router = express.Router();
const bookAPI = new BookAPI();

// ดึงข้อมูลหนังสือทั้งหมด (พร้อมรองรับ pagination)
router.get('/', async (req, res) => {
  try {
    if (req.query.pageSize && req.query.pageNo) {
      // ถ้ามีการส่ง pageSize และ pageNo มา ให้ทำ pagination
      const pageSize = parseInt(req.query.pageSize as string) || 3;
      const pageNo = parseInt(req.query.pageNo as string) || 1;
      const books = await service.getAllBooksWithPagination(pageSize, pageNo);  
      const totalBooks = await service.count();
     
      // ส่ง header x-total-count กลับไป
      res.setHeader("x-total-count", totalBooks.toString());
     
      // ส่งข้อมูลหนังสือพร้อม pagination กลับไป  
      res.json(books);
    
    } else if (req.query.category) {
      // ถ้ามีการส่ง category มา ให้ดึงหนังสือตาม category
      const category = req.query.category as string;
      const books = await service.getBooksByCategoryWithPagination(category, 10, 1); // ใช้ pageSize และ pageNo เริ่มต้น
      const totalBooks = await service.countBooksByCategory(category);
      
      // ส่ง header x-total-count กลับไป
      res.setHeader("x-total-count", totalBooks.toString());
      
      // ส่งข้อมูลหนังสือกลับไป
      res.json(books);
    } else {
      // ถ้าไม่มี query parameters ให้ดึงข้อมูลหนังสือทั้งหมด (รองรับ pagination)
      const books = await service.getAllBooksWithPagination(10, 1);  // ใช้ getAllBooksWithPagination
      res.json(books);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ใช้ BookAPI สำหรับ route ที่เกี่ยวข้อง
router.get('/search', bookAPI.searchBooks.bind(bookAPI)); // ค้นหาหนังสือตามชื่อ
router.get('/due-date', bookAPI.getBooksByDueDate.bind(bookAPI)); // ค้นหาหนังสือตามกำหนดการคืน
router.get('/not-returned', bookAPI.getBooksNotReturned.bind(bookAPI)); // หนังสือที่ยังไม่ได้คืน

export default router;


