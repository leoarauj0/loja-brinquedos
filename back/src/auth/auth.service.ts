import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(nome: string, email: string, senha: string) {
    const senhaHash = await bcrypt.hash(senha, 10);

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const user = await this.prisma.user.create({
      data: { nome, email, senhaHash },
    });

    return this.generateToken(user);
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senhaHash);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateToken(user);
  }

  private generateToken(user: { id: string; nome: string; email: string }) {
    const payload = { sub: user.id, name: user.nome, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
