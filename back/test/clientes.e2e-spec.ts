/* eslint-disable */
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication;
let token: string;
let clienteId: string;

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

describe('Clientes', () => {
  it('Deve criar um cliente', async () => {
    const res = await request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Cliente Teste',
        email: `cliente${Date.now()}@teste.com`,
        nascimento: '1990-01-01T00:00:00.000Z',
        userId: '7e798abf-fc22-4617-8bb6-7fe119c59fee',
      })
      .expect(201);

    clienteId = res.body.id;
    expect(clienteId).toBeDefined();
  });

  it('Deve listar clientes', async () => {
    const res = await request(app.getHttpServer())
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve atualizar cliente', async () => {
    await request(app.getHttpServer())
      .patch(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente Atualizado' })
      .expect(200);
  });

  it('Deve deletar cliente', async () => {
    await request(app.getHttpServer())
      .delete(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
