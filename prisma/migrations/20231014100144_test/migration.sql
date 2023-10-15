-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History_payment` (
    `history_payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(20, 2) NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`history_payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin_name` VARCHAR(191) NOT NULL,
    `type` ENUM('Buy', 'Sell') NOT NULL,
    `price` DECIMAL(20, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `fee` DECIMAL(20, 2) NOT NULL,
    `image_coin` VARCHAR(191) NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `portfolioId` INTEGER NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `portfolio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(20, 2) NOT NULL,
    `quantity` DECIMAL(20, 5) NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `coinListId` INTEGER NOT NULL,

    PRIMARY KEY (`portfolio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coin_list` (
    `coin_list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(20, 2) NOT NULL,
    `quantity` DECIMAL(20, 2) NOT NULL,
    `fee` DECIMAL(20, 2) NOT NULL,
    `image_coin` VARCHAR(191) NULL,
    `type_coin` ENUM('Stablecoin', 'Crypto') NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Coin_list_coin_name_key`(`coin_name`),
    PRIMARY KEY (`coin_list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History_payment` ADD CONSTRAINT `History_payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `Portfolio`(`portfolio_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_coinListId_fkey` FOREIGN KEY (`coinListId`) REFERENCES `Coin_list`(`coin_list_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
