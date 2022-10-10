import LeaderboardsModel from '../models/leaderboards.models';
import ILeaderboard from '../interfaces/leaderboard.interface';

export default class LeaderboardsService {
  static calculateEfficiency(
    teams: ILeaderboard[],
  ): ILeaderboard[] {
    const homeTeamsLeaderboard = teams.map((team) => {
      const { totalPoints, totalGames } = team;
      return {
        ...team,
        efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
      };
    });
    return homeTeamsLeaderboard;
  }

  static async homeTeamsGetAll(): Promise<ILeaderboard[]> {
    const homeTeams = await LeaderboardsModel.homeTeamsGetAll();
    const finalHomeTeams = LeaderboardsService.calculateEfficiency(homeTeams);
    return finalHomeTeams;
  }

  static async awayTeamsGetAll(): Promise<ILeaderboard[]> {
    const awayTeams = await LeaderboardsModel.awayTeamsGetAll();
    const finalAwayTeams = LeaderboardsService.calculateEfficiency(awayTeams);
    return finalAwayTeams;
  }

  static async fullTeamsGetAll(): Promise<ILeaderboard[]> {
    const fullTeams = await LeaderboardsModel.fullTeamsGetAll();
    const finalFullTeams = LeaderboardsService.calculateEfficiency(fullTeams);
    return finalFullTeams;
  }
}
