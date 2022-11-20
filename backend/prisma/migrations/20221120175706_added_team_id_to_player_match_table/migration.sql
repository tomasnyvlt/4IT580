/*
  Warnings:

  - Added the required column `id_team` to the `match_players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match_players` ADD COLUMN `id_team` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `fk_match_players_team` ON `match_players`(`id_team`);

-- AddForeignKey
ALTER TABLE `match_players` ADD CONSTRAINT `fk_match_players_team` FOREIGN KEY (`id_team`) REFERENCES `team`(`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;
