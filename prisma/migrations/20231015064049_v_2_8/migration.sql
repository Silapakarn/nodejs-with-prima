/*
  Warnings:

  - You are about to drop the column `coinListId` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `coin_name` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Portfolio` DROP FOREIGN KEY `Portfolio_coinListId_fkey`;

-- DropForeignKey
ALTER TABLE `Portfolio` DROP FOREIGN KEY `Portfolio_userId_fkey`;

-- AlterTable
ALTER TABLE `Portfolio` DROP COLUMN `coinListId`,
    DROP COLUMN `userId`,
    ADD COLUMN `coin_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_coin_name_fkey` FOREIGN KEY (`coin_name`) REFERENCES `Coin_list`(`coin_name`) ON DELETE RESTRICT ON UPDATE CASCADE;
