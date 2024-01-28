use finance;
INSERT INTO users (email, password_hash) VALUES
('user@email.com','$2b$10$Si9v2Illjwh34as/oj5lDuDRM3bE7aYQHaOCPje0dsvLSZXSc3Idm'),
('user2@email.com','$2b$10$PZNZyOSQGrBdK2Yy2RWii.cW4VYHi0t/y.Ea1G1H9qPWk1Hk7ojY2');
INSERT INTO cashflow (name, amount,kind,category,users_id) VALUES
('salary',5000,'income',NULL,1),
('groceries',120.30,'expense',NULL,1),
('gift cards',999.30,'income',NULL,2),
('food',1320.30,'expense',NULL,2);