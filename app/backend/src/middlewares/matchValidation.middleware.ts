import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';
import HttpException from '../shared/http.exception';
import createMatchSchema from './schemas/createMach.schema';

export default class createMatchValidation {
  static isCreateMatchBodyValid = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const match = req.body;
    const { error } = createMatchSchema.validate({ ...match });

    if (error) {
      const [errorCode, errorMessage] = error.details[0].message.split('|');
      throw new HttpException(Number(errorCode), errorMessage);
    }

    return next();
  };

  static isTeamsEqual = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }

    return next();
  };

  static isTeamsValid = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { homeTeam, awayTeam } = req.body;

    const homeTeamFound = await TeamsService.findByPk(homeTeam);
    const awayTeamFound = await TeamsService.findByPk(awayTeam);

    if (!homeTeamFound || !awayTeamFound) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    return next();
  };
}
