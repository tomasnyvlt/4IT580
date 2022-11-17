-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;

-- CreateTable
CREATE TABLE `match_players` (
    `id_match_players` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `match_game_name` VARCHAR(255) NULL,
    `match_role` VARCHAR(255) NULL,
    `id_player` INTEGER UNSIGNED NOT NULL,
    `id_match` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_match_players_match1`(`id_match`),
    PRIMARY KEY (`id_match_players`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match_players` ADD CONSTRAINT `fk_match_players_match1` FOREIGN KEY (`id_match`) REFERENCES `match`(`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_players` ADD CONSTRAINT `fk_match_players_user1` FOREIGN KEY (`id_player`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
