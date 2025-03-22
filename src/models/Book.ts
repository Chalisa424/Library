
import { Member } from "@prisma/client";
import type { Author } from "./Author";

export interface Book {
  id: number;
  title: string;
  isbn: string;
  category: string;
  authorId: number;  // ความสัมพันธ์กับ Author
  aauthor?: string;
  members: Member[];  // ความสัมพันธ์กับ Member
}

export interface PageBook {
      count: number;
      events: Event[];
     }
  