/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `user_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_portfolioId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `portfolioId`,
    DROP COLUMN `userId`,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_name_fkey` FOREIGN KEY (`user_name`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
