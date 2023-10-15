/*
  Warnings:

  - You are about to drop the column `user_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `user_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `user_id`,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL;
