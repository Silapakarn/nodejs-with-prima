/*
  Warnings:

  - You are about to drop the column `price` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `average_purchase_price` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit_or_loss` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Portfolio` DROP COLUMN `price`,
    ADD COLUMN `average_purchase_price` DECIMAL(20, 2) NOT NULL,
    ADD COLUMN `profit_or_loss` DECIMAL(20, 5) NOT NULL,
    ADD COLUMN `weight` DECIMAL(20, 5) NOT NULL;
