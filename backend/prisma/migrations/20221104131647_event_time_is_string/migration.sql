-- AlterTable
ALTER TABLE `event` MODIFY `time_happened` VARCHAR(6) NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;
