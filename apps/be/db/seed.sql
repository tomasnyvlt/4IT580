-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 19. říj 2022, 19:10
-- Verze serveru: 10.4.14-MariaDB
-- Verze PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = '+00:00';


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `db_sportify`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `event`
--

CREATE TABLE `event` (
  `id_event` int(10) UNSIGNED NOT NULL,
  `time_happened` datetime DEFAULT current_timestamp(),
  `id_match` int(10) UNSIGNED NOT NULL,
  `id_event_type` int(10) UNSIGNED NOT NULL,
  `user_id_user` int(10) UNSIGNED NOT NULL,
  `id_counter_event` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `event_type`
--

CREATE TABLE `event_type` (
  `id_event_type` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `key` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `league`
--

CREATE TABLE `league` (
  `id_league` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_czech_ci NOT NULL,
  `description` text COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `league_has_administrator`
--

CREATE TABLE `league_has_administrator` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_league` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `league_has_team`
--

CREATE TABLE `league_has_team` (
  `id_team` int(10) UNSIGNED NOT NULL,
  `id_league` int(10) UNSIGNED NOT NULL,
  `time_joined` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `login`
--

CREATE TABLE `login` (
  `id_login` int(10) UNSIGNED NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `lost_password`
--

CREATE TABLE `lost_password` (
  `id_lost_password` int(10) UNSIGNED NOT NULL,
  `recovery_token` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `time_valid_until` datetime NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `match`
--

CREATE TABLE `match` (
  `id_match` int(10) UNSIGNED NOT NULL,
  `time_created` datetime DEFAULT current_timestamp(),
  `time_start` datetime NOT NULL,
  `state` enum('pending','accepted','running','done') COLLATE utf8mb4_czech_ci NOT NULL,
  `edit_hash` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `id_league` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `match_editor`
--

CREATE TABLE `match_editor` (
  `id_match_editor` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `user_id_user` int(10) UNSIGNED DEFAULT NULL,
  `match_id_match` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `match_has_team`
--

CREATE TABLE `match_has_team` (
  `id_team` int(10) UNSIGNED NOT NULL,
  `id_match` int(10) UNSIGNED NOT NULL,
  `state` enum('invited','accepted','declined') COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id_refresh_token` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `time_valid_until` datetime NOT NULL,
  `user_id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `team`
--

CREATE TABLE `team` (
  `id_team` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_czech_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `team_has_players`
--

CREATE TABLE `team_has_players` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `id_team` int(10) UNSIGNED NOT NULL,
  `state` enum('invited','joined','admin') COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `team_meta_data`
--

CREATE TABLE `team_meta_data` (
  `id_team_meta_data` int(10) UNSIGNED NOT NULL,
  `key` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_czech_ci DEFAULT NULL,
  `id_team` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `last_name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `user_name` varchar(45) COLLATE utf8mb4_czech_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_czech_ci NOT NULL,
  `time_registered` datetime DEFAULT current_timestamp(),
  `time_last_login` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`,`id_counter_event`),
  ADD KEY `fk_event_match1` (`id_match`),
  ADD KEY `fk_event_event_type1` (`id_event_type`),
  ADD KEY `fk_event_event1` (`id_counter_event`),
  ADD KEY `fk_event_user1` (`user_id_user`);

--
-- Klíče pro tabulku `event_type`
--
ALTER TABLE `event_type`
  ADD PRIMARY KEY (`id_event_type`);

--
-- Klíče pro tabulku `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`id_league`);

--
-- Klíče pro tabulku `league_has_administrator`
--
ALTER TABLE `league_has_administrator`
  ADD PRIMARY KEY (`id_user`,`id_league`),
  ADD KEY `fk_user_has_league_league1` (`id_league`);

--
-- Klíče pro tabulku `league_has_team`
--
ALTER TABLE `league_has_team`
  ADD PRIMARY KEY (`id_team`,`id_league`),
  ADD KEY `fk_team_has_league_league1` (`id_league`);

--
-- Klíče pro tabulku `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD KEY `fk_login_user` (`id_user`);

--
-- Klíče pro tabulku `lost_password`
--
ALTER TABLE `lost_password`
  ADD PRIMARY KEY (`id_lost_password`),
  ADD KEY `fk_lost_password_user1` (`id_user`);

--
-- Klíče pro tabulku `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `fk_match_league1` (`id_league`);

--
-- Klíče pro tabulku `match_editor`
--
ALTER TABLE `match_editor`
  ADD PRIMARY KEY (`id_match_editor`,`match_id_match`),
  ADD KEY `fk_match_editor_user1` (`user_id_user`),
  ADD KEY `fk_match_editor_match1` (`match_id_match`);

--
-- Klíče pro tabulku `match_has_team`
--
ALTER TABLE `match_has_team`
  ADD PRIMARY KEY (`id_team`,`id_match`),
  ADD KEY `fk_team_has_match_match1` (`id_match`);

--
-- Klíče pro tabulku `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id_refresh_token`),
  ADD KEY `fk_refresh_token_user1` (`user_id_user`);

--
-- Klíče pro tabulku `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id_team`);

