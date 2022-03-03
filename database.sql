CREATE DATABASE chat_app_db;

CREATE TABLE users(
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    isloggedin boolean DEFAULT false,
    UNIQUE (id, username)
    );

CREATE TABLE messages(
    messageid SERIAL PRIMARY KEY,
    text TEXT,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer REFERENCES users(id) NOT NULL
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

         --ALTER TABLE tableA ALTER COLUMN colA SET DATA TYPE UUID USING (uuid_generate_v4());
         --CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
         --CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;