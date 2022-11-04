/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `event` DROP PRIMARY KEY,
    MODIFY `id_counter_event` INTEGER UNSIGNED NULL,
    ADD PRIMARY KEY (`id_event`);

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;
