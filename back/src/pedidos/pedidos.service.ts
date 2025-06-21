import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async criarPedido(data: {
    clienteId: string;
    produtos: { produtoId: string; quantidade: number }[];
  }) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: data.clienteId },
    });

    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const produtosDB = await this.prisma.produto.findMany({
      where: { id: { in: data.produtos.map((p) => p.produtoId) } },
    });

    const total = produtosDB.reduce((acc, produto) => {
      const quantidade =
        data.produtos.find((p) => p.produtoId === produto.id)?.quantidade || 0;
      return acc + produto.preco * quantidade;
    }, 0);

    const pedido = await this.prisma.venda.create({
      data: {
        clienteId: data.clienteId,
        total,
        produtos: {
          create: data.produtos.map((p) => ({
            produtoId: p.produtoId,
            quantidade: p.quantidade,
          })),
        },
      },
      include: { produtos: true },
    });

    return pedido;
  }

  listarPedidos() {
    return this.prisma.venda.findMany({
      include: {
        produtos: {
          include: { produto: true },
        },
        cliente: true,
      },
    });
  }

  buscarPorId(id: string) {
    return this.prisma.venda.findUnique({
      where: { id },
      include: {
        produtos: {
          include: { produto: true },
        },
        cliente: true,
      },
    });
  }

  async atualizarStatus(id: string, status: string) {
    const pedido = await this.prisma.venda.findUnique({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    return this.prisma.venda.update({
      where: { id },
      data: { status },
    });
  }

  deletar(id: string) {
    return this.prisma.venda.delete({ where: { id } });
  }
}
