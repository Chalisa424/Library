import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import type { Book } from "./models/Book";
import multer from 'multer';
import { uploadFile } from './service/UploadFileService';



dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });


const port = process.env.PORT || 3000;

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const bucket = 'images';
      const filePath = `uploads`;
   
      await uploadFile(bucket, filePath, file);
  
      res.status(200).send('File uploaded successfully.');
    } catch (error) {
      res.status(500).send('Error uploading file.');
    }
  });
  

app.use((req, res, next) => {
  res.removeHeader('Date');
  res.removeHeader('Connection');
  res.removeHeader('Keep-Alive');
  res.removeHeader('Content-Type');
  res.removeHeader('Content-Length');
  next();
});

app.set('etag', false);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Library Application');
});

///////// Endpoint สำหรับหนังสือ ///////////
app.get('/books', async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 3;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || '';

  // ตรวจสอบว่า pageSize และ pageNo เป็นตัวเลขที่ถูกต้อง
  if (isNaN(pageSize)) {
    res.status(400).json({ error: 'Invalid pageSize: must be a number' });
    return;
  }
  if (isNaN(pageNo)) {
    res.status(400).json({ error: 'Invalid pageNo: must be a number' });
    return;
  }
  if (isNaN(pageSize) || isNaN(pageNo) || pageSize < 1 || pageNo < 1) {
    res.status(400).json({ error: 'Invalid pageSize or pageNo' });
    return;
  }

  try {
    // นับจำนวนหนังสือทั้งหมด
    const totalBooks = await prisma.book.count();

    // ดึงข้อมูลหนังสือตามหน้า
    const books = await prisma.book.findMany({
      where: !req.query.pageSize && !req.query.pageNo ? { id: { in: [1, 2, 3] } } : {}, 
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      include: {
        author: true,
      },
    });

    // ส่ง header x-total-count กลับไป
    res.setHeader('x-total-count', totalBooks.toString());

    // ส่งข้อมูลหนังสือกลับไป
    res.json({ totalBooks, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ค้นหาหนังสือตามชื่อ
app.get('/books/search', async (req: Request, res: Response) => {
  const title = req.query.title as string;
  
  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  });
  
  res.json(books);
});

// ดึงข้อมูลหนังสือตามกำหนดการคืน
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



// ดึงข้อมูลผู้แต่งทั้งหมด
app.get('/authors', async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
});


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

// ค้นหาตามหมายเลขโทรศัพท์
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