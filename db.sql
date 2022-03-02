DO $do$
BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4 ( ) NOT NULL,
        username character varying(255 ) NOT NULL,
        PASSWORD character varying(255 ) NOT NULL,
        isLoggedIn Boolean DEFAULT false
    );
    RAISE NOTICE 'users table created 🎉';
    CREATE TABLE messages (
        id uuid DEFAULT uuid_generate_v4 ( ) NOT NULL,
        user_id text NOT NULL,
        message character varying(255 ) NOT NULL,
        created_at timestamp with time zone DEFAULT now( ),
    );
    RAISE NOTICE 'messages table created 🎉';
END
$do$;