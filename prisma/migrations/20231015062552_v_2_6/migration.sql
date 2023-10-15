/*
  Warnings:

  - You are about to drop the column `user_name` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `userUser_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `user_name`,
    ADD COLUMN `userUser_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
