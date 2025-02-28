import express from 'express';
import { AuthorAPI } from '../api/AuthorAPI';

const router = express.Router();
const authorController = new AuthorAPI();

router.get('/', authorController.getAllAuthors.bind(authorController)); // ดึงข้อมูลผู้แต่งทั้งหมด
router.get('/search', authorController.searchAuthors.bind(authorController)); // ค้นหาผู้แต่ง
router.get('/:authorId', authorController.getAuthorById.bind(authorController)); // ดึงข้อมูลผู้แต่งตาม ID

export default router;