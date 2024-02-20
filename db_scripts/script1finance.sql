DROP DATABASE IF EXISTS finance;

CREATE DATABASE IF NOT EXISTS finance;

USE finance;

CREATE TABLE IF NOT EXISTS users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT, email VARCHAR(30) UNIQUE, 
    password_hash VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS transaction_group(
    group_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    group_name VARCHAR(20),
    users_id INT(11), 
    FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS items (
    id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(20), 
    amount DECIMAL(10, 2), 
    cashflow VARCHAR(10), 
    date DATE NOT NULL, 
    users_id INT(11), 
    transaction_group_id INT(11),
    FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_group_id) REFERENCES transaction_group (group_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tokens (
    id INT(11) PRIMARY KEY AUTO_INCREMENT, token VARCHAR(100), created DATE, users_id INT(11), FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE
);