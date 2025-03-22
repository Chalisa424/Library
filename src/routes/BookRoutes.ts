import express from 'express';
import { BookAPI } from "../api/BookAPI";
import * as service from "../service/BookService";
import type { Book } from "../models/Book";

const router = express.Router();
const bookAPI = new BookAPI();

// ดึงข้อมูลหนังสือทั้งหมด (พร้อมรองรับ pagination)
router.get('/', async (req, res) => {
  console.log("Received parameters: pageSize =", req.query.pageSize, "pageNo =", req.query.pageNo);
  const pageSize = parseInt(req.query.pageSize as string) || 3;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const books = await service.getAllBooksWithPagination(pageSize, pageNo);  
  const totalBooks = await service.count();
  const keyword = req.query.keyword as string;


  try {
    const result = await service.getAllBooksWithPagination(pageSize, pageNo);
    if (result.length === 0) {
        res.status(404).send("No event found");
        return;
    }
    
    res.setHeader("x-total-count", totalBooks.toString());
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");

    res.end(JSON.stringify(result));


} catch (error) {
    console.error("Error occurred: ", error);
    if (pageNo < 1 || pageSize < 1) {
        res.status(400).send("Invalid pageNo or pageSize");
    } else {
        res.status(500).send("Internal Server Error");
    }
    return;
}
finally {
    console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
}

});

// ใช้ BookAPI สำหรับ route ที่เกี่ยวข้อง
router.get('/search', bookAPI.searchBooks.bind(bookAPI)); // ค้นหาหนังสือตามชื่อ
router.get('/due-date', bookAPI.getBooksByDueDate.bind(bookAPI)); // ค้นหาหนังสือตามกำหนดการคืน
router.get('/not-returned', bookAPI.getBooksNotReturned.bind(bookAPI)); // หนังสือที่ยังไม่ได้คืน

export default router;


