/*
  Warnings:

  - A unique constraint covering the columns `[courrierId]` on the table `Arrivee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courrierId]` on the table `Depart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `arrivee` ADD COLUMN `courrierId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `depart` ADD COLUMN `courrierId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Courrier` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Envoi` (
    `id` VARCHAR(191) NOT NULL,
    `expediteurId` VARCHAR(191) NOT NULL,
    `destinataireId` VARCHAR(191) NOT NULL,
    `courrierId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Envoi_courrierId_key`(`courrierId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Arrivee_courrierId_key` ON `Arrivee`(`courrierId`);

-- CreateIndex
CREATE UNIQUE INDEX `Depart_courrierId_key` ON `Depart`(`courrierId`);

-- AddForeignKey
ALTER TABLE `Depart` ADD CONSTRAINT `Depart_courrierId_fkey` FOREIGN KEY (`courrierId`) REFERENCES `Courrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arrivee` ADD CONSTRAINT `Arrivee_courrierId_fkey` FOREIGN KEY (`courrierId`) REFERENCES `Courrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envoi` ADD CONSTRAINT `Envoi_expediteurId_fkey` FOREIGN KEY (`expediteurId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envoi` ADD CONSTRAINT `Envoi_destinataireId_fkey` FOREIGN KEY (`destinataireId`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envoi` ADD CONSTRAINT `Envoi_courrierId_fkey` FOREIGN KEY (`courrierId`) REFERENCES `Courrier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
