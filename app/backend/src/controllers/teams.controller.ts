import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  static findAll = async (_req: Request, res: Response) => {
    const team = await TeamsService.findAll();

    return res.status(200).json(team);
  };
}
