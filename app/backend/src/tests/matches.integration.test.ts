import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import User from '../database/models/User';
import {
  matchesMock,
  notInProgressMatchesMock,
  inProgressMatchesMock,
  createMatchMockOk,
  createMatchMockInvalid,
  createMatchMockInvalidEqualTeams,
} from './mocks/matches.mock';
import { teamMockOk } from './mocks/teams.mock';

import { userMockOk, invalidToken } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;



describe('/matches', () => {
  describe('Sucesso - GET - All', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(matchesMock as unknown as Matches[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as partidas', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(matchesMock);
    });
  });

  describe('Sucesso - GET - All com filtro para partidas em progresso', () => {
    before(() => {
      sinon.stub(Matches, 'findAll').resolves(inProgressMatchesMock as unknown as Matches[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as partidas em progresso', async () => {
      const response = await chai.request(app).get('/matches').query({ inProgress: "true" });
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(inProgressMatchesMock);
    });
  });

  describe('Sucesso - GET - All com filtro para partidas que não estão em progresso', () => {
      before(() => {
        sinon.stub(Matches, 'findAll').resolves(notInProgressMatchesMock as unknown as Matches[]);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('Deve retornar todas as partidas que não estão em progresso', async () => {
        const response = await chai.request(app).get('/matches').query({ inProgress: "false" });
        expect(response.status).to.be.equal(200);
        chai.expect(response.body).to.deep.equal(notInProgressMatchesMock);
      });
  });

  describe('Sucesso - POST', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMockOk as User);
      sinon.stub(Teams, 'findByPk').resolves(teamMockOk as Teams);
      sinon.stub(Matches, 'create').resolves({ id: 1, ...createMatchMockOk, inProgress: true} as Matches);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve ser possível cadastrar uma partida com sucesso', async () => {
      const responseLogin = await chai.request(app).post('/login').send({ email: userMockOk.email, password: 'secret_user' });
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', responseLogin.body.token)
        .send(createMatchMockOk);
      expect(response.status).to.be.equal(201);
      chai.expect(response.body).to.deep.equal({ id: 1, ...createMatchMockOk, inProgress: true});
    });
  });

  describe('Falha - POST - Token incorreto ou não informado', () => {
    it('Deve retornar um erro caso o token seja inválido', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', invalidToken)
        .send(createMatchMockOk);
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message': 'Token must be a valid token' });
    });

    it('Deve retornar um erro caso o token não esteja na requisição', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(createMatchMockOk);
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message':'Token not provided' });
    });
  });

  describe('Falha - POST - Dados da requisição inválidos', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMockOk as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Não é possível cadastrar faltando algum valor no corpo', async () => {
      const responseLogin = await chai.request(app).post('/login').send({ email: userMockOk.email, password: 'secret_user' });
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', responseLogin.body.token)
        .send(createMatchMockInvalid);
      expect(response.status).to.be.equal(400);
      chai.expect(response.body).to.deep.equal({ 'message': 'All fields must be filled' });
    });
  });

  describe('Falha - POST - Chave de time inválida', () => {
    before(() => {
      sinon.stub(Teams, 'findByPk').resolves(null);
      sinon.stub(User, 'findOne').resolves(userMockOk as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Não é possível cadastrar com uma chave de time inválida', async () => {
      const responseLogin = await chai.request(app).post('/login').send({ email: userMockOk.email, password: 'secret_user' });
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', responseLogin.body.token)
        .send(createMatchMockOk);
      expect(response.status).to.be.equal(404);
      chai.expect(response.body).to.deep.equal({ 'message': 'There is no team with such id!' });
    });
  });

  describe('Falha - POST - Chave de times iguais', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMockOk as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Não é possível cadastrar com ambas as chaves de times com o mesmo valor', async () => {
      const responseLogin = await chai.request(app).post('/login').send({ email: userMockOk.email, password: 'secret_user' });
      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', responseLogin.body.token)
        .send(createMatchMockInvalidEqualTeams);
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message': 'It is not possible to create a match with two equal teams' });
    });
  });
});
