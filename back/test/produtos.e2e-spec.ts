/* eslint-disable */
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let token: string;
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
});

afterAll(async () => {
  await app.close();
});

describe('Produtos', () => {
  it('Deve criar um produto', async () => {
    const res = await request(app.getHttpServer())
      .post('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Produto Teste',
        descricao: 'Descrição do produto',
        preco: 50,
        quantidade: 10,
        userId: '7e798abf-fc22-4617-8bb6-7fe119c59fee',
      })
      .expect(201);

    produtoId = res.body.id;
    expect(produtoId).toBeDefined();
  });

  it('Deve listar produtos', async () => {
    const res = await request(app.getHttpServer())
      .get('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve atualizar produto', async () => {
    await request(app.getHttpServer())
      .patch(`/produtos/${produtoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Produto Atualizado' })
      .expect(200);
  });

  it('Deve deletar produto', async () => {
    await request(app.getHttpServer())
      .delete(`/produtos/${produtoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
