import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  criarProduto(data: {
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    userId: string;
  }) {
    return this.prisma.produto.create({ data });
  }

  listarProdutos(filtro?: { nome?: string }) {
    return this.prisma.produto.findMany({
      where: {
        nome: filtro?.nome
          ? { contains: filtro.nome, mode: 'insensitive' }
          : undefined,
      },
    });
  }

  async atualizarProduto(
    id: string,
    data: Partial<{
      nome: string;
      descricao: string;
      preco: number;
      quantidade: number;
    }>,
  ) {
    const existe = await this.prisma.produto.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Produto não encontrado');

    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async deletarProduto(id: string) {
    const existe = await this.prisma.produto.findUnique({ where: { id } });
    if (!existe) throw new NotFoundException('Produto não encontrado');

    return this.prisma.produto.delete({ where: { id } });
  }
}
