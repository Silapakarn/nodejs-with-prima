/*
  Warnings:

  - You are about to drop the column `userId` on the `History_payment` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `History_payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `History_payment` DROP FOREIGN KEY `History_payment_userId_fkey`;

-- AlterTable
ALTER TABLE `History_payment` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `History_payment` ADD CONSTRAINT `History_payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