--
-- Klíče pro tabulku `team_has_players`
--
ALTER TABLE `team_has_players`
  ADD PRIMARY KEY (`id_user`,`id_team`),
  ADD KEY `fk_user_has_team_team1` (`id_team`);

--
-- Klíče pro tabulku `team_meta_data`
--
ALTER TABLE `team_meta_data`
  ADD PRIMARY KEY (`id_team_meta_data`),
  ADD KEY `fk_team_meta_data_team1` (`id_team`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `event_type`
--
ALTER TABLE `event_type`
  MODIFY `id_event_type` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `league`
--
ALTER TABLE `league`
  MODIFY `id_league` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `lost_password`
--
ALTER TABLE `lost_password`
  MODIFY `id_lost_password` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `match_editor`
--
ALTER TABLE `match_editor`
  MODIFY `id_match_editor` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id_refresh_token` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `team`
--
ALTER TABLE `team`
  MODIFY `id_team` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `team_meta_data`
--
ALTER TABLE `team_meta_data`
  MODIFY `id_team_meta_data` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_event1` FOREIGN KEY (`id_counter_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_event_event_type1` FOREIGN KEY (`id_event_type`) REFERENCES `event_type` (`id_event_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_event_match1` FOREIGN KEY (`id_match`) REFERENCES `match` (`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_event_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `league_has_administrator`
--
ALTER TABLE `league_has_administrator`
  ADD CONSTRAINT `fk_user_has_league_league1` FOREIGN KEY (`id_league`) REFERENCES `league` (`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_league_user1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `league_has_team`
--
ALTER TABLE `league_has_team`
  ADD CONSTRAINT `fk_team_has_league_league1` FOREIGN KEY (`id_league`) REFERENCES `league` (`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_team_has_league_team1` FOREIGN KEY (`id_team`) REFERENCES `team` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `lost_password`
--
ALTER TABLE `lost_password`
  ADD CONSTRAINT `fk_lost_password_user1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `fk_match_league1` FOREIGN KEY (`id_league`) REFERENCES `league` (`id_league`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `match_editor`
--
ALTER TABLE `match_editor`
  ADD CONSTRAINT `fk_match_editor_match1` FOREIGN KEY (`match_id_match`) REFERENCES `match` (`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_match_editor_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `match_has_team`
--
ALTER TABLE `match_has_team`
  ADD CONSTRAINT `fk_team_has_match_match1` FOREIGN KEY (`id_match`) REFERENCES `match` (`id_match`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_team_has_match_team1` FOREIGN KEY (`id_team`) REFERENCES `team` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `fk_refresh_token_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `team_has_players`
--
ALTER TABLE `team_has_players`
  ADD CONSTRAINT `fk_user_has_team_team1` FOREIGN KEY (`id_team`) REFERENCES `team` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_team_user1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `team_meta_data`
--
ALTER TABLE `team_meta_data`
  ADD CONSTRAINT `fk_team_meta_data_team1` FOREIGN KEY (`id_team`) REFERENCES `team` (`id_team`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
