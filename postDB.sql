/* Create the database */
CREATE DATABASE  IF NOT EXISTS postDB;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;


USE postDB;

CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255),
    street VARCHAR(255),
    zipcode VARCHAR(255)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(255),
    username VARCHAR(255) not null UNIQUE,
    email VARCHAR(255),
    address_id INT,
    phone VARCHAR(255),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE passwords (
    id INT primary key,
    password VARCHAR(255) not null,
    FOREIGN KEY (id) REFERENCES users(id)
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


INSERT INTO addresses (city, street, zipcode)
VALUES
('Anytown', '123 Main St', '12345'),
('Somewhere', '456 Oak St', '67890'),
( 'Nowhere', '789 Elm St', '54321'),
('Anywhere', '321 Pine St', '98765'),
( 'Elsewhere','654 Maple St', '45678'),
( 'Everywhere', '987 Cedar St', '87654'),
( 'Nowhere', '741 Birch St', '34567'),
('Anywhere', '852 Walnut St', '76543'),
('Everywhere', '963 Fir St', '23456'),
('Somewhere', '159 Spruce St', '87654');

-- טבלת המשתמשים
INSERT INTO users (name, username, email, address_id, phone)
VALUES
('John Doe', 'johndoe', 'john@example.com', 1, '123-456-7890'),
('Jane Smith', 'janesmith', 'jane@example.com', 2, '987-654-3210'),
('Alice Johnson', 'alicej', 'alice@example.com', 3, '555-123-4567'),
('Bob Brown', 'bobbrown', 'bob@example.com', 4, '999-888-7777'),
('Emily Davis', 'emilyd', 'emily@example.com', 5, '333-222-1111'),
('Michael Wilson', 'michaelw', 'michael@example.com', 6, '777-888-9999'),
('Sarah Lee', 'sarahlee', 'sarah@example.com', 7, '111-222-3333'),
('David Martinez', 'davidm', 'david@example.com', 8, '444-555-6666'),
('Olivia Garcia', 'oliviag', 'olivia@example.com', 9, '666-555-4444'),
('James Rodriguez', 'jamesr', 'james@example.com', 10, '222-333-4444');

-- Passwords table
INSERT INTO passwords (id, password) VALUES
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