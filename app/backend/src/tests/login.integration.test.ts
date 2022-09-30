import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import User from '../../database/models/User';
// import loginValidation from '../../middlewares/loginValidation.middleware';
// import Bcrypt from '../../middlewares/bcrypt.middleware';
// import IUser from '../../interfaces/user.interface';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'User',
  email: 'user@user.com',
  role: 'user',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

describe('/login', () => {
  describe('Sucesso - POST', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve fazer login com sucesso', async () => {
      const response = await chai.request(app).post('/login').send({ email: userMock.email, password: 'secret_user' });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });
  });
  describe('Falha - Email incorreto POST', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar erro caso o email seja inválido', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'invalid_email', password: 'secret_user' });
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message': 'Incorrect email or password' });
    });
  });
  describe('Falha - Senha incorreta POST', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar erro caso o email seja inválido', async () => {
      const response = await chai.request(app).post('/login').send({ email: userMock.email, password: '1234567' });
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message': 'Incorrect email or password' });
    });
  });
  describe('Falha - Email ou senha vazios POST', () => {
    it('Deve retornar erro caso o email esteja vazio', async () => {
      const response = await chai.request(app).post('/login').send({ password: '1234567' });
      expect(response.status).to.be.equal(400);
      chai.expect(response.body).to.deep.equal({ 'message': 'All fields must be filled' });
    });

    it('Deve retornar erro caso a senha esteja vazia', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'test' });
      expect(response.status).to.be.equal(400);
      chai.expect(response.body).to.deep.equal({ 'message': 'All fields must be filled' });
    });
  });
});
