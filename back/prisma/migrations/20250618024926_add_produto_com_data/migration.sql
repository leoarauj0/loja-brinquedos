/*
  Warnings:

  - You are about to drop the column `atualizadoEm` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "atualizadoEm",
DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
