CREATE TABLE `Trips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(256) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `comments` text,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trip_fg_user_idx` (`userId`),
  CONSTRAINT `trip_fg_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserId_Unique` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
INSERT INTO `toptal`.`users` (
    `userId`,
    `userName`,
    `password`,
    `role`
)
VALUES (
    'admin',
    'Admin User',
    'admin123',
    'super'
);