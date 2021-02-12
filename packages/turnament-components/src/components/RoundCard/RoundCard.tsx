import React from 'react';
import { Match, Player, PlayerID } from 'turnament-scheduler';
import MatchCard from '../MatchCard';

type RoundCardProps = {
  roundID: number;
  matches: Match[];
  players: Record<PlayerID, Player>;
  onScoreChange: (matchToUpdate: Match) => void;
};

const RoundCard: React.FC<RoundCardProps> = ({ matches, onScoreChange }) => {
  const names = matches.map(({ pairing }: Match): [string, string] => [
    pairing[0] !== -1 ? String(pairing[0]) : 'BYE',
    pairing[1] !== -1 ? String(pairing[1]) : 'BYE',
  ]);

  return (
    <div>
      {matches.map((match, i) => (
        <MatchCard
          key={match.ID}
          match={match}
          names={names[i]}
          onScoreChange={onScoreChange}
        />
      ))}
    </div>
  );
};

export default RoundCard;
