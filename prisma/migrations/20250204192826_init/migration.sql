-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,
    `serviceId` VARCHAR(191) NULL,
    `roleId` VARCHAR(191) NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role_Privilege` (
    `idRole` VARCHAR(191) NOT NULL,
    `idPrv` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRole`, `idPrv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Privilege` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etablissement` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `ville` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pole` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Division` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `poleId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `divisionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Depart` (
    `id` VARCHAR(191) NOT NULL,
    `signeParId` VARCHAR(191) NULL,
    `traiteParId` VARCHAR(191) NULL,
    `numOrdre` VARCHAR(191) NULL,
    `dateDepart` DATETIME(3) NOT NULL,
    `objet` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `nbrFichier` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fichier` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `dateAjout` DATETIME(3) NOT NULL,
    `idDepart` VARCHAR(191) NULL,
    `idArrivee` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arrivee` (
    `id` VARCHAR(191) NOT NULL,
    `idOrdre` VARCHAR(191) NULL,
    `dateArv` DATETIME(3) NOT NULL,
    `dateOrigin` DATETIME(3) NOT NULL,
    `expediteur` VARCHAR(191) NOT NULL,
    `objet` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `nbrFichier` INTEGER NOT NULL,
    `typeSupport` VARCHAR(191) NULL,
    `typeCourrier` VARCHAR(191) NULL,
    `traiteParId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_Privilege` ADD CONSTRAINT `Role_Privilege_idRole_fkey` FOREIGN KEY (`idRole`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role_Privilege` ADD CONSTRAINT `Role_Privilege_idPrv_fkey` FOREIGN KEY (`idPrv`) REFERENCES `Privilege`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Division` ADD CONSTRAINT `Division_poleId_fkey` FOREIGN KEY (`poleId`) REFERENCES `Pole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_divisionId_fkey` FOREIGN KEY (`divisionId`) REFERENCES `Division`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depart` ADD CONSTRAINT `Depart_signeParId_fkey` FOREIGN KEY (`signeParId`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Depart` ADD CONSTRAINT `Depart_traiteParId_fkey` FOREIGN KEY (`traiteParId`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichier` ADD CONSTRAINT `Fichier_idDepart_fkey` FOREIGN KEY (`idDepart`) REFERENCES `Depart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichier` ADD CONSTRAINT `Fichier_idArrivee_fkey` FOREIGN KEY (`idArrivee`) REFERENCES `Arrivee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arrivee` ADD CONSTRAINT `Arrivee_traiteParId_fkey` FOREIGN KEY (`traiteParId`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
