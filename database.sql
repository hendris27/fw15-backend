CREATE TABLE "users"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(255),
    "email" VARCHAR (255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "profile"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "fullName" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "gender" BOOLEAN,
    "profession" VARCHAR(255),
    "Nationality" VARCHAR(255),
    "birthDate" DATE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "categories"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "cities"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "events"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "pictures" VARCHAR(255),
    "title" VARCHAR(255),
    "date" DATE,
    "cityId" INTEGER,
    "descriptions" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "eventCategories"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "patners"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "pictures" VARCHAR(255),
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);CREATE TABLE "reservationSections"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "price" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationStatus"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "paymentMethod"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservation"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "userId" INTEGER,
    "status" INTEGER,
    "paymentMethodId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationTickets"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "reservationId" INTEGER,
    "sectionId" INTEGER,
    "quantity" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "wishList"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "eventId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);
ALTER TABLE "profile" ADD COLUMN "userId" INTEGER;

ALTER TABLE "patners" RENAME COLUMN "pictures" TO "picture";
ALTER TABLE "events" RENAME COLUMN "title" TO "tittle";
 ALTER TABLE "profile" ALTER COLUMN "gender" TYPE VARCHAR(25);

 CREATE TABLE "forgotRequest" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255),
    "code" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
 )
