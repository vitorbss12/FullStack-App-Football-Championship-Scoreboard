export interface MatchesUnFormatted {
  homeTeamGoals: number;
  awayTeamGoals: number;
  teamHome?: {
    teamName: string;
  },
  teamAway?: {
    teamName: string;
  }
}

export interface MatchesFormatted {
  teamGoals: number;
  opponentGoals: number;
}

export interface INewLeaderboard {
  teamName?: string;
  matches?: MatchesFormatted[];
}

export interface FinalLeaderboard {
  name?: string;
  totalPoints?: number;
  totalGames?: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses?: number;
  goalsFavor?: number;
  goalsOwn?: number;
  goalsBalance?: number;
  efficiency?: number;
}

export interface SortedFinalLeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default interface ILeaderboard {
  teamName?: string;
  matches?: {
    teamGoals: number;
    opponentGoals: number;
  }
  home?: string;
  teamHomeMatches?: {
    teamGoals: number;
    opponentGoals: number;
  },
  away?: string;
  teamAwayMatches?: {
    teamGoals: number;
    opponentGoals: number;
  },
}
