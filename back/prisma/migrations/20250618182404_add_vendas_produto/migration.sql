/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `VendasProduto` table. All the data in the column will be lost.
  - Added the required column `vendaId` to the `VendasProduto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VendasProduto" DROP CONSTRAINT "VendasProduto_pedidoId_fkey";

-- AlterTable
ALTER TABLE "VendasProduto" DROP COLUMN "pedidoId",
ADD COLUMN     "vendaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VendasProduto" ADD CONSTRAINT "VendasProduto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
