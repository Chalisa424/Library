-- ข้อมูลผู้แต่ง
INSERT INTO authors (first_name, last_name, organization) VALUES
('J.K.', 'Rowling', 'Bloomsbury'),
('George', 'Orwell', 'Penguin'),
('Harper', 'Lee', 'J.B. Lippincott & Co.'),
('F. Scott', 'Fitzgerald', 'Scribner'),
('Jane', 'Austen', 'Vintage Classics'),
('Mark', 'Twain', 'American Publishing Company'),
('Ernest', 'Hemingway', 'Charles Scribner''s Sons'),
('Leo', 'Tolstoy', 'The Russian Messenger'),
('Mary', 'Shelley', 'Lackington, Hughes, Harding, Mavor & Jones'),
('H.G.', 'Wells', 'Heinemann');

-- ข้อมูลหนังสือ
INSERT INTO books (title, isbn, category, author_id) VALUES
('Harry Potter and the Sorcerer''s Stone', '9780747532743', 'Fantasy', 1),
('Harry Potter and the Chamber of Secrets', '9780747538486', 'Fantasy', 1),
('Harry Potter and the Prisoner of Azkaban', '9780747542155', 'Fantasy', 1),
('Harry Potter and the Goblet of Fire', '9780747546245', 'Fantasy', 1),
('Harry Potter and the Order of the Phoenix', '9780747551003', 'Fantasy', 1),
('1984', '9780451524935', 'Dystopian', 2),
('Animal Farm', '9780451526342', 'Political Satire', 2),
('To Kill a Mockingbird', '9780061120084', 'Classic', 3),
('The Great Gatsby', '9780743273565', 'Classic', 4),
('Pride and Prejudice', '9780141439518', 'Romance', 5),
('Sense and Sensibility', '9780141439662', 'Romance', 5),
('Adventures of Huckleberry Finn', '9780486280615', 'Adventure', 6),
('The Old Man and the Sea', '9780684801223', 'Fiction', 7),
('War and Peace', '9780199232765', 'Historical Fiction', 8),
('Anna Karenina', '9780143035008', 'Classic', 8),
('Frankenstein', '9780486282114', 'Horror', 9),
('The Time Machine', '9780553213515', 'Science Fiction', 10),
('The Invisible Man', '9780451531674', 'Science Fiction', 10),
('The War of the Worlds', '9780345472224', 'Science Fiction', 10),
('A Tale of Two Cities', '9780141439600', 'Historical Fiction', 4);

-- ข้อมูลสมาชิ
INSERT INTO members (first_name, last_name, phone_number) VALUES
('John', 'Doe', '123-456-7890'),
('Jane', 'Smith', '987-654-3210'),
('Alice', 'Johnson', '456-789-1234'),
('Bob', 'Brown', '789-123-4567'),
('Charlie', 'Davis', '321-654-9870'),
('Emily', 'Clark', '654-987-3210'),
('Frank', 'Wilson', '147-258-3690'),
('Grace', 'Lewis', '369-258-1470'),
('Henry', 'Walker', '741-852-9630'),
('Isabella', 'White', '852-963-7410');

-- ประวัติการยืมหนังสือ
INSERT INTO loans (book_id, member_id, borrowed_date, due_date) VALUES
(1, 1, NOW(), NOW() + INTERVAL '14 days'),
(5, 2, NOW(), NOW() + INTERVAL '7 days'),
(10, 3, NOW(), NOW() + INTERVAL '10 days'),
(15, 4, NOW(), NOW() + INTERVAL '12 days'),
(20, 5, NOW(), NOW() + INTERVAL '15 days'),
(3, 6, NOW(), NOW() + INTERVAL '9 days'),
(7, 7, NOW(), NOW() + INTERVAL '8 days'),
(12, 8, NOW(), NOW() + INTERVAL '11 days'),
(18, 9, NOW(), NOW() + INTERVAL '13 days'),
(2, 10, NOW(), NOW() + INTERVAL '6 days');

-- บางเล่มถูกคืนแล้ว
UPDATE loans SET returned_date = NOW() - INTERVAL '2 days' WHERE book_id IN (1, 5, 10);
UPDATE loans SET returned_date = NOW() - INTERVAL '1 days' WHERE book_id IN (15, 20);
UPDATE loans SET returned_date = NOW() - INTERVAL '3 days' WHERE book_id IN (3, 7);
