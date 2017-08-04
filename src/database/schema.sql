DROP USER IF EXISTS 'iskollection'@'localhost';
CREATE USER 'iskollection'@'localhost' IDENTIFIED BY 'sectumsempra';
DROP DATABASE IF EXISTS iskollection;
CREATE DATABASE iskollection;
GRANT SUPER ON *.* TO 'iskollection'@'localhost';
GRANT ALL PRIVILEGES ON iskollection.* TO 'iskollection'@'localhost' WITH GRANT OPTION;

USE iskollection;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(256) NOT NULL,
    lastName VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE repository(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    courseTitle VARCHAR(256) NOT NULL
);

CREATE TABLE files (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(256) NOT NULL,
    fileName VARCHAR(256) NOT NULL,
    userId INT NOT NULL,
    repositoryId INT NOT NULL,    
    filePath VARCHAR(256) NOT NULL,
    CONSTRAINT repositoryId_fk
        FOREIGN KEY (repositoryId) REFERENCES repository(id) ON DELETE CASCADE,
    CONSTRAINT fileOwner_fk
    	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE subscribe (
    userId INT NOT NULL,
    repositoryId INT NOT NULL,
    CONSTRAINT sub
        PRIMARY KEY (userId, repositoryId),
    CONSTRAINT userId_fk
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT repo_subscribe_fk
        FOREIGN KEY (repositoryId) REFERENCES repository(id) ON DELETE CASCADE
); 

INSERT INTO user VALUES (
    DEFAULT,
    'David',
    'Bob',
    'email@gmail.com',
    SHA2(CONCAT('password', 'maligayangPagong'), 0)
);

INSERT INTO repository VALUES
(
    DEFAULT,
    'CMSC 2',
    'Introduction to the Internet'
),
(
    DEFAULT,
    'CMSC 11',
    'Introduction to Computer Science'
),
(
    DEFAULT,
    'CMSC 21',
    'Fundamentals of Programming'
),
(
    DEFAULT,
    'CMSC 22',
    'Object-Oriented Programming'
),
(
    DEFAULT,
    'CMSC 56',
    'Discrete Mathematical Structures in Computer Science I'
),
(
    DEFAULT,
    'CMSC 57',
    'Discrete Mathematical Structures in Computer Science I'
),
(
    DEFAULT,
    'CMSC 100',
    'Web Programming'
),
(
    DEFAULT,
    'CMSC 123',
    'Data Structures'
),
(
    DEFAULT,
    'CMSC 124',
    'Design and Implementation of Programming Languages'
),
(
    DEFAULT,
    'CMSC 125',
    'Operating Systems'
),
(
    DEFAULT,
    'CMSC 127',
    'File Processing and Database Systems'
),
(
    DEFAULT,
    'CMSC 128',
    'Introduction to Software Engineering'
),
(
    DEFAULT,
    'CMSC 129',
    'Principles of Compiler Design'
),
(
    DEFAULT,
    'CMSC 130',
    'Logic Design and Digital Computer Circuits'
),
(
    DEFAULT,
    'CMSC 131',
    'Introduction to Computer Organization and Machine-level Programming'
),
(
    DEFAULT,
    'CMSC 132',
    'Computer Architecture'
),
(
    DEFAULT,
    'CMSC 137',
    'Data Communications and Networking'
),
(
    DEFAULT,
    'CMSC 141',
    'Automata and Language Theory'
),
(
    DEFAULT,
    'CMSC 142',
    'Design and Analysis of Algorithms'
),
(
    DEFAULT,
    'CMSC 150',
    'Numerical and Symbolic Computation'
),
(
    DEFAULT,
    'CMSC 161',
    'Interactive Computer Graphics'
),
(
    DEFAULT,
    'CMSC 170',
    'Introduction to Artificial Intelligence'
),
(
    DEFAULT,
    'CMSC 172',
    'Robot Modeling'
),
(
    DEFAULT,
    'CMSC 180',
    'Introduction to Parallel Computing'
),
(
    DEFAULT,
    'CMSC 191',
    'Special Topic'
);