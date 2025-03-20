CREATE DATABASE taskmanager;
USE taskmanager;

CREATE TABLE item(
	id INT auto_increment,
    fname VARCHAR(255),
    lname VARCHAR(255),
    description VARCHAR(255),
    assignedday VARCHAR(255),
    days INT,
    urgency VARCHAR(255),
    created_at DATETIME DEFAULT NOW(),
    task VARCHAR(255),
    
    PRIMARY KEY(id)
);