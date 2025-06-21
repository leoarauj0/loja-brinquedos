import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { VendasModule } from './vendas/vendas.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ClientesModule,
    ProdutosModule,
    PedidosModule,
    VendasModule,
    RelatoriosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
