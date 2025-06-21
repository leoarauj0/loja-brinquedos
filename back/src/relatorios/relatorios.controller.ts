import { Controller, Get, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get()
  obterResumo() {
    return this.relatoriosService.obterResumo();
  }

  @Get('vendas-por-dia')
  vendasPorDia() {
    return this.relatoriosService.vendasPorDia();
  }

  @Get('melhores-produtos')
  produtosMaisVendidos() {
    return this.relatoriosService.produtosMaisVendidos();
  }

  @Get('melhores-clientes')
  melhoresClientes() {
    return this.relatoriosService.melhoresClientes();
  }
}
