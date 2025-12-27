/*
  Warnings:

  - You are about to drop the column `transcription` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "transcription",
ALTER COLUMN "summary" SET DEFAULT '';
