--- load with 
--- psql "dbname='qanda' user='christopher.botros' host='localhost'" -f database.sql
--- CREATE DATABASE qanda;

DROP TABLE answers;
DROP TABLE questions;
DROP TABLE categories;



CREATE TABLE categories(
  code VARCHAR(100) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
  category_code VARCHAR(100) NOT NULL,
  is_answered BOOLEAN NOT NULL,
  title VARCHAR(20) NOT NULL,
  subject VARCHAR(100) DEFAULT '',
  content VARCHAR(255) NOT NULL,

  CONSTRAINT fk_category_code FOREIGN KEY(category_code) REFERENCES categories(code)
);

CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
  question_id BIGINT NOT NULL,
  content VARCHAR(255) NOT NULL,

  CONSTRAINT fk_question_id FOREIGN KEY(question_id) REFERENCES questions(id)
);

INSERT INTO categories (name, code, description) VALUES('Theology', 'theology', '');
INSERT INTO categories (name, code, description) VALUES('Bible', 'bible', '');
INSERT INTO categories (name, code, description) VALUES('Major and Minor Feasts', 'major_and_minor_feasts', '');
INSERT INTO categories (name, code, description) VALUES('Church History', 'church_history', '');
INSERT INTO categories (name, code, description) VALUES('Sacraments', 'sacraments', '');
INSERT INTO categories (name, code, description) VALUES('Spirituality', 'spirituality', '');
INSERT INTO categories (name, code, description) VALUES('Church Traditions', 'church_traditions', '');
INSERT INTO categories (name, code, description) VALUES('Other Topics', 'other', '');