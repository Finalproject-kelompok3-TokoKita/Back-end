-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2024 at 04:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kel3`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(40) NOT NULL,
  `DateOfBirth` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `DateOfBirth`, `gender`, `password`, `image`, `url`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin', '', '', '', '$2b$10$Rn/xlFyiZNiwbvVy5n0Y..C.HL2MAFk1PJEiz1dE8lsiPby0CTYqW', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW4iLCJpYXQiOjE3MDI3ODkwOTMsImV4cCI6MTcwMjg3NTQ5M30.UxICfd4TLAxpaoLvi_z1VURk_sdW_aoe-LwENOUVvrI', '2023-12-17 04:57:57', '2023-12-17 04:58:13'),
(2, 'Admin', 'admin', '', '', '', '$2b$10$OxmLFo2rTSLALQa7FivTbeRdnpxXxjmRjcyZyZtS9X10Z0djLJTla', '', '', NULL, '2024-01-04 11:57:33', '2024-01-04 11:57:33'),
(3, 'Admin', 'admin123@gmail.com', '', '', '', '$2b$10$ViLBLrwohZz.Gdki8cdGXeCXqc2h1PDSd1wfrEBXAdAQatUAjqF0O', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNzA0MzgxODMwLCJleHAiOjE3MDQ0NjgyMzB9.OeISDAwZScJFO7jDdru3qLA8IL0gAimRGKy96lmYlgs', '2024-01-04 11:58:09', '2024-01-04 15:23:50'),
(4, 'Admin2', 'admin12@gmail.com', '', '', '', '$2b$10$yEZnHV.R5XrWIqiBbc743e1C1ZwYA6g6nU.xWYo2OYnPnRugSwRFu', '', '', NULL, '2024-01-04 11:59:56', '2024-01-04 11:59:56'),
(5, 'Admin2', 'admin12@gmail.com', '', '', '', '$2b$10$e6HTA8BTUb8qBNdotB7RGuZSX1r5l7A5FhBX.Hqy4Y3Q.eU2U9ZFK', '', '', NULL, '2024-01-04 12:49:02', '2024-01-04 12:49:02'),
(6, 'Admin', 'admin', '', '', '', '$2b$10$xAeww5QWhKJLVzbecxBh7.Tt.igKjnhSxanVtBnDaEvG8yzOnp8eq', '', '', NULL, '2024-01-04 14:50:03', '2024-01-04 14:50:03'),
(7, 'Admin123', 'admin123@gmail.com', '', '', '', '$2b$10$9B1pOTDR2kaMW3Ghx8jJke/EledtxSgBtHhadtHAyEzsF3rKpb5t.', '', '', NULL, '2024-01-04 14:50:30', '2024-01-04 14:50:30'),
(8, 'Admin1223', 'admin123@gmail.com', '', '', '', '$2b$10$6nmJiC9tuBVQXboRNv.Yo.dUO8aK.4hsNmQgf68Oq/pn5nv6QJZom', '', '', NULL, '2024-01-04 14:51:08', '2024-01-04 14:51:08'),
(9, 'Admin', 'admin123@gmail.com', '', '', '', '$2b$10$G8oV38d1ixOemNjPwDSFu.l7C3uRTxZk3m5qOaxnlvWNovInyGnW2', '', '', NULL, '2024-01-04 15:01:23', '2024-01-04 15:01:23'),
(10, 'Admin44', 'admin1234@gmail.com', '', '', '', '$2b$10$PoWTpgxViyK6brhhfb7o5e3uo8tbAQHqaYP3kuzVE3houxZ/lMGd2', '', '', NULL, '2024-01-04 15:21:16', '2024-01-04 15:21:16'),
(11, 'Admin445', 'admin12345@gmail.com', '', '', '', '$2b$10$w3CCoSLj6Mhmbi4v8OOI2.5QkjDFZtsyIwIliufjVdMKo1oQUBGe.', '', '', NULL, '2024-01-04 15:23:47', '2024-01-04 15:23:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
