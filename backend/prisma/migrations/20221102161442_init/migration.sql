-- CreateTable
CREATE TABLE `event` (
    `id_event` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `time_happened` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_match` INTEGER UNSIGNED NOT NULL,
    `id_event_type` INTEGER UNSIGNED NOT NULL,
    `user_id_user` INTEGER UNSIGNED NOT NULL,
    `id_counter_event` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `event_id_event_key`(`id_event`),
    INDEX `fk_event_event1`(`id_counter_event`),
    INDEX `fk_event_event_type1`(`id_event_type`),
    INDEX `fk_event_match1`(`id_match`),
    INDEX `fk_event_user1`(`user_id_user`),
    PRIMARY KEY (`id_event`, `id_counter_event`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_type` (
    `id_event_type` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `key` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id_event_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `league` (
    `id_league` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `description` TEXT NULL,
    `image_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_league`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `league_has_administrator` (
    `id_user` INTEGER UNSIGNED NOT NULL,
    `id_league` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_user_has_league_league1`(`id_league`),
    PRIMARY KEY (`id_user`, `id_league`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `league_has_team` (
    `id_team` INTEGER UNSIGNED NOT NULL,
    `id_league` INTEGER UNSIGNED NOT NULL,
    `time_joined` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_team_has_league_league1`(`id_league`),
    PRIMARY KEY (`id_team`, `id_league`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login` (
    `id_login` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    `id_user` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_login_user`(`id_user`),
    PRIMARY KEY (`id_login`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lost_password` (
    `id_lost_password` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `recovery_token` VARCHAR(255) NOT NULL,
    `time_valid_until` DATETIME(0) NOT NULL,
    `id_user` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_lost_password_user1`(`id_user`),
    PRIMARY KEY (`id_lost_password`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match` (
    `id_match` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `time_created` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `time_start` DATETIME(0) NOT NULL,
    `state` ENUM('pending', 'accepted', 'running', 'done') NOT NULL,
    `edit_hash` VARCHAR(255) NOT NULL,
    `id_league` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_match_league1`(`id_league`),
    PRIMARY KEY (`id_match`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_editor` (
    `id_match_editor` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `user_id_user` INTEGER UNSIGNED NULL,
    `match_id_match` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_match_editor_match1`(`match_id_match`),
    INDEX `fk_match_editor_user1`(`user_id_user`),
    PRIMARY KEY (`id_match_editor`, `match_id_match`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_has_team` (
    `id_team` INTEGER UNSIGNED NOT NULL,
    `id_match` INTEGER UNSIGNED NOT NULL,
    `state` ENUM('invited', 'accepted', 'declined') NOT NULL,

    INDEX `fk_team_has_match_match1`(`id_match`),
    PRIMARY KEY (`id_team`, `id_match`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `id_refresh_token` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `time_valid_until` DATETIME(0) NOT NULL,
    `user_id_user` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_refresh_token_user1`(`user_id_user`),
    PRIMARY KEY (`id_refresh_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id_team` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_team`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_has_players` (
    `id_user` INTEGER UNSIGNED NOT NULL,
    `id_team` INTEGER UNSIGNED NOT NULL,
    `state` ENUM('invited', 'joined', 'admin') NOT NULL,

    INDEX `fk_user_has_team_team1`(`id_team`),
    PRIMARY KEY (`id_user`, `id_team`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_meta_data` (
    `id_team_meta_data` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(45) NOT NULL,
    `value` VARCHAR(255) NULL,
    `id_team` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_team_meta_data_team1`(`id_team`),
    PRIMARY KEY (`id_team_meta_data`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `user_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `time_registered` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `time_last_login` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `fk_event_event1` FOREIGN KEY (`id_counter_event`) REFERENCES `event`(`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `fk_event_event_type1` FOREIGN KEY (`id_event_type`) REFERENCES `event_type`(`id_event_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `fk_event_match1` FOREIGN KEY (`id_match`) REFERENCES `match`(`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `fk_event_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `league_has_administrator` ADD CONSTRAINT `fk_user_has_league_league1` FOREIGN KEY (`id_league`) REFERENCES `league`(`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `league_has_administrator` ADD CONSTRAINT `fk_user_has_league_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `league_has_team` ADD CONSTRAINT `fk_team_has_league_league1` FOREIGN KEY (`id_league`) REFERENCES `league`(`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `league_has_team` ADD CONSTRAINT `fk_team_has_league_team1` FOREIGN KEY (`id_team`) REFERENCES `team`(`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `fk_login_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lost_password` ADD CONSTRAINT `fk_lost_password_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `fk_match_league1` FOREIGN KEY (`id_league`) REFERENCES `league`(`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_editor` ADD CONSTRAINT `fk_match_editor_match1` FOREIGN KEY (`match_id_match`) REFERENCES `match`(`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_editor` ADD CONSTRAINT `fk_match_editor_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_has_team` ADD CONSTRAINT `fk_team_has_match_match1` FOREIGN KEY (`id_match`) REFERENCES `match`(`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `match_has_team` ADD CONSTRAINT `fk_team_has_match_team1` FOREIGN KEY (`id_team`) REFERENCES `team`(`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `fk_refresh_token_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `team_has_players` ADD CONSTRAINT `fk_user_has_team_team1` FOREIGN KEY (`id_team`) REFERENCES `team`(`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `team_has_players` ADD CONSTRAINT `fk_user_has_team_user1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `team_meta_data` ADD CONSTRAINT `fk_team_meta_data_team1` FOREIGN KEY (`id_team`) REFERENCES `team`(`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;
