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
import { VendasService } from './vendas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  criarVenda(
    @Body()
    body: {
      clienteId: string;
      produtos: { produtoId: string; quantidade: number }[];
    },
  ) {
    return this.vendasService.criarVenda(body);
  }

  @Get()
  listar() {
    return this.vendasService.listarVendas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.vendasService.buscarPorId(id);
  }

  @Patch(':id/status')
  atualizarStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.vendasService.atualizarStatus(id, body.status);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.vendasService.deletar(id);
  }
}
