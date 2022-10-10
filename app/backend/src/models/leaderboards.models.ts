import { Sequelize, QueryTypes } from 'sequelize';
import * as config from '../database/config/database';
import ILeaderboard from '../interfaces/leaderboard.interface';
import homeTeamsQuery from './query/homeTeams';
import awayTeamsQuery from './query/awayTeams';
import fullTeamsQuery from './query/fullTeams';

const sequelize = new Sequelize(config);

export default class LeaderboardsModel {
  static async homeTeamsGetAll(): Promise<ILeaderboard[]> {
    return sequelize.query(
      homeTeamsQuery,
      {
        type: QueryTypes.SELECT,
      },
    );
  }

  static async awayTeamsGetAll(): Promise<ILeaderboard[]> {
    return sequelize.query(
      awayTeamsQuery,
      {
        type: QueryTypes.SELECT,
      },
    );
  }

  static async fullTeamsGetAll(): Promise<ILeaderboard[]> {
    return sequelize.query(
      fullTeamsQuery,
      {
        type: QueryTypes.SELECT,
      },
    );
  }
}
