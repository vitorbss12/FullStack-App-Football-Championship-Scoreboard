import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

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

const invalidToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY2NDU0NTQ1NSwiZXhwIjoxNjY0NjMxODU1fQ.usmvvFr8Y50MkRzZcQCRGmi0gYvQJzPkV7Jgk-EKwrA';

describe('/login/validate', () => {
  describe('Sucesso - GET', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar a função do usuário corretamente', async () => {
      const responseLogin = await chai.request(app).post('/login').send({ email: userMock.email, password: 'secret_user' });
      const response = await chai.request(app).get('/login/validate').set('authorization', responseLogin.body.token);
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal({ 'role': userMock.role });
    });
  });
  describe('Falha - Token incorreto', () => {
    it('Deve retornar erro caso o email seja inválido', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', invalidToken);
      expect(response.status).to.be.equal(500);
      chai.expect(response.body).to.deep.equal({ 'message': 'invalid token' });
    });
  });
  describe('Falha - Token não informado', () => {
    it('Deve retornar erro caso o email seja inválido', async () => {
      const response = await chai.request(app).get('/login/validate');
      expect(response.status).to.be.equal(401);
      chai.expect(response.body).to.deep.equal({ 'message':'Token not provided' });
    });
  });
});
