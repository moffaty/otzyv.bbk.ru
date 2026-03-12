/*
  Warnings:

  - You are about to drop the column `code` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `fathername` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `tg` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `vk` on the `Form` table. All the data in the column will be lost.
  - Added the required column `caption` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "code",
DROP COLUMN "email",
DROP COLUMN "fathername",
DROP COLUMN "model",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "product",
DROP COLUMN "shop",
DROP COLUMN "surname",
DROP COLUMN "tg",
DROP COLUMN "vk",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "photo" JSONB[];
