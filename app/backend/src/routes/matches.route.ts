import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import createMatchValidation from '../middlewares/matchValidation.middleware';
import jsonwebtoken from '../middlewares/jwt.middleware';

const matchesRouter = Router();

matchesRouter.get(
  '/',
  MatchesController.findAll,
);
matchesRouter.post(
  '/',
  jsonwebtoken.isTokenValid,
  createMatchValidation.isCreateMatchBodyValid,
  createMatchValidation.isTeamsEqual,
  createMatchValidation.isTeamsValid,
  MatchesController.create,
);

matchesRouter.put(
  '/:id/finish',
  MatchesController.update,
);

export default matchesRouter;
