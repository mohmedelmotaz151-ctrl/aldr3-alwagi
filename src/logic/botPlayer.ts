import { Player, Token } from '../types/game';
import { LudoEngine } from './ludoEngine';

export class BotAI {
  static selectMove(player: Player, diceValue: number): number | null {
    const moveableTokens = player.tokens
      .map((t, idx) => ({ t, idx }))
      .filter(({ t }) => LudoEngine.canMoveToken(t, diceValue));

    if (moveableTokens.length === 0) return null;

    // Priority:
    // 1. Move to home (win)
    // 2. Kill an opponent
    // 3. Move token out of base
    // 4. Move token closest to home
    // 5. Random

    // 1. Check for win
    const winMove = moveableTokens.find(({ t }) => {
      const next = LudoEngine.getNextPosition(t, diceValue, player.color);
      return next.status === 'home';
    });
    if (winMove) return winMove.idx;

    // 2. Check for kill (Simplified: just check if next pos is same as any opponent)
    // Needs access to full board, skipping for now and doing basic logic

    // 3. Move token out of base
    const baseMove = moveableTokens.find(({ t }) => t.status === 'base');
    if (baseMove) return baseMove.idx;

    // 4. Furthest token (closest to home)
    return moveableTokens.sort((a, b) => {
      const scoreA = this.getHeuristicScore(a.t);
      const scoreB = this.getHeuristicScore(b.t);
      return scoreB - scoreA;
    })[0].idx;
  }

  private static getHeuristicScore(token: Token): number {
    if (token.status === 'home') return 1000;
    if (token.status === 'home-stretch') return 500 + token.pos * 10;
    if (token.status === 'path') return 100 + token.pos; // Approximate
    return 0;
  }
}
