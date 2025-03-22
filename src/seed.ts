import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // เพิ่มข้อมูลผู้แต่ง
  const authors = await prisma.author.createMany({
    data: [
      { firstName: "J.K.", lastName: "Rowling", affiliation: "Bloomsbury" },
      { firstName: "George", lastName: "Orwell", affiliation: "Penguin" },
      { firstName: "Harper", lastName: "Lee", affiliation: "J.B. Lippincott & Co." },
      { firstName: "F. Scott", lastName: "Fitzgerald", affiliation: "Scribner" },
      { firstName: "Jane", lastName: "Austen", affiliation: "Vintage Classics" },
      { firstName: "Mark", lastName: "Twain", affiliation: "American Publishing Company" },
      { firstName: "Ernest", lastName: "Hemingway", affiliation: "Charles Scribner's Sons" },
      { firstName: "Leo", lastName: "Tolstoy", affiliation: "The Russian Messenger" },
      { firstName: "Mary", lastName: "Shelley", affiliation: "Lackington, Hughes, Harding, Mavor & Jones" },
      { firstName: "H.G.", lastName: "Wells", affiliation: "Heinemann" },
    ],
  });

  // เพิ่มข้อมูลหนังสือ
  const books = await prisma.book.createMany({
    data: [
      { title: "Harry Potter and the Sorcerer's Stone", isbn: "9780747532743", category: "Fantasy", authorId: 1 },
      { title: "Harry Potter and the Chamber of Secrets", isbn: "9780747538486", category: "Fantasy", authorId: 1 },
      { title: "Harry Potter and the Prisoner of Azkaban", isbn: "9780747542155", category: "Fantasy", authorId: 1 },
      { title: "Harry Potter and the Goblet of Fire", isbn: "9780747546245", category: "Fantasy", authorId: 1 },
      { title: "Harry Potter and the Order of the Phoenix", isbn: "9780747551003", category: "Fantasy", authorId: 1 },
      { title: "1984", isbn: "9780451524935", category: "Dystopian", authorId: 2 },
      { title: "Animal Farm", isbn: "9780451526342", category: "Political Satire", authorId: 2 },
      { title: "To Kill a Mockingbird", isbn: "9780061120084", category: "Classic", authorId: 3 },
      { title: "The Great Gatsby", isbn: "9780743273565", category: "Classic", authorId: 4 },
      { title: "Pride and Prejudice", isbn: "9780141439518", category: "Romance", authorId: 5 },
      { title: "Sense and Sensibility", isbn: "9780141439662", category: "Romance", authorId: 5 },
      { title: "Adventures of Huckleberry Finn", isbn: "9780486280615", category: "Adventure", authorId: 6 },
      { title: "The Old Man and the Sea", isbn: "9780684801223", category: "Fiction", authorId: 7 },
      { title: "War and Peace", isbn: "9780199232765", category: "Historical Fiction", authorId: 8 },
      { title: "Anna Karenina", isbn: "9780143035008", category: "Classic", authorId: 8 },
      { title: "Frankenstein", isbn: "9780486282114", category: "Horror", authorId: 9 },
      { title: "The Time Machine", isbn: "9780553213515", category: "Science Fiction", authorId: 10 },
      { title: "The Invisible Man", isbn: "9780451531674", category: "Science Fiction", authorId: 10 },
      { title: "The War of the Worlds", isbn: "9780345472224", category: "Science Fiction", authorId: 10 },
      { title: "A Tale of Two Cities", isbn: "9780141439600", category: "Historical Fiction", authorId: 4 },
    ],
  });

  // เพิ่มข้อมูลสมาชิก
  const members = await prisma.member.createMany({
    data: [
      { firstName: "John", lastName: "Doe", phoneNumber: "123-456-7890" },
      { firstName: "Jane", lastName: "Smith", phoneNumber: "987-654-3210" },
      { firstName: "Alice", lastName: "Johnson", phoneNumber: "456-789-1234" },
      { firstName: "Bob", lastName: "Brown", phoneNumber: "789-123-4567" },
      { firstName: "Charlie", lastName: "Davis", phoneNumber: "321-654-9870" },
      { firstName: "Emily", lastName: "Clark", phoneNumber: "654-987-3210" },
      { firstName: "Frank", lastName: "Wilson", phoneNumber: "147-258-3690" },
      { firstName: "Grace", lastName: "Lewis", phoneNumber: "369-258-1470" },
      { firstName: "Henry", lastName: "Walker", phoneNumber: "741-852-9630" },
      { firstName: "Isabella", lastName: "White", phoneNumber: "852-963-7410" },
    ],
  });

  // เพิ่มข้อมูลการยืมหนังสือ
  const loans = await prisma.loan.createMany({
    data: [
      { bookId: 1, memberId: 1, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 14)), returnDate: new Date(new Date().setDate(new Date().getDate() - 2)), quantity: 1 },
      { bookId: 5, memberId: 2, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), quantity: 2 },
      { bookId: 10, memberId: 3, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 10)), returnDate: new Date(new Date().setDate(new Date().getDate() - 1)), quantity: 1 },
      { bookId: 15, memberId: 4, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 12)), quantity: 3 },
      { bookId: 20, memberId: 5, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 15)), quantity: 2 },
      { bookId: 3, memberId: 6, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 9)), quantity: 1 },
      { bookId: 7, memberId: 7, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 8)), returnDate: new Date(new Date().setDate(new Date().getDate() - 3)), quantity: 1 },
      { bookId: 12, memberId: 8, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 11)), quantity: 2 },
      { bookId: 18, memberId: 9, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 13)), quantity: 1 },
      { bookId: 2, memberId: 10, borrowDate: new Date(), dueDate: new Date(new Date().setDate(new Date().getDate() + 6)), quantity: 1 },
    ],
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

