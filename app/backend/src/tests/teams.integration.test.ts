import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    id: 1,
    teamName: 'Team 1',
  },
  {
    id: 2,
    teamName: 'Team 2',
  },
]

describe('/teams', () => {
  describe('Sucesso - GET', () => {
    before(() => {
      sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar todas as equipes', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
      chai.expect(response.body).to.deep.equal(teamsMock);
    });
  });
});
