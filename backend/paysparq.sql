-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 16, 2025 at 02:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paysparq`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_transfer_history`
--

CREATE TABLE `bank_transfer_history` (
  `id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `receiver_name` varchar(255) NOT NULL,
  `receiver_bank` varchar(255) DEFAULT NULL,
  `receiver_account_number` varchar(50) DEFAULT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_bank` varchar(255) DEFAULT NULL,
  `sender_account_number` varchar(50) DEFAULT NULL,
  `amount` decimal(65,2) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `destination_type` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `session_id` varchar(50) NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_transfer_history`
--

INSERT INTO `bank_transfer_history` (`id`, `sender_id`, `receiver_id`, `receiver_name`, `receiver_bank`, `receiver_account_number`, `sender_name`, `sender_bank`, `sender_account_number`, `amount`, `transaction_type`, `destination_type`, `status`, `created_at`, `session_id`, `remarks`) VALUES
(45, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 2000.00, 'debit', 'internal', 'success', '2025-02-14 16:39:02', '', ''),
(46, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 2000.00, 'credit', 'internal', 'success', '2025-02-14 16:39:02', '', ''),
(47, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 2000.00, 'debit', 'internal', 'success', '2025-02-14 16:51:57', '', ''),
(48, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 2000.00, 'credit', 'internal', 'success', '2025-02-14 16:51:57', '', ''),
(49, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'debit', 'internal', 'success', '2025-02-14 16:57:51', '', ''),
(50, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'credit', 'internal', 'success', '2025-02-14 16:57:51', '', ''),
(51, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'debit', 'internal', 'success', '2025-02-14 16:59:07', '', ''),
(52, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'credit', 'internal', 'success', '2025-02-14 16:59:07', '', ''),
(53, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'debit', 'internal', 'success', '2025-02-14 17:01:25', '', ''),
(54, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 1000.00, 'credit', 'internal', 'success', '2025-02-14 17:01:25', '', ''),
(55, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 10000.00, 'debit', 'internal', 'success', '2025-02-15 16:32:44', '', 'money'),
(56, 8, 9, 'Itodo Gabriel Ejeh', 'Paysparq Limited', '9454776058', 'Paysparq Limited ', 'Paysparq Limited', '9753231920', 10000.00, 'credit', 'internal', 'success', '2025-02-15 16:32:44', '', 'money');

-- --------------------------------------------------------

--
-- Table structure for table `card_country_exchange_rates`
--

CREATE TABLE `card_country_exchange_rates` (
  `id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `country_currency` varchar(50) NOT NULL,
  `exchange_rate` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `card_country_exchange_rates`
--

INSERT INTO `card_country_exchange_rates` (`id`, `card_id`, `country`, `country_currency`, `exchange_rate`, `created_at`, `updated_at`) VALUES
(7, 20, 'United State', '$', 925.00, '2025-02-14 04:37:24', '2025-02-14 06:21:41');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `account_balance` decimal(65,2) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`uid`, `username`, `fullname`, `email`, `phone_number`, `account_balance`, `password`, `avatar`, `role_id`, `created_at`, `updated_at`) VALUES
(2, 'Super-admin', 'Super Admin', 'admin@gmail.com', '0912907945', 0.00, '$2b$10$5wZGoEAKlVemX1G.Q7a9ruhe0n0QRqe04hAMWOVqxWHfSwW.7.H1q', NULL, 1, '2025-02-08 00:47:44', '2025-02-14 11:48:58');

-- --------------------------------------------------------

--
-- Table structure for table `exchange_rate`
--

