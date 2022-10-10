import { Sequelize } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LeaderboardsModel, { sequelize } from '../models/leaderboards.models';
import ILeaderboard from '../interfaces/leaderboard.interface';
import {
  homeLeaderBoardMock,
  homeLeaderBoardWithEfficiencyMock,
  awayLeaderBoardMock,
  awayLeaderBoardWithEfficiencyMock,
  fullLeaderBoardMock,
  fullLeaderBoardWithEfficiencyMock,
} from './mocks/leaderboards.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard', () => {
  describe('Sucesso - GET /home - Informações dos times da casa', () => {
    before(() => {
        const sequelizeStub = sinon.stub(sequelize, 'query') as sinon.SinonStub;
        sequelizeStub.resolves(homeLeaderBoardMock as unknown as ILeaderboard[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as informações dos times da casa', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(homeLeaderBoardWithEfficiencyMock);
    });
  });

  describe('Sucesso - GET /away - Informações dos times de fora', () => {
    before(() => {
      const sequelizeStub = sinon.stub(sequelize, 'query') as sinon.SinonStub;
      sequelizeStub.resolves(awayLeaderBoardMock as unknown as ILeaderboard[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as informações dos times de fora', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(awayLeaderBoardWithEfficiencyMock);
    });
  });

  describe('Sucesso - GET / - Informações totais dos times', () => {
    before(() => {
      const sequelizeStub = sinon.stub(sequelize, 'query') as sinon.SinonStub;
      sequelizeStub.resolves(fullLeaderBoardMock as unknown as ILeaderboard[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as informações dos times no campeonato', async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(fullLeaderBoardWithEfficiencyMock);
    });
  });
});
