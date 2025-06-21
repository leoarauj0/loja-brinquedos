import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private prisma: PrismaService) {}

  async obterResumo() {
    const totalVendas = await this.prisma.venda.aggregate({
      _sum: { total: true },
      _count: { id: true },
    });

    const totalProdutosVendidos = await this.prisma.vendasProduto.aggregate({
      _sum: { quantidade: true },
    });

    return {
      totalVendas: totalVendas._sum.total || 0,
      quantidadeVendas: totalVendas._count.id,
      quantidadeProdutosVendidos: totalProdutosVendidos._sum.quantidade || 0,
    };
  }

  async vendasPorDia() {
    const vendas = await this.prisma.venda.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });

    const agrupado = vendas.reduce(
      (acc, venda) => {
        const dia = venda.createdAt.toISOString().split('T')[0];
        acc[dia] = (acc[dia] || 0) + venda.total;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(agrupado).map(([data, total]) => ({
      data,
      total,
    }));
  }

  async produtosMaisVendidos() {
    const resultado = await this.prisma.vendasProduto.groupBy({
      by: ['produtoId'],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: 'desc' } },
      take: 5,
    });

    const produtos = await Promise.all(
      resultado.map(async (item) => {
        const produto = await this.prisma.produto.findUnique({
          where: { id: item.produtoId },
        });
        return {
          produto: produto?.nome,
          quantidadeVendida: item._sum.quantidade,
        };
      }),
    );

    return produtos;
  }

  async melhoresClientes() {
    const clientes = await this.prisma.cliente.findMany({
      include: {
        vendas: {
          include: {
            produtos: true,
          },
        },
      },
    });

    if (clientes.length === 0) {
      return {
        maiorVolume: null,
        maiorMedia: null,
        maiorFrequencia: null,
      };
    }

    const calculo = clientes.map((cliente) => {
      const totalComprado = cliente.vendas.reduce(
        (sum, venda) => sum + venda.total,
        0,
      );

      const medias = cliente.vendas.map((v) => v.total);
      const mediaPorVenda =
        medias.length > 0
          ? medias.reduce((a, b) => a + b, 0) / medias.length
          : 0;

      const diasUnicos = new Set(
        cliente.vendas.map((v) => v.createdAt.toISOString().split('T')[0]),
      );

      return {
        nome: cliente.nome,
        totalComprado,
        mediaPorVenda,
        diasComprando: diasUnicos.size,
      };
    });

    const maiorVolume = calculo.reduce((prev, curr) =>
      curr.totalComprado > prev.totalComprado ? curr : prev,
    );

    const maiorMedia = calculo.reduce((prev, curr) =>
      curr.mediaPorVenda > prev.mediaPorVenda ? curr : prev,
    );

    const maiorFrequencia = calculo.reduce((prev, curr) =>
      curr.diasComprando > prev.diasComprando ? curr : prev,
    );

    return {
      maiorVolume: {
        nome: maiorVolume.nome,
        total: maiorVolume.totalComprado,
      },
      maiorMedia: {
        nome: maiorMedia.nome,
        media: maiorMedia.mediaPorVenda,
      },
      maiorFrequencia: {
        nome: maiorFrequencia.nome,
        dias: maiorFrequencia.diasComprando,
      },
    };
  }
}
