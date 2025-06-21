import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async criarCliente(data: {
    nome: string;
    email: string;
    nascimento: Date;
    userId: string;
  }): Promise<Cliente> {
    return this.prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        nascimento: data.nascimento,
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }

  async listarClientes(filtro?: { nome?: string; email?: string }) {
    return this.prisma.cliente.findMany({
      where: {
        nome: filtro?.nome
          ? { contains: filtro.nome, mode: 'insensitive' }
          : undefined,
        email: filtro?.email
          ? { contains: filtro.email, mode: 'insensitive' }
          : undefined,
      },
      orderBy: { nome: 'asc' },
    });
  }

  async listarClientesComVendas() {
    const clientes = await this.prisma.cliente.findMany({
      include: {
        vendas: true,
      },
    });

    return clientes;
  }

  async atualizarCliente(
    id: string,
    data: Partial<{
      nome: string;
      email: string;
      nascimento: Date;
    }>,
  ) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deletarCliente(id: string) {
    // const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    // if (!cliente) throw new NotFoundException('Cliente não encontrado');

    return this.prisma.cliente.delete({ where: { id } });
  }
}
