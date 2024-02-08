DROP TABLE IF EXISTS users;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    pasword VARCHAR(100) NOT NULL,
    pokemon1 VARCHAR(30),
    pokemon2 VARCHAR(30),
    pokemon3 VARCHAR(30),
    pokemon4 VARCHAR(30),
    pokemon5 VARCHAR(30),
    pokemon6 VARCHAR(30)

);

INSERT INTO users (username, pasword, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6)
VALUES  ( 'Kal-buir', 'ehn-kal', 'pikachu', 'mew', 'ditto', 'bonsly', 'flapple', 'meowth'); 
INSERT INTO users (username, pasword, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6)
VALUES  ('Etain Tur-Mukan', 'Darman', 'pikachu', 'mew', 'ditto', 'bonsly', 'flapple', 'meowth');