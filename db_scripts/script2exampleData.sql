use finance;
INSERT INTO users (email, password_hash) VALUES
('user@email.com','$2b$10$Si9v2Illjwh34as/oj5lDuDRM3bE7aYQHaOCPje0dsvLSZXSc3Idm'),
('user2@email.com','$2b$10$PZNZyOSQGrBdK2Yy2RWii.cW4VYHi0t/y.Ea1G1H9qPWk1Hk7ojY2');
INSERT INTO items (name, amount,cashflow, date,users_id) VALUES
('salary',5000,'income', CURDATE(),1),
('scratch tickets',5.20,'income', CURDATE(),1),
('big prize',90.20,'income', CURDATE(),1),
('groceries',120.30,'expense', CURDATE(),1),
('peanuts',9001.35,'expense', CURDATE(),1),
('meat',3301.44,'expense', CURDATE(),1),
('rabbit',33.14,'expense', CURDATE(),1),
('cat',99.14,'expense', CURDATE(),1),
('pizza',9.00,'expense', CURDATE(),1),
('ice-cream',10.00,'expense', CURDATE(),1),
('gift cards',999.30,'income',CURDATE(),2),
('food',1320.30,'expense', CURDATE(),2),
('banana',555.30,'expense', CURDATE(),2);