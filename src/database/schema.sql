DROP USER IF EXISTS 'iskollection'@'localhost';
CREATE USER 'iskollection'@'localhost' IDENTIFIED BY 'sectumsempra';
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
    password VARCHAR(256) NOT NULL
);

CREATE TABLE files (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,    
    filePath VARCHAR(256) NOT NULL,
    CONSTRAINT fileOwner_fk
    	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE subscribe (
    subscribeId INT NOT NULL,
    subscriberId INT NOT NULL,
    CONSTRAINT sub
        PRIMARY KEY (subscribeId, subscriberId),
    CONSTRAINT subscribeId_fk
        FOREIGN KEY (subscribeId) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT subscriberId_fk
        FOREIGN KEY (subscriberId) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO user VALUES (
    DEFAULT,
    'David',
    'Bob',
    'email@gmail.com',
    SHA2(CONCAT('password', 'maligayangPagong'), 0)
);