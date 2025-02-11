-- AlterTable
ALTER TABLE `arrivee` ADD COLUMN `traiteParId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `utilisateur` ADD COLUMN `picture` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Arrivee` ADD CONSTRAINT `Arrivee_traiteParId_fkey` FOREIGN KEY (`traiteParId`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
