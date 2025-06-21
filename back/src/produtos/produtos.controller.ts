import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  criar(
    @Body()
    body: {
      nome: string;
      descricao: string;
      preco: number;
      quantidade: number;
      userId: string;
    },
  ) {
    return this.produtosService.criarProduto(body);
  }

  @Get()
  listar(@Query('nome') nome?: string) {
    return this.produtosService.listarProdutos({ nome });
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      nome: string;
      descricao: string;
      preco: number;
      quantidade: number;
    }>,
  ) {
    return this.produtosService.atualizarProduto(id, body);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.produtosService.deletarProduto(id);
  }
}
