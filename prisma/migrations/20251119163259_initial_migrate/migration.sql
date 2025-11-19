/*
  Warnings:

  - The primary key for the `_CollectionToPrompt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CollectionToPrompt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CollectionToPrompt" DROP CONSTRAINT "_CollectionToPrompt_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToPrompt_AB_unique" ON "_CollectionToPrompt"("A", "B");
