/* eslint-disable */
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let token: string;
let vendaId: string;
let clienteId: string;
let produtoId: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 't@t.com', senha: '123456' });

  token = res.body.access_token;

  const cliente = await request(app.getHttpServer())
    .post('/clientes')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Cliente Venda',
      email: `clientevenda${Date.now()}@teste.com`,
      nascimento: '1990-01-01T00:00:00.000Z',
      userId: '7e798abf-fc22-4617-8bb6-7fe119c59fee',
    });

  clienteId = cliente.body.id;

  const produto = await request(app.getHttpServer())
    .post('/produtos')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Produto Venda',
      descricao: 'Produto para venda',
      preco: 100,
      quantidade: 5,
      userId: '7e798abf-fc22-4617-8bb6-7fe119c59fee',
    });

  produtoId = produto.body.id;
});

afterAll(async () => {
  await app.close();
});

describe('Vendas', () => {
  it('Deve criar uma venda', async () => {
    const res = await request(app.getHttpServer())
      .post('/vendas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        clienteId,
        produtos: [{ produtoId, quantidade: 2 }],
      })
      .expect(201);

    vendaId = res.body.id;
    expect(vendaId).toBeDefined();
  });

  it('Deve listar vendas', async () => {
    const res = await request(app.getHttpServer())
      .get('/vendas')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve deletar uma venda', async () => {
    await request(app.getHttpServer())
      .delete(`/vendas/${vendaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
