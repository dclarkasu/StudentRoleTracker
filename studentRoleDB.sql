DROP DATABASE IF EXISTS `studentRoleDB`;

CREATE DATABASE IF NOT EXISTS `studentRoleDB` DEFAULT CHARACTER SET utf8;

USE `studentRoleDB`;

DROP TABLE IF EXISTS `student`;

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NULL DEFAULT NULL,
  `lastName` varchar(255) NULL DEFAULT NULL,
  `grade` varchar(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `role`;

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `studentID` int(11) UNSIGNED NULL DEFAULT NULL,
  `name` varchar(255) NULL DEFAULT NULL,
  `description` varchar(255) NULL DEFAULT NULL,
  `isCurrent` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`studentID`)
  REFERENCES `student` (`id`)
);

START TRANSACTION;

USE `studentRoleDB`;
INSERT INTO `student` (`id`,`firstName`, `lastName`, `grade`) VALUES (1,'Lil Bobbie', 'Bobberson','6th'),
(2,'Big Bobbie', 'Bobberson','8th'), (3,'Dwayne', 'Johnson','7th');

INSERT INTO `role` (`id`,`studentID`, `name`, `description`, `isCurrent`) VALUES
(1,1, 'Hall Monitor','That dude', 1),
(2,1, 'Room Setup','Whistle while you work', 0),
(3,2, 'Room Setup','Whistle while you work', 1),
(4,2, 'Cleaner','I clean, I clean', 0),
(5,3, 'Cleaner','I clean, I clean', 1),
(6,3, 'Hall Monitor','That dude', 0);

COMMIT;
