CREATE TABLE IF NOT EXISTS patients (
id VARCHAR(255),
name VARCHAR(255),
birthday VARCHAR(255),
gender VARCHAR(255),
mail VARCHAR(255),
user_id VARCHAR(255),
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id));

CREATE INDEX patients_name_index ON patients(name);
CREATE UNIQUE INDEX mail_idx ON patients (mail);
CREATE UNIQUE INDEX user_id_idx ON patients (user_id);