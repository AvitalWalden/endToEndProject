/* Create the database */
CREATE DATABASE  IF NOT EXISTS postDB;

/* Switch to the classicmodels database */
USE postDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(255) not null,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    street VARCHAR(255),
    city VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE passwords (
    user_id INT primary key,
    password VARCHAR(255) not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT not null,
    title VARCHAR(255)
);
CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    albumId INT not null,
    title VARCHAR(255),
    url VARCHAR(255) not null,
    thumbnailUrl VARCHAR(255) not null,
    FOREIGN KEY (albumId) REFERENCES albums(id)
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