CREATE TABLE `exchange_rate` (
  `id` bigint(20) NOT NULL,
  `currency_name` varchar(20) NOT NULL,
  `buying_rate` varchar(20) NOT NULL,
  `selling_rate` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `exchange_rate`
--

INSERT INTO `exchange_rate` (`id`, `currency_name`, `buying_rate`, `selling_rate`, `created_at`, `updated_at`) VALUES
(1, 'USD', '1597.49', '1641.19', '2025-01-26 20:57:01', '2025-02-14 17:00:08'),
(2, 'EUR', '1667.70', '1711.72', '2025-01-26 20:57:01', '2025-02-14 17:00:08'),
(3, 'GBP', '1989.93', '2065.38', '2025-01-26 20:57:01', '2025-02-14 17:00:08');

-- --------------------------------------------------------

--
-- Table structure for table `gift_cards`
--

CREATE TABLE `gift_cards` (
  `id` int(11) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gift_cards`
--

INSERT INTO `gift_cards` (`id`, `avatar_url`, `card_name`, `created_at`, `updated_at`) VALUES
(20, 'http://localhost:8080/uploads/1739507814278_image_0.png', 'Amazon', '2025-02-14 04:36:54', '2025-02-14 04:36:54');

-- --------------------------------------------------------

--
-- Table structure for table `gift_card_trading_history`
--

CREATE TABLE `gift_card_trading_history` (
  `id` int(11) NOT NULL,
  `transaction_no` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `avatar_url` varchar(255) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_type` text NOT NULL,
  `card_country` varchar(50) NOT NULL,
  `card_value` decimal(10,2) NOT NULL,
  `trade_amount` decimal(10,2) NOT NULL,
  `card_code` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `trade_status` enum('pending','completed','rejected') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `exchange_rate` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Super-Admin'),
(2, 'Manager'),
(3, 'Customer-Support');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `txn_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `amount` decimal(65,2) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `transaction_no` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`txn_id`, `user_id`, `transaction_type`, `amount`, `transaction_date`, `status`, `description`, `transaction_no`) VALUES
(50, 8, 'deposit', 6000.00, '2025-02-11 18:23:13', 'completed', 'Wallet funding', '173929819356211645'),
(51, 8, 'debit', 2000.00, '2025-02-14 16:39:01', 'success', 'Transfer to Paysparq', '173955114190715311'),
(52, 9, 'credit', 2000.00, '2025-02-14 16:39:01', 'success', 'Transfer from Paysparq', '173955114190715311'),
(53, 8, 'debit', 2000.00, '2025-02-14 16:51:56', 'success', 'Transfer to Paysparq', '173955191692611119'),
(54, 9, 'credit', 2000.00, '2025-02-14 16:51:56', 'success', 'Transfer from Paysparq', '173955191692611119'),
(55, 8, 'debit', 1000.00, '2025-02-14 16:57:51', 'success', 'Transfer to Paysparq', '17395522710957558'),
(56, 9, 'credit', 1000.00, '2025-02-14 16:57:51', 'success', 'Transfer from Paysparq', '17395522710957558'),
(57, 8, 'debit', 1000.00, '2025-02-14 16:59:07', 'success', 'Transfer to Paysparq', '173955234763314020'),
(58, 9, 'credit', 1000.00, '2025-02-14 16:59:07', 'success', 'Transfer from Paysparq', '173955234763314020'),
(59, 8, 'debit', 1000.00, '2025-02-14 17:01:25', 'success', 'Transfer to Paysparq', '17395524855568634'),
(60, 9, 'credit', 1000.00, '2025-02-14 17:01:25', 'success', 'Transfer from Paysparq', '17395524855568634'),
(61, 8, 'debit', 10000.00, '2025-02-15 16:32:44', 'success', 'Transfer to Paysparq', '17396371645128677'),
(62, 9, 'credit', 10000.00, '2025-02-15 16:32:44', 'success', 'Transfer from Paysparq', '17396371645128677');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `account_balance` decimal(65,2) DEFAULT NULL,
  `referral_balance` decimal(65,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `account_number` varchar(10) NOT NULL,
  `date_of_birth` varchar(225) DEFAULT NULL,
  `address` varchar(225) DEFAULT NULL,
  `nin_number` varchar(225) DEFAULT NULL,
  `bvn_number` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `fullname`, `email`, `phone_number`, `password`, `country`, `avatar`, `account_balance`, `referral_balance`, `created_at`, `updated_at`, `account_number`, `date_of_birth`, `address`, `nin_number`, `bvn_number`) VALUES
(8, 'paysparq', 'Paysparq Limited ', 'paysparq@gmail.com', '2349129079450', '$2a$10$EBZxZTqK7omTUCe0pur4iO2hPvH88kH.i4hO8l4OP2HCmep9Sh9UC', 'Nigeria', 'https://www.marktechpost.com/wp-content/uploads/2023/05/7309681-scaled.jpg', 169998.70, 0.00, '2025-01-31 10:26:30', '2025-02-15 16:32:44', '9753231920', '1993-04-14', 'IYODUN STREET OLODE IFE-SOUTH LGA OSUN STATE', '12345678900', '12345678900'),
(9, 'Alphatech29', 'Itodo Gabriel Ejeh', 'itodogabriel40@gmail.com', '2347018661403', '$2a$10$NJ6dAMibs0Yd73UAEVLNR.UMQRDHHlWvjoDekgf9B.znaXaTLuZFm', 'Nigeria', 'https://www.marktechpost.com/wp-content/uploads/2023/05/7309681-scaled.jpg', 17000.00, 0.00, '2025-02-02 18:48:49', '2025-02-15 16:32:44', '9454776058', NULL, 'IYODUN STREET OLODE IFE-SOUTH LGA OSUN STATE', '12345678900', '12345678900');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_transfer_history`
--
ALTER TABLE `bank_transfer_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `card_country_exchange_rates`
--
ALTER TABLE `card_country_exchange_rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `card_id` (`card_id`),
  ADD KEY `country` (`country`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `exchange_rate`
--
ALTER TABLE `exchange_rate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `currency_name` (`currency_name`);

--
-- Indexes for table `gift_cards`
--
ALTER TABLE `gift_cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `card_name` (`card_name`);

--
-- Indexes for table `gift_card_trading_history`
--
ALTER TABLE `gift_card_trading_history`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_no` (`transaction_no`),
  ADD UNIQUE KEY `card_code` (`card_code`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `card_name` (`card_name`),
  ADD KEY `card_country` (`card_country`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`txn_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD UNIQUE KEY `account_number` (`account_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_transfer_history`
--
ALTER TABLE `bank_transfer_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `card_country_exchange_rates`
--
ALTER TABLE `card_country_exchange_rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exchange_rate`
--
ALTER TABLE `exchange_rate`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `gift_cards`
--
ALTER TABLE `gift_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `gift_card_trading_history`
--
ALTER TABLE `gift_card_trading_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `txn_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_transfer_history`
--
ALTER TABLE `bank_transfer_history`
  ADD CONSTRAINT `bank_transfer_history_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE,
  ADD CONSTRAINT `bank_transfer_history_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE;

--
-- Constraints for table `card_country_exchange_rates`
--
ALTER TABLE `card_country_exchange_rates`
  ADD CONSTRAINT `card_country_exchange_rates_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `gift_cards` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE;

--
-- Constraints for table `gift_card_trading_history`
--
ALTER TABLE `gift_card_trading_history`
  ADD CONSTRAINT `gift_card_trading_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
