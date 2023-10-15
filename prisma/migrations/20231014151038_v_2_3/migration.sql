/*
  Warnings:

  - You are about to drop the column `user_name` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_user_name_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `user_name`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
