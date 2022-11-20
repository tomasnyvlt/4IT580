-- AlterTable
ALTER TABLE `match` MODIFY `time_start` DATETIME(0) NULL,
    MODIFY `id_league` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;
