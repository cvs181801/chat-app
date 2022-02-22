CREATE DATABASE chat_app_db;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
    );

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
	text TEXT,
    user_id int REFERENCES users(id),
    created_at DATE
    );

INSERT INTO users(id, username, password) 
    VALUES
        (1, 'spongebob', 'crabbypattylover'),
        (2, 'patrick', 'ilovejellyfishing'),
        (3, 'squidward', 'clarinetrules*123');

INSERT INTO messages(id, text, user_id, created_at)
    VALUES
        (1, 'hello bikini bottom!', 1, February 21, 2022),
        (2, 'lets go jellyFishing!', 2, February 21, 2022),
        (3, 'I like clarinet', 3, February 21, 2022);