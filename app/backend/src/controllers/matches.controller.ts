import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static findAll = async (_req: Request, res: Response) => {
    const matches = await MatchesService.findAll();

    return res.status(200).json(matches);
  };
}
