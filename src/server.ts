import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// เส้นทางหลัก (root route)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Library Application');
});


///////// Endpoint สำหรับหนังสือ ///////////
app.get('/books', async (req: Request, res: Response) => {

  const pageSize = parseInt(req.query.pageSize as string) ||3; 
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = req.query.keyword as string;
  
  try {

      // นับจำนวนหนังสือทั้งหมด
      const totalBooks = await prisma.book.count();

      // ดึงข้อมูลหนังสือตามหน้า
      const books = await prisma.book.findMany({
        where: {
          id: {
            in: [1, 2, 3] 
          }
        },
        skip: (pageNo - 1) * pageSize,  
        take: pageSize,                 
        include: {
          author: true,  
        },
      });

      res.json({totalBooks,books});
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ดึงข้อมูลหนังสือทั้งหมด
app.get('/books', async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    include: {
      author: true, // รวมข้อมูลผู้แต่ง
    },
  });
  res.json(books);
});

// ค้นหาหนังสือตามชื่อ
app.get('/books/search', async (req: Request, res: Response) => {
  const title = req.query.title as string;
  
  //ช้ toLowerCase หา title ที่ไม่สนใจตัวพิมพ์เล็กใหญ่
  const books = await prisma.book.findMany({
    where: {
      title: {
        // ใช้ toLowerCase เพื่อแปลงตัวอักษรเป็นตัวพิมพ์เล็ก
        contains: title,
      },
    },
  });
  
  res.json(books);
});

// ดึงข้อมูลหนังสือ
app.get('/books/due-date', async (req: Request, res: Response) => {
  const dueDate = new Date(req.query.dueDate as string);
  const books = await prisma.loan.findMany({
    where: {
      dueDate: dueDate,
    },
    include: {
      book: true,
    },
  });
  res.json(books);
});

// ดึงข้อมูลหนังสือที่ยังไม่ได้คืน
app.get('/books/not-returned', async (req: Request, res: Response) => {
  const books = await prisma.loan.findMany({
    where: {
      returnDate: null,
    },
    include: {
      book: true,
    },
  });
  res.json(books);
});

///////// Endpoint สำหรับผู้แต่ง ///////////

// ดึงข้อมูลผู้แต่งทั้งหมด
app.get('/authors', async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
});

///////// Endpoint สำหรับสมาชิก ///////////

// ค้นหาสมาชิกตามชื่อ
app.get('/members/search', async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const members = await prisma.member.findMany({
    where: {
      OR: [
        { firstName: { contains: name } },
        { lastName: { contains: name } },
      ],
    },
  });
  res.json(members);
});

// ค้นหาสมาชิกตามหมายเลขโทรศัพท์
app.get('/members/:phoneNumber', async (req: Request, res: Response) => {
  const phoneNumber = req.params.phoneNumber;
  const member = await prisma.member.findUnique({
    where: { phoneNumber },
  });
  if (member) {
    res.json(member);
  } else {
    res.status(404).send('ไม่พบสมาชิก');
  }
});

///////// Endpoint สำหรับประวัติการยืม ///////////

// เพิ่มข้อมูลการยืมหนังสือ
app.post('/loans', async (req: Request, res: Response) => {
  const { memberId, bookId, quantity, dueDate } = req.body;
  const loan = await prisma.loan.create({
    data: {
      memberId,
      bookId,
      quantity,
      dueDate: new Date(dueDate),
    },
  });
  res.json(loan);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});