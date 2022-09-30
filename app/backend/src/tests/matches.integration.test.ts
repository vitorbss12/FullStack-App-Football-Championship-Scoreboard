import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import MatchModel from '../models/matches.models';
import { matchesMock, notInProgressMatchesMock, inProgressMatchesMock } from './mocks/matches.mock';

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

    it('Deve retornar todas as partidas', async () => {
      const response = await chai.request(app).get('/matches').query({ inProgress: true });
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
  
      it('Deve retornar todas as partidas', async () => {
        const response = await chai.request(app).get('/matches').query({ inProgress: false });
        expect(response.status).to.be.equal(200);
        chai.expect(response.body).to.deep.equal(notInProgressMatchesMock);
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
