DROP USER IF EXISTS 'iskollection'@'localhost';
CREATE USER 'iskollection'@'localhost' IDENTIFIED BY 'yses2005';
DROP DATABASE IF EXISTS iskollection;
CREATE DATABASE iskollection;
GRANT SUPER ON *.* TO 'iskollection'@'localhost';
GRANT ALL PRIVILEGES ON iskollection.* TO 'iskollection'@'localhost' WITH GRANT OPTION;

USE iskollection;

-- CREATE TABLE log (
--     id INT NOT NULL AUTO_INCREMENT,
--     message VARCHAR(256) NOT NULL,
--     dateCreated DATETIME NOT NULL,
--     PRIMARY KEY(id)
-- );

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(256) NOT NULL,
    lastName VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,

);

CREATE TABLE files (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL AUTO_INCREMENT,    
    filePath VARCHAR(256) NOT NULL,
    CONSTRAINT fileOwner_fk
    	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE subscribe (
    subscribeId INT NOT NULL AUTO_INCREMENT,
    subscriberId INT NOT NULL AUTO_INCREMENT,
    CONSTRAINT sub
        PRIMARY KEY (subscribeId, subscriberId),
    CONSTRAINT subscribeId_fk
        FOREIGN KEY (subscribeId) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT subscriberId_fk
        FOREIGN KEY (subscriberId) REFERENCES user(id) ON DELETE CASCADE
);