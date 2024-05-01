/* Create the database */
CREATE DATABASE  IF NOT EXISTS postDB;

USE postDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(255) not null,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    street VARCHAR(255),
    city VARCHAR(255),
    zipcode VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE passwords (
    user_id INT primary key,
    password VARCHAR(255) not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT not null,
    title VARCHAR(255) not null,
    completed BOOL not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT not null,
    title VARCHAR(255),
    body TEXT not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT not null,
    name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    body TEXT not null,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Users table
INSERT INTO users (name, username, email, street, city, zipcode, phone) VALUES
('John Doe', 'johndoe', 'john@example.com', '123 Main St', 'Anytown', '12345', '123-456-7890'),
('Jane Smith', 'janesmith', 'jane@example.com', '456 Oak St', 'Somewhere', '67890', '987-654-3210'),
('Alice Johnson', 'alicej', 'alice@example.com', '789 Elm St', 'Nowhere', '54321', '555-123-4567'),
('Bob Brown', 'bobbrown', 'bob@example.com', '321 Pine St', 'Anywhere', '98765', '999-888-7777'),
('Emily Davis', 'emilyd', 'emily@example.com', '654 Maple St', 'Elsewhere', '45678', '333-222-1111'),
('Michael Wilson', 'michaelw', 'michael@example.com', '987 Cedar St', 'Everywhere', '87654', '777-888-9999'),
('Sarah Lee', 'sarahlee', 'sarah@example.com', '741 Birch St', 'Nowhere', '34567', '111-222-3333'),
('David Martinez', 'davidm', 'david@example.com', '852 Walnut St', 'Anywhere', '76543', '444-555-6666'),
('Olivia Garcia', 'oliviag', 'olivia@example.com', '963 Fir St', 'Everywhere', '23456', '666-555-4444'),
('James Rodriguez', 'jamesr', 'james@example.com', '159 Spruce St', 'Somewhere', '87654', '222-333-4444');


-- Passwords table
INSERT INTO passwords (user_id, password) VALUES
(1, 'password1'),
(2, 'password2'),
(3, 'password3'),
(4, 'password4'),
(5, 'password5'),
(6, 'password6'),
(7, 'password7'),
(8, 'password8'),
(9, 'password9'),
(10, 'password10');

-- Todos table
INSERT INTO todos (user_id, title, completed) VALUES
(1, 'Finish project', false),
(2, 'Buy groceries', false),
(3, 'Call mom', true),
(4, 'Go to gym', false),
(5, 'Read book', true),
(6, 'Write report', false),
(7, 'Plan vacation', false),
(8, 'Attend meeting', true),
(9, 'Pay bills', false),
(10, 'Clean house', true);

-- Posts table
INSERT INTO posts (user_id, title, body) VALUES
(1, 'My first post', 'This is my first blog post.'),
(2, 'Travel adventures', 'Sharing my recent travel experiences.'),
(3, 'Cooking tips', 'Here are some tips for cooking beginners.'),
(4, 'Fitness journey', 'Documenting my fitness progress.'),
(5, 'Book review', 'Reviewing my latest read.'),
(6, 'Work updates', 'Sharing updates from my workplace.'),
(7, 'Dream vacation', 'Describing my dream vacation.'),
(8, 'Business insights', 'Sharing insights into business strategies.'),
(9, 'Financial advice', 'Offering advice on managing finances.'),
(10, 'Home organization', 'Tips for keeping your home organized.');

-- Comments table
INSERT INTO comments (post_id, name, email, body) VALUES
(1, 'Alice', 'alice@example.com', 'Great post! Looking forward to more.'),
(2, 'Bob', 'bob@example.com', 'Sounds like an amazing trip!'),
(3, 'Charlie', 'charlie@example.com', 'Thanks for the tips!'),
(4, 'David', 'david@example.com', 'You inspire me to hit the gym too!'),
(5, 'Emma', 'emma@example.com', 'I loved that book too!'),
(6, 'Frank', 'frank@example.com', 'Keep up the good work!'),
(7, 'Grace', 'grace@example.com', 'Your vacation sounds incredible!'),
(8, 'Hannah', 'hannah@example.com', 'Insightful analysis.'),
(9, 'Ian', 'ian@example.com', 'Great advice, thanks!'),
(10, 'Julia', 'julia@example.com', 'These tips really helped me organize my space.');