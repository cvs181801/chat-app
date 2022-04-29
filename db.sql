-- DO $do$
-- BEGIN
--     CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
--     CREATE TABLE users (
--         id uuid DEFAULT uuid_generate_v4 ( ) NOT NULL,
--         username character varying(255 ) NOT NULL,
--         PASSWORD character varying(255 ) NOT NULL,
--         isLoggedIn Boolean DEFAULT false
--     );
--     RAISE NOTICE 'users table created 🎉';
-- END
-- $do$;


--ALTER TABLE tableA ALTER COLUMN colA SET DATA TYPE UUID USING (uuid_generate_v4());
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;