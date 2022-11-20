-- CreateTable
CREATE TABLE `registration_token` (
    `token` VARCHAR(191) NOT NULL,
    `valid_until` DATETIME(0) NOT NULL,
    `id_user` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `registration_token_token_key`(`token`),
    INDEX `fk_regtoken_user`(`id_user`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `registration_token` ADD CONSTRAINT `fk_regtoken_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
