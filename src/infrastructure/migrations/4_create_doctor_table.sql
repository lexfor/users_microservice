CREATE TABLE IF NOT EXISTS doctors (
id VARCHAR(255),
name VARCHAR(255),
mail VARCHAR(255),
user_id VARCHAR(255),
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id));

CREATE INDEX doctor_mail_index ON doctors(mail);
