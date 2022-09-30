import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRouter = Router();

teamsRouter.get(
  '/',
  TeamsController.findAll,
);

export default teamsRouter;
