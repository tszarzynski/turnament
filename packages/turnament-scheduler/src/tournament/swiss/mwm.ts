import mwm from 'edmonds-blossom';
import { GraphEdge, Pairing, Player } from '../../types';

export const transformMWMToPairings = (players: Player[]) => (
  mwm: number[]
) =>
  mwm.reduce<{ pairs: Pairing[]; paired: number[] }>(
    (acc, node, index) => {
      const { pairs, paired } = acc;
      const pair = [
        players[index].ID,
        node !== -1 ? players[node].ID : -1,
      ] as Pairing;

      return pair.some(id => paired.indexOf(id) !== -1)
        ? acc
        : { pairs: [...pairs, pair], paired: [...paired, ...pair] };
    },

    { pairs: [], paired: [] }
  ).pairs;

/**
 * Calculate MWM for given graph
 * @param graph
 */
export const calcMWMForGraph = (graph: GraphEdge[]) => mwm(graph);
