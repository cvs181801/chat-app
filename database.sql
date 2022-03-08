CREATE DATABASE chat_app_db;

CREATE TABLE users(
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isloggedin boolean DEFAULT false
    );

CREATE TABLE messages(
    messageid SERIAL PRIMARY KEY,
    text TEXT,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer REFERENCES users(id) NOT NULL
);



--ALTER TABLE tableA ALTER COLUMN colA SET DATA TYPE UUID USING (uuid_generate_v4());
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;