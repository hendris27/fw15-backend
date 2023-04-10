-- Active: 1680702373184@@127.0.0.1@5432@postgres@public

CREATE TABLE "users" (
        "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "fullName" VARCHAR(80),
        "email" VARCHAR(255) UNIQUE,
        "password" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NULL
    );

INSERT INTO "users" ( "fullName", "email", "password")VALUES ('hendri1', 'admin@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('hendri2', 'admin2@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('hendri3', 'fazz@mail.com', '1234');
INSERT INTO "users" ( "fullName", "email", "password")VALUES ('hendri4', 'track@mail.com', '1234');



UPDATE "users"SET "email" = 'admin@gmail.com' WHERE "id" = 1;
DELETE from "users" WHERE "id"=2;
ALTER TABLE users ADD name VARCHAR(255);
 DROP Table users
