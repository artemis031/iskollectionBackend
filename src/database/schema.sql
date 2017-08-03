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
        FOREIGN KEY (userId) REFERENCES repository(id) ON DELETE CASCADE,
    CONSTRAINT repo_subscribe_fk
        FOREIGN KEY (repositoryId) REFERENCES user(id) ON DELETE CASCADE
); 

INSERT INTO user VALUES (
    DEFAULT,
    'David',
    'Bob',
    'email@gmail.com',
    SHA2(CONCAT('password', 'maligayangPagong'), 0)
);