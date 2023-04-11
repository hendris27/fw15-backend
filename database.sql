-- Active: 1680702373184@@127.0.0.1@5432@postgres@public

CREATE TABLE "users" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "fullName" VARCHAR(80),
        "email" VARCHAR(255) UNIQUE,
        "password" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob1', 'admin@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob2', 'admin2@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob3', 'fazz@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob4', 'track@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob5', 'track1@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('bob6', 'trac2k@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john1', 'track3@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john2', 'track4@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john3', 'track5@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john4', 'track6@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john5', 'track7@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john7', 'track8@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john8', 'track9@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('john9', 'track10@mail.com', '1234');

DELETE FROM users
WHERE id IN (4, 7, 10, 13,14,15,16,17,18,19,20,22);


UPDATE "users"SET "email" = 'admin@gmail.com' WHERE "id" = 1;
DELETE from "users" WHERE "id"=2;
ALTER TABLE users ADD name VARCHAR(255);
 DROP Table users;

SELECT * FROM "users" ORDER BY "fullName" ASC LIMIT 5 OFFSET 5;
