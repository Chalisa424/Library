import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //เพิ่มข้อมูลผู้แต่ง
    const author1 = await prisma.author.create({
        data:{
            firstName : "Jonh",
            lastName:"Willson",
            company:"Tech Publishing",
        },
    });

    const author2 = await prisma.author.create({
        data: {
          firstName: "Jane",
          lastName: "Smith",
          company: "Literary House",
        },
      });

// เพิ่มข้อมูลหนังสือ
await prisma.book.createMany({
    data: [
      { title: "Intro to TypeScript", isbn: "978-1234567890", category: "Programming", authorId: author1.id },
      { title: "Advanced JavaScript", isbn: "978-0987654321", category: "Web Development", authorId: author1.id },
      { title: "Creative Writing 101", isbn: "978-1122334455", category: "Writing", authorId: author2.id },
    ],
  });

  // เพิ่มข้อมูลสมาชิก
  const member1 = await prisma.member.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      phone: "0812345678",
    },
  });

  // เพิ่มข้อมูลการยืมหนังสือ
  await prisma.loan.create({
    data: {
      memberId: member1.id,
      bookId: 1, // เปลี่ยนเป็น ID ของหนังสือที่สร้าง
      borrowDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // กำหนดคืนใน 7 วัน
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

