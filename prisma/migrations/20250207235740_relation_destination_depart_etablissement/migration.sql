/*
  Warnings:

  - You are about to drop the column `destination` on the `depart` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `Depart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `depart` DROP COLUMN `destination`,
    ADD COLUMN `destinationId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Depart` ADD CONSTRAINT `Depart_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Etablissement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
