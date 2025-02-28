
export interface Book {
  id: number;
  title: string;
  isbn: string;
  category: string;
  authorId: number;  // ความสัมพันธ์กับ Author
}
