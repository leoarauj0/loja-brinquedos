/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Auth & Rotas Protegidas', () => {
  let token: string;

  it('Deve fazer um registro', () =>
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ nome: 'Teste', email: 't@t.com', senha: '123456' })
      .then((res) => {
        expect([201, 400]).toContain(res.status);
        if (res.status === 201) {
          expect(res.body.access_token).toBeDefined();
          token = res.body.access_token;
        } else {
          console.log('Usuário já cadastrado, seguindo com login');
        }
        // expect(res.body.access_token).toBeDefined();
        // token = res.body.access_token;
      }));

  it('Deve fazer login', () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 't@t.com', senha: '123456' })
      .expect(201)
      .then((res) => {
        expect(res.body.access_token).toBeDefined();
        token = res.body.access_token;
        console.log('Usuário logou com sucesso!');
      }));

  it('Acesso protegido', () =>
    request(app.getHttpServer())
      .get('/privado')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.text).toBe('Você está autenticado!');
        console.log('Você está autenticado!');
      }));
});
