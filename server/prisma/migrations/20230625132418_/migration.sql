/*
  Warnings:

  - Added the required column `metadata` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "metadata" JSONB NOT NULL;
