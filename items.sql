-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2023 at 03:27 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `commercesite`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `price` int(11) NOT NULL,
  `reviews` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `reviews`, `description`, `image`) VALUES
(1, 'computerr', 500, 1, 'Lorem Ipsum', 'computer.jpg'),
(2, '1tb ssd', 50, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At consectetur lorem donec massa sapien. Nibh tortor id aliquet lectus proin. Ut venenatis tellus in metus vulputate eu. Malesuada fames ac turpis egestas sed tempus. Tristique magna sit amet purus gravida quis blandit turpis. Massa ultricies mi quis hendrerit. Nunc lobortis mattis aliquam faucibus. Egestas quis ipsum suspendisse ultrices gravida. Non enim praesent elementum facilisis leo vel.', 'ssd.jpg'),
(3, 'bag', 11, 3, 'Eu facilisis sed odio morbi quis commodo odio aenean. Elementum integer enim neque volutpat ac. Eget egestas purus viverra accumsan. Bibendum arcu vitae elementum curabitur vitae nunc. Sagittis vitae et leo duis ut diam quam. Ligula ullamcorper malesuada proin libero nunc. Urna nunc id cursus metus aliquam eleifend mi in. Molestie ac feugiat sed lectus vestibulum mattis. Consectetur a erat nam at lectus. Eu sem integer vitae justo eget magna fermentum iaculis. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Ut ornare lectus sit amet est placerat in egestas erat. Turpis in eu mi bibendum neque egestas congue. Arcu odio ut sem nulla pharetra diam.', 'bag.jpg'),
(4, 'treats', 5, 3, 'Eu facilisis sed odio morbi quis commodo odio aenean. Elementum integer enim neque volutpat ac. Eget egestas purus viverra accumsan. Bibendum arcu vitae elementum curabitur vitae nunc. Sagittis vitae et leo duis ut diam quam. Ligula ullamcorper malesuada proin libero nunc. Urna nunc id cursus metus galiquam eleifend mi in. Molestie ac feugiat sed lectus vestibulum mattis. Consectetur a erat nam at lectus. Eu sem integer vitae justo eget magna fermentum iaculis. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Ut ornare lectus sit amet est placerat in egestas erat. Turpis in eu mi bibendum neque egestas congue. Arcu odio ut sem nulla pharetra diam.', 'treats.jpg'),
(8, 'Computer', 400, 0, 'Lorem Ipsum', 'computer.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
