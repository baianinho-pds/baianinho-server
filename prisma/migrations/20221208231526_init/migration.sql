-- CreateTable
CREATE TABLE `ClientEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contactPhone` VARCHAR(11) NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `cnpj` VARCHAR(14) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedstockEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `suppliesType` VARCHAR(255) NOT NULL,
    `provider` VARCHAR(255) NOT NULL,
    `unit` VARCHAR(255) NOT NULL,
    `amount` INTEGER NULL,
    `validity` TIMESTAMP(6) NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `ctps` VARCHAR(8) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `admissionDate` TIMESTAMP(6) NOT NULL,
    `demissionDate` TIMESTAMP(6) NULL,
    `contactPhone` VARCHAR(11) NOT NULL,
    `role` ENUM('admin', 'seller') NOT NULL,
    `sector` ENUM('internal', 'external') NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `number` VARCHAR(255) NOT NULL,
    `postalCode` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `batchCode` INTEGER NOT NULL,
    `grammage` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `productionDate` TIMESTAMP(6) NOT NULL,
    `expirationDate` TIMESTAMP(6) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FeedstockEntityToProductEntity` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FeedstockEntityToProductEntity_AB_unique`(`A`, `B`),
    INDEX `_FeedstockEntityToProductEntity_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FeedstockEntityToProductEntity` ADD CONSTRAINT `_FeedstockEntityToProductEntity_A_fkey` FOREIGN KEY (`A`) REFERENCES `FeedstockEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FeedstockEntityToProductEntity` ADD CONSTRAINT `_FeedstockEntityToProductEntity_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
