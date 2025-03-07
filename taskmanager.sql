CREATE DATABASE taskmanager;
USE taskmanager;

CREATE TABLE task(
	id INT auto_increment,
    fname VARCHAR(255),
    lname VARCHAR(255),
    task VARCHAR(255),
    description VARCHAR(255),
    startdate date,
    enddate date,
    tasktime time,
    urgency VARCHAR(255),
    created_at DATETIME DEFAULT NOW(),
    
    PRIMARY KEY(id)
);