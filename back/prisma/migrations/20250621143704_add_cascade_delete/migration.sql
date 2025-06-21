-- DropForeignKey
ALTER TABLE "VendasProduto" DROP CONSTRAINT "VendasProduto_vendaId_fkey";

-- AddForeignKey
ALTER TABLE "VendasProduto" ADD CONSTRAINT "VendasProduto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
