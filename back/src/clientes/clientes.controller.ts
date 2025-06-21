import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  criar(
    @Body()
    body: {
      nome: string;
      email: string;
      nascimento: Date;
      userId: string;
    },
  ) {
    return this.clientesService.criarCliente(body);
  }

  @Get()
  listar(@Query('nome') nome?: string, @Query('email') email?: string) {
    return this.clientesService.listarClientes({ nome, email });
  }

  @Get('formatado')
  async listarFormatado() {
    const clientes = await this.clientesService.listarClientesComVendas();

    const resposta = {
      data: {
        clientes: clientes.map((cliente) => ({
          info: {
            id: cliente.id,
            nomeCompleto: cliente.nome,
            detalhes: {
              email: cliente.email,
              nascimento: cliente.nascimento,
            },
          },
          duplicado: {
            nomeCompleto: cliente.nome,
          },
          estatisticas: {
            vendas: cliente.vendas.map((v) => ({
              data: v.createdAt,
              valor: v.total,
            })),
          },
        })),
      },
      meta: {
        registroTotal: clientes.length,
        pagina: 1,
      },
      redundante: {
        status: 'ok',
      },
    };

    return resposta;
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body()
    body: Partial<{ nome: string; email: string; nascimento: Date }>,
  ) {
    return this.clientesService.atualizarCliente(id, body);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.clientesService.deletarCliente(id);
  }
}
