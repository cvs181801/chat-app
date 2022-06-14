DO $do$
BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    CREATE TABLE IF NOT EXISTS users (
        id uuid DEFAULT uuid_generate_v4 ( ) NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL,
        isLoggedIn Boolean DEFAULT false
    );
    RAISE NOTICE 'users table created 🎉';

    CREATE TABLE IF NOT EXISTS messages (
        messageid uuid SERIAL PRIMARY KEY,
        text TEXT,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        user_id uuid references users(id) NOT NULL
    );
    RAISE NOTICE 'messages table created 🎉';

END
$do$;
