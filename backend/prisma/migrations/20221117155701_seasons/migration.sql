-- AlterTable
ALTER TABLE `match` ADD COLUMN `season` ENUM('s2013', 's2014', 's2015', 's2016', 's2017', 's2018', 's2019', 's2020', 's2021', 's2022', 's2023') NOT NULL DEFAULT 's2023';

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `time_registered` DROP DEFAULT,
    ALTER COLUMN `time_last_login` DROP DEFAULT;
