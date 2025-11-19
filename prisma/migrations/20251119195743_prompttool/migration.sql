-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
ADD COLUMN     "icon" TEXT NOT NULL DEFAULT 'Code2',
ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waterConsumption" INTEGER NOT NULL DEFAULT 250;
