import LeaderboardsModel from '../models/leaderboards.models';
import ILeaderboard,
{
  MatchesUnFormatted,
  MatchesFormatted,
  INewLeaderboard,
  FinalLeaderboard,
  SortedFinalLeaderboard,
  IHomeTeamsLeaderboard,
}
  from '../interfaces/leaderboard.interface';

export default class LeaderboardsService {
  static calculateEfficiency(
    teams: IHomeTeamsLeaderboard[],
  ): IHomeTeamsLeaderboard[] {
    const homeTeamsLeaderboard = teams.map((team) => {
      const { totalPoints, totalGames } = team;
      return {
        ...team,
        efficiency: (totalPoints && totalGames)
          ? Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)) : 0,
      };
    });
    return homeTeamsLeaderboard;
  }

  static async homeTeamsGetAll(): Promise<IHomeTeamsLeaderboard[]> {
    const homeTeams = await LeaderboardsModel.homeTeamsGetAll();
    const finalHomeTeams = LeaderboardsService.calculateEfficiency(homeTeams);
    return finalHomeTeams;
  }

  static async awayTeamsGetAll(): Promise<IHomeTeamsLeaderboard[]> {
    const awayTeams = await LeaderboardsModel.awayTeamsGetAll();
    const finalAwayTeams = LeaderboardsService.calculateEfficiency(awayTeams);
    return finalAwayTeams;
  }

  static removeDuplicates(matches: SortedFinalLeaderboard[]): SortedFinalLeaderboard[] {
    const array: SortedFinalLeaderboard[] = [];
    matches.forEach((match) => {
      if (!array.find((item) => item.name === match.name)) {
        array.push(match);
      }
    });
    // return LeaderboardsService.sortTeamsByVictory(array);
    return LeaderboardsService.sortTeamsByVictory(array);
  }

  static sortTeamsGoalsOwn(teams: SortedFinalLeaderboard[]): SortedFinalLeaderboard[] {
    const sortedTeams = teams.sort((a, b) => {
      if (
        a.totalPoints === b.totalPoints
        && a.goalsBalance === b.goalsBalance
        && a.goalsFavor === b.goalsFavor
      ) {
        return b.goalsOwn - a.goalsOwn;
      }
      return 0;
    });
    return sortedTeams;
  }

  static sortTeamsGoalsFavor(teams: SortedFinalLeaderboard[]): SortedFinalLeaderboard[] {
    const sortedTeams = teams.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
        return b.goalsFavor - a.goalsFavor;
      }
      return 0;
    });
    return LeaderboardsService.sortTeamsGoalsOwn(sortedTeams);
  }

  static sortTeamsGoalsBalance(teams: SortedFinalLeaderboard[]): SortedFinalLeaderboard[] {
    const sortedTeams = teams.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        return b.goalsBalance - a.goalsBalance;
      }
      return 0;
    });
    return LeaderboardsService.sortTeamsGoalsFavor(sortedTeams);
  }

  // const sortedTeams = teams.sort((a, b) => {
  //   if (a.totalVictories > b.totalVictories) return -1;
  //   if (a.totalVictories < b.totalVictories) return 1;
  //   return 0;
  // });

  static sortTeamsByVictory(teams: SortedFinalLeaderboard[]): SortedFinalLeaderboard[] {
    // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
    const sorted = teams.sort((a, b) => b.totalPoints - a.totalPoints);
    return LeaderboardsService.sortTeamsGoalsBalance(sorted);
  }

  static FinalLeaderboard(teams: FinalLeaderboard[]): SortedFinalLeaderboard[] {
    const finalInfo = teams.map((team) => {
      const { totalPoints, totalGames, goalsFavor, goalsOwn } = team;
      return {
        ...team,
        goalsBalance: (goalsFavor && goalsOwn) ? goalsFavor - goalsOwn : 0,
        efficiency: (totalPoints && totalGames)
          ? Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)) : 0,
      };
    });
    return LeaderboardsService.removeDuplicates(finalInfo as SortedFinalLeaderboard[]);
  }

  static TeamsPoints(team: FinalLeaderboard[]) : SortedFinalLeaderboard[] {
    const infoWithPoints = team.map((tm) => {
      const {
        name, totalVictories, totalDraws,
      } = tm;
      return {
        name,
        totalPoints: (totalVictories * 3) + totalDraws,
        ...tm,
      };
    });
    return LeaderboardsService.FinalLeaderboard(infoWithPoints);
  }

  static TeamsInfo(teams: INewLeaderboard[]): FinalLeaderboard[] {
    const info = teams.map((team) => {
      const { teamName, matches } = team;

      return {
        name: teamName,
        totalGames: matches ? matches.length : 0,
        totalVictories: matches
          ? matches.filter((match) => match.teamGoals > match.opponentGoals).length : 0,
        totalDraws: matches
          ? matches.filter((match) => match.teamGoals === match.opponentGoals).length : 0,
        totalLosses: matches
          ? matches.filter((match) => match.teamGoals < match.opponentGoals).length : 0,
        goalsFavor: matches
          ? matches.reduce((acc, match) => acc + match.teamGoals, 0) : 0,
        goalsOwn: matches
          ? matches.reduce((acc, match) => acc + match.opponentGoals, 0) : 0,
      };
    });
    return LeaderboardsService.TeamsPoints(info);
  }

  static groupTeams(matchs: ILeaderboard[]): FinalLeaderboard[] {
    const array: INewLeaderboard[] = [];
    matchs.forEach((match) => {
      const { teamName } = match;
      const m: MatchesFormatted[] = [];
      matchs.forEach((tm) => {
        if (tm.teamName === teamName && tm.matches) {
          m.push(tm.matches);
        }
      });
      array.push({ teamName, matches: m });
    });
    return LeaderboardsService.TeamsInfo(array);
  }

  static AllTeams(matches: ILeaderboard[]): FinalLeaderboard[] {
    const array: ILeaderboard[] = [];
    matches.forEach((match) => {
      const { home, teamHomeMatches, away, teamAwayMatches } = match;
      array.push({
        teamName: home,
        matches: teamHomeMatches,
      });
      array.push({
        teamName: away,
        matches: teamAwayMatches,
      });
    });
    return LeaderboardsService.groupTeams(array);
  }

  static Teams(matches: MatchesUnFormatted[]): FinalLeaderboard[] {
    const test = matches.map((match) => {
      const { homeTeamGoals, awayTeamGoals, teamHome, teamAway } = match;
      return {
        home: teamHome ? teamHome.teamName : '',
        teamHomeMatches: {
          teamGoals: homeTeamGoals,
          opponentGoals: awayTeamGoals,
        },
        away: teamAway ? teamAway.teamName : '',
        teamAwayMatches: {
          teamGoals: awayTeamGoals,
          opponentGoals: homeTeamGoals,
        },
      };
    });
    return LeaderboardsService.AllTeams(test);
  }

  static async getTeamsInfo(): Promise<FinalLeaderboard[]> {
    const matches = await LeaderboardsModel.findAll();
    const allTeamsInfo = LeaderboardsService.Teams(matches);
    return allTeamsInfo;
  }
}
