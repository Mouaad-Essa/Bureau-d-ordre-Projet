/*
  Warnings:

  - You are about to drop the column `expediteur` on the `arrivee` table. All the data in the column will be lost.
  - Added the required column `expediteurId` to the `Arrivee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arrivee` DROP COLUMN `expediteur`,
    ADD COLUMN `expediteurId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Arrivee` ADD CONSTRAINT `Arrivee_expediteurId_fkey` FOREIGN KEY (`expediteurId`) REFERENCES `Etablissement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
