import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import HttpException from '../shared/http.exception';

export default class MatchesController {
  static findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const filter = inProgress === 'true' ? 1 : 0;
      const matches = await MatchesService.findAll(filter);
      return res.status(200).json(matches);
    }

    const matches = await MatchesService.findAll(null);

    return res.status(200).json(matches);
  };

  static create = async (req: Request, res: Response) => {
    const match = req.body;
    const createdMatch = await MatchesService.create(match);

    return res.status(201).json(createdMatch);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const match = await MatchesService.findByPk(Number(id));

    if (!match) {
      throw new HttpException(404, 'Match not found');
    }

    // console.log(match.inProgress);
    // if (match.inProgress) {
    //   throw new HttpException(400, 'Match already finished');
    // }

    await MatchesService.update(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}
