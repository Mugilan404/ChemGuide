USE chemguide;

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@chemguide.com', 'hashedpassword1', 'admin'),
('Student One', 'student1@chemguide.com', 'hashedpassword2', 'student'),
('Student Two', 'student2@chemguide.com', 'hashedpassword3', 'student');

-- Insert sample materials
INSERT INTO materials (title, description, file_path, uploaded_by) VALUES
('Organic Chemistry Notes', 'Basics of organic reactions', '/uploads/organic.pdf', 1),
('Physical Chemistry Notes', 'Thermodynamics summary', '/uploads/physical.pdf', 1);

-- Insert sample test
INSERT INTO tests (title, description, created_by) VALUES
('Chemistry Basics Test', 'Covers fundamentals of chemistry', 1);

-- Insert sample questions
INSERT INTO questions (test_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(1, 'What is the atomic number of Hydrogen?', '1', '2', '0', '8', 'A'),
(1, 'Which of the following is a noble gas?', 'Oxygen', 'Nitrogen', 'Helium', 'Hydrogen', 'C');

-- Insert sample results
INSERT INTO results (user_id, test_id, score) VALUES
(2, 1, 90),
(3, 1, 70);
