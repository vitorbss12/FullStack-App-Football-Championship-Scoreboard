import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Internacional'
    }
  }
]

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
  // describe('Sucesso - GET - ById', () => {
  //   before(() => {
  //     sinon.stub(Teams, 'findByPk').resolves(teamMock as Teams);
  //   });

  //   after(() => {
  //     sinon.restore();
  //   });

  //   it('Deve retornar todas as equipes', async () => {
  //     const response = await chai.request(app).get('/teams/1');
  //     expect(response.status).to.be.equal(200);
  //     chai.expect(response.body).to.deep.equal(teamMock);
  //   });
  // });
  // describe('Falha - GET - ById - Id inválido', () => {
  //   before(() => {
  //     sinon.stub(Teams, 'findByPk').resolves(null);
  //   });

  //   after(() => {
  //     sinon.restore();
  //   });

  //   it('Deve retornar todas as equipes', async () => {
  //     const response = await chai.request(app).get('/teams/1');
  //     expect(response.status).to.be.equal(404);
  //     chai.expect(response.body).to.deep.equal({ message: 'Team not found' });
  //   });
  // });
});
