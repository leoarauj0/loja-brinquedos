import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async criarVenda(data: {
    clienteId: string;
    produtos: { produtoId: string; quantidade: number }[];
  }) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const produtosDb = await this.prisma.produto.findMany({
      where: {
        id: { in: data.produtos.map((p) => p.produtoId) },
      },
    });

    if (produtosDb.length !== data.produtos.length) {
      throw new BadRequestException('Um ou mais produtos não encontrados');
    }

    const itensVenda = data.produtos.map((item) => {
      const produto = produtosDb.find((p) => p.id === item.produtoId);
      if (!produto) {
        throw new BadRequestException(
          `Produto não encontrado: ${item.produtoId}`,
        );
      }

      if (produto.quantidade < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto: ${produto.nome}`,
        );
      }

      return {
        produtoId: produto.id,
        quantidade: item.quantidade,
      };
    });

    const total = itensVenda.reduce((acc, item) => {
      const produto = produtosDb.find((p) => p.id === item.produtoId);
      return acc + produto!.preco * item.quantidade;
    }, 0);

    const venda = await this.prisma.venda.create({
      data: {
        clienteId: data.clienteId,
        total,
        produtos: {
          create: itensVenda,
        },
      },
      include: {
        produtos: {
          include: { produto: true },
        },
      },
    });

    // Atualiza o estoque
    for (const item of itensVenda) {
      const produto = produtosDb.find((p) => p.id === item.produtoId);
      await this.prisma.produto.update({
        where: { id: item.produtoId },
        data: { quantidade: produto!.quantidade - item.quantidade },
      });
    }

    return venda;
  }

  async listarVendas() {
    return this.prisma.venda.findMany({
      include: {
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });
  }

  async buscarPorId(id: string) {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: true,
        produtos: {
          include: { produto: true },
        },
      },
    });

    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }

    return venda;
  }

  async atualizarStatus(id: string, status: string) {
    return this.prisma.venda.update({
      where: { id },
      data: { status },
    });
  }

  async deletar(id: string) {
    // Primeiro deleta os itens vinculados
    await this.prisma.vendasProduto.deleteMany({
      where: { vendaId: id },
    });

    // Depois deleta a venda
    return this.prisma.venda.delete({
      where: { id },
    });
  }
}
