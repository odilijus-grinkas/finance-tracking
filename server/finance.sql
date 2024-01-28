DROP DATABASE IF EXISTS finance;

CREATE DATABASE IF NOT EXISTS finance;

USE finance;
CREATE TABLE IF NOT EXISTS users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT, email VARCHAR(30), password_hash VARCHAR(100)
);
-- kind = income/expense, category = food/clothes etc.
CREATE TABLE IF NOT EXISTS cashflow (
    id INT(11) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(20), amount DECIMAL(10, 2), kind VARCHAR(10), category VARCHAR(30) NULL,
    users_id INT(11), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);