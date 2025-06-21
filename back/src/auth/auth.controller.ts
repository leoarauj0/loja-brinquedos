import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class RegisterDto {
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  senha!: string;
}

class LoginDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  senha!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    const { nome, email, senha } = body;
    return this.authService.register(nome, email, senha);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    const { email, senha } = body;
    return this.authService.login(email, senha);
  }
}
