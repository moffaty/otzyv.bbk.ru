-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "fathername" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "vk" TEXT NOT NULL,
    "tg" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
