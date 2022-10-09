import { Sequelize, QueryTypes } from 'sequelize';
import * as config from '../database/config/database';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { IHomeTeamsLeaderboard } from '../interfaces/leaderboard.interface';
import homeTeamsQuery from './query/homeTeams';

const sequelize = new Sequelize(config);

export default class LeaderboardsModel {
  static async homeTeamsGetAll(): Promise<IHomeTeamsLeaderboard[]> {
    return sequelize.query(
      homeTeamsQuery,
      {
        type: QueryTypes.SELECT,
      },
    );
  }

  static async findAll(): Promise<Matches[]> {
    return Matches.findAll(
      {
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        include: [
          {
            model: Teams,
            as: 'teamHome',
            attributes: ['teamName'],
          },
          {
            model: Teams,
            as: 'teamAway',
            attributes: ['teamName'],
          },
        ],
      },
    );
  }
}

// const { QueryTypes } = require('sequelize');
// const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
