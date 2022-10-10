import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import HttpException from '../shared/http.exception';

export default class TeamsController {
  static findAll = async (_req: Request, res: Response) => {
    const team = await TeamsService.findAll();

    return res.status(200).json(team);
  };

  static findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await TeamsService.findByPk(Number(id));

    if (!team) {
      throw new HttpException(404, 'Team not found');
    }

    return res.status(200).json(team);
  };
}
