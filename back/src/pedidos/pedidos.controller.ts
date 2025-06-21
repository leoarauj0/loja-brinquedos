import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PedidosService } from './pedidos.service';

@UseGuards(JwtAuthGuard)
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  criar(
    @Body()
    body: {
      clienteId: string;
      produtos: { produtoId: string; quantidade: number }[];
    },
  ) {
    return this.pedidosService.criarPedido(body);
  }

  @Get()
  listar() {
    return this.pedidosService.listarPedidos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.pedidosService.buscarPorId(id);
  }

  @Patch(':id')
  atualizarStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.pedidosService.atualizarStatus(id, body.status);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.pedidosService.deletar(id);
  }
}
