-- CreateTable
CREATE TABLE `Couple` (
    `couple_id` INTEGER NOT NULL AUTO_INCREMENT,
    `m_nickname` VARCHAR(191) NOT NULL,
    `f_nickname` VARCHAR(191) NOT NULL,
    `couple_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`couple_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conflict` (
    `conflict_id` INTEGER NOT NULL AUTO_INCREMENT,
    `couple_id` INTEGER NOT NULL,
    `winner` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `m_text` VARCHAR(191) NOT NULL,
    `f_text` VARCHAR(191) NOT NULL,
    `c_text` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`conflict_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `couple_id` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conflict` ADD CONSTRAINT `Conflict_couple_id_fkey` FOREIGN KEY (`couple_id`) REFERENCES `Couple`(`couple_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promise` ADD CONSTRAINT `Promise_couple_id_fkey` FOREIGN KEY (`couple_id`) REFERENCES `Couple`(`couple_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
