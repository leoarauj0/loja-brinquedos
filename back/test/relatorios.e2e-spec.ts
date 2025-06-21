/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let token: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  // Registro do usuário (ignora erro se já existir)
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ nome: 'Teste', email: 't@t.com', senha: '123456' })
    .then((res) => {
      if (res.status === 201) {
        token = res.body.access_token;
      }
    });

  // Login para obter token válido
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 't@t.com', senha: '123456' })
    .expect(201);

  token = res.body.access_token;
});

afterAll(async () => {
  await app.close();
});

describe('Relatórios', () => {
  it('Deve obter vendas por dia', async () => {
    const res = await request(app.getHttpServer())
      .get('/relatorios/vendas-por-dia')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
    console.log('Vendas por dia:', res.body);
  });

  it('Deve obter os clientes com maior frequência, média e volume', async () => {
    const res = await request(app.getHttpServer())
      .get('/relatorios/melhores-clientes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('maiorFrequencia');
    expect(res.body).toHaveProperty('maiorMedia');
    expect(res.body).toHaveProperty('maiorVolume');

    console.log('Clientes melhores:', res.body);
  });
});
