import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RelatoriosController],
  providers: [RelatoriosService, PrismaService],
})
export class RelatoriosModule {}
