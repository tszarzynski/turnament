# Tournament Logic Reference

This document describes the pairing and ranking logic implemented across the `turnament-scheduler` and `turnament-ranking` packages. It covers all four tournament formats, both supported sports, and every tiebreaker. Refer here when discussing or modifying tournament behaviour.

---

## Package Architecture

```
turnament-scheduler          turnament-ranking
────────────────────         ─────────────────────────
Pairing only                 Ranking + scoring rules
  Player, Match types          SportType, Stats types
  makePlayersWithResults       makePlayersWithStats
  4 format schedulers          omv, buchholz, nps
  bye nomination               getRanking
  sort utilities               isMatchCompleted
        ↑                      getDefaultMatchConfig
        └──── imported by ─────────────────────────────┐
                                                        │
                                               turnament-web
                                               (UI + store only,
                                                no domain logic)
```

The scheduler knows nothing about sports or scoring. The ranking package imports types from the scheduler and adds all sport-aware logic.

---

## Core Data Types

```
Player
  ID: number
  name: string
  active: boolean
  seed?: number

Match
  ID: string (UUID)
  roundID: number
  pairing: [PlayerID, PlayerID]   ← BYE_ID (-1) for walkovers
  result: [number, number]        ← raw stored scores
  hasBye: boolean

PlayerWithResults extends Player with:
  gamesWon: number       ← cumulative raw score (may be doubled for chess)
  matchesWon: number
  matchesLost: number    ← byes do NOT count as losses
  opponents: PlayerID[]  ← BYE_ID (-1) included for bye rounds

PlayerWithStats extends PlayerWithResults with:
  omv: number
  buchholzCut1: number
  nps: number
  sonnebornBerger: number
```

---

## Chess Score Encoding

Chess scores are stored as **doubled integers** to avoid floating point:

| Real score | Stored value |
|---|---|
| 0 (loss) | 0 |
| 0.5 (draw) | 1 |
| 1 (win) | 2 |
| 1.5 | 3 |
| 2.0 | 4 |

A completed Best-of-4 match where player A wins 2.5–1.5 is stored as `result: [5, 3]`.

The `scoringDivisor` (`2` for chess, `1` for backgammon) is applied at display time and when computing NPS. The scheduler never sees it — all raw values flow through unchanged.

---

## Match Completion

```
Backgammon: result.some(score => score >= minPointsToWin)
            ↑ "reach or exceed" because the doubling cube can overshoot

Chess:      result[0] + result[1] === minPointsToWin * 2
            ↑ every game distributes exactly 2 raw points (2+0 or 1+1)
            ↑ so sum equals totalGames * 2 when all games are played
```

**Default match config:**

| Sport | Format | Default |
|---|---|---|
| Backgammon | Any | 5 points to win |
| Chess | Elimination | Best of 2 |
| Chess | Swiss / Round Robin / Amalfi | Best of 1 |

---

## Pairing Formats

### Round Robin

Every player plays every other player exactly once.

**Rounds needed:** `n − 1` (even players) or `n` (odd players)

**Total matches:** `n × (n − 1) / 2`

**Algorithm — circle/shift method:**

```
Players fixed in a circle. Player at position 0 stays fixed.
Each round, all other positions rotate by 1.

Round 1:  [P1, P2, P3, P4, P5, P6]
           ↓ fold in half and pair opposites
          (P1,P6), (P2,P5), (P3,P4)

Round 2:  [P1, P6, P2, P3, P4, P5]  ← rotate by 1
          (P1,P5), (P6,P4), (P2,P3)

...and so on
```

If the player count is odd, a `BYE` slot is added before rotation. The player paired with BYE receives a walkover win.

---

### Swiss

Players play a fixed number of rounds against opponents of similar current standing. Nobody is eliminated.

**Rounds needed:** `⌈log₂(n)⌉` (approximately — formula: `⌈log₂(n) + log₂(1)⌉`)

**Algorithm — Maximum Weighted Matching (Edmonds-Blossom):**

The pairing is a graph optimisation problem. Every possible pair of players is an edge with a weight:

```
weight = quality(importance, closeness)
       = (importance + 1)² × (closeness + 1)²

importance = max(player1.gamesWon, player2.gamesWon)
             ↑ prioritises high-scoring matches

closeness  = highestScore − |player1.gamesWon − player2.gamesWon|
             ↑ prefers pairs close in standing

bonus: if players have faced each other less than they've faced others,
       add quality(highestScore, highestScore) + 1
       ↑ avoids rematches
```

The Edmonds-Blossom algorithm finds the set of pairings that **maximises the total weight** across all pairs simultaneously. This guarantees globally optimal pairings — not just locally good ones.

**Bye nomination:** When player count is odd, the weakest player (lowest standing, fewest prior byes) receives the bye.

---

### Amalfi

A Swiss variant using offset-based pairing instead of graph optimisation. Provides more schedule diversity at the cost of some pairing precision.

**Rounds needed:** `⌈log₂(n) + 1⌉`

**Algorithm — offset pairing:**

```
1. Sort players by standing (matchesWon desc, gamesWon desc)
2. Calculate offset = roundsNeeded − roundsPlayed
   ↑ starts large, shrinks each round
3. Pair player[i] with player[i + offset]

Round 1 (8 players, offset=4):  (1st, 5th), (2nd, 6th), (3rd, 7th), (4th, 8th)
Round 2 (offset=3):              (1st, 4th), (2nd, 5th), (3rd, 6th)
Round 3 (offset=2):              (1st, 3rd), (2nd, 4th)
...
```

This creates a funnel: early rounds pair players far apart in standings, later rounds pair top against top. If player count is odd, the first player in the sorted list receives the bye.

---

### Elimination (Double Elimination)

Players are progressively eliminated. A player with 2 losses is out.

**Rounds needed:** `⌈log₂(n)⌉ + ⌈log₂(log₂(n))⌉ + 1`

**Total matches:** `n × 2 − 2`

**Structure — two brackets:**

```
         Upper Bracket (0 losses)
         ┌────────────────────────┐
 Start → │  P1  P2  P3  P4  ...  │ → Winners advance
         │  ↓   ↓   ↓   ↓       │
         │  lose? drop to lower  │
         └────────────────────────┘
                   ↓
         Lower Bracket (1 loss)
         ┌────────────────────────┐
         │  dropped players       │ → Winners survive
         │                        │ → Losers eliminated
         └────────────────────────┘
                   ↓
              Grand Final
         Upper winner vs Lower winner
```

**First-round byes:** If the player count is not a power of 2, the top `nextPow2(n) − n` players receive first-round byes (enter in round 2). Example: 6 players → next power of 2 is 8 → 2 byes awarded to the two top seeds.

**Lower bracket sorting:** Players are sorted by number of matches played (`opponents.length`) to ensure players who dropped earlier face those with similar experience.

**Elimination trigger:** After each round, any player with `matchesLost > 1` is deactivated and removed from future pairings.

**Dynamic pairing model (not a fixed bracket):** Unlike a standard double-elimination bracket where both brackets run in lockstep every round, this implementation generates pairings dynamically each round based on current player state. Players play as soon as they are available — there is no pre-drawn bracket and no dedicated Grand Finals round. The Grand Finals match emerges naturally when exactly one upper-bracket and one lower-bracket player remain. This compresses the schedule: e.g. 16 players finish in 7 rounds rather than the 8–9 a fixed bracket requires. The formula `⌈log₂(n)⌉ + ⌈log₂(log₂(n))⌉ + 1` reflects this compressed schedule. A Grand Finals reset round is not supported.

---

## Format Comparison

```
                  Round Robin   Swiss      Amalfi     Elimination
──────────────────────────────────────────────────────────────────
Rounds            n−1           ~log₂(n)   log₂(n)+1  ⌈log₂(n)⌉+⌈log₂(log₂(n))⌉+1
Elimination?      No            No         No         Yes (2 losses)
Rematches?        No            Avoided    Possible   Unlikely
Pairing quality   Exact         Optimal    Good       Bracket-based
Best for          Small groups  Any size   Any size   Knockout events
Bye handling      Rotation      Weakest    First      Top seeds
```

---

## Ranking

Rankings are computed by `getRanking(players, matches, sportType, scoringDivisor, schedulerType)` in `turnament-ranking`. The sort order depends on **both** the sport and the tournament format.

### Ranking by format and sport

| Format | Chess | Backgammon |
|---|---|---|
| Swiss | `gamesWon → buchholzCut1 → matchesWon` | `matchesWon → nps → gamesWon` |
| Amalfi | same as Swiss | same as Swiss |
| Round Robin | `gamesWon → sonnebornBerger → matchesWon` | `matchesWon → nps → gamesWon` |
| Elimination | `matchesWon → matchesLost↑ → gamesWon` | `matchesWon → matchesLost↑ → gamesWon` |

**Why chess and backgammon differ (Swiss/Amalfi/Round Robin):** In backgammon, the match win is the primary unit — you either win or lose the match. In chess, fractional points from draws mean raw score (`gamesWon`) is more granular and is the primary sort key.

**Why Buchholz is used for Swiss/Amalfi but not Round Robin:** Buchholz sums all opponents' final scores. In Swiss/Amalfi, different players with the same score will have faced opponents of different strength (depending on their bracket path), so Buchholz meaningfully differentiates them. In a balanced round robin, every player faces every other player — so each player's Buchholz equals (total tournament points) − (own score), which is identical for all tied players. Buchholz cannot break any tie in round robin.

**Why Sonneborn-Berger is used for Round Robin chess:** Unlike Buchholz, SB weights by your individual result against each opponent (win = full opponent score, draw = half, loss = 0). Beating a stronger opponent is worth more than drawing against them. This does differentiate tied players in round robin.

**Why Elimination uses a different sort entirely:** The bracket position determines ranking — most wins and fewest losses reflect progress through the bracket. Buchholz and Sonneborn-Berger are not meaningful here: players don't play balanced schedules, and ranking beyond 2nd place is inherently non-deterministic from the bracket structure alone.

**Known limitation — bye inflation in Elimination:** Top seeds in non-power-of-2 fields receive first-round byes, which increment `matchesWon` without a real opponent. Two players with the same real bracket depth may differ in `matchesWon` if one received a bye. `gamesWon` as the third criterion partially compensates (a bye contributes 0 to `gamesWon`).

---

## Tiebreakers

### OMV — Opponent Match Value

Measures the strength of your schedule by looking at how well your opponents did.

```
OMV(player) = average of (matchesWon / (matchesWon + matchesLost))
              across all opponents faced, excluding byes

Example:
  You faced Player A (3 wins, 1 loss) and Player B (1 win, 3 losses)
  OMV = (3/4 + 1/4) / 2 = 0.5
```

Higher OMV = you played stronger opponents = your record is more impressive.

Used in backgammon as a tertiary fallback within `gamesWon` (not directly in the sort order but available on `PlayerWithStats`).

---

### Buchholz Cut-1 (BH-C1)

FIDE standard chess tiebreaker. Similar concept to OMV but uses absolute match wins rather than ratios, and drops the weakest opponent to reduce the impact of one bad draw.

```
BH-C1(player) = sum of opponents' matchesWon
                excluding byes
                minus the single lowest opponent score

Example:
  Opponents: Player A (3 wins), Player B (2 wins), Player C (0 wins)
  BH-C1 = (3 + 2 + 0) − 0 = 5
           ↑ drop the lowest (0)
```

Higher BH-C1 = you played stronger opponents.

---

### NPS — Net Point Spread

Measures your own performance, not your opponents'.

```
NPS(player) = Σ (pointsScored − pointsConceded) per match
              ÷ scoringDivisor
              excluding bye matches

Backgammon example (5-point match):
  Match 1: won 5–2  → +3
  Match 2: won 5–4  → +1
  Match 3: lost 3–5 → −2
  NPS = +2

Chess example (Best of 4, scoringDivisor=2):
  Match 1: won 3–1 (stored as [6,2]) → raw spread 4 ÷ 2 = +2.0 pts
  Match 2: drew 2–2 (stored as [4,4]) → raw spread 0 ÷ 2 = 0.0 pts
  NPS = +2.0
```

Positive NPS = you outscored opponents on average. Used as backgammon's secondary tiebreaker because a 5–0 win (NPS +5) is more dominant than a 5–4 win (NPS +1), even though both count as one match win.

---

### Sonneborn-Berger (SB)

FIDE standard tiebreaker for round-robin chess tournaments. Unlike Buchholz (which sums raw opponent scores regardless of your result), SB weights by your individual result against each opponent.

```
SB(player) = Σ (opponent's final gamesWon × result factor)
             for each non-bye match
             where result factor: win=1.0, draw=0.5, loss=0.0

Chess encoding note: raw result values are 2 (win), 1 (draw), 0 (loss).
Dividing by scoringDivisor (2) gives the standard 1.0/0.5/0.0 factor.

Example (4-player round robin, all games played):
  You beat Player A (finished with 6 pts) → 6 × 1.0 = 6
  You drew Player B (finished with 4 pts) → 4 × 0.5 = 2
  You lost to Player C (finished with 7 pts) → 7 × 0.0 = 0
  SB = 8
```

Higher SB = you beat/drew stronger opponents. Effective as a round-robin tiebreaker where Buchholz collapses to a constant for all tied players.

---

## Header Stats

The tournament progress header shows three stat columns:

| Column | Formula | Notes |
|---|---|---|
| Rounds | `played / needed` | `roundsNeeded(n)` per format |
| Matches | `played / needed` | Exact for Elimination and Round Robin; approximation for Swiss/Amalfi |
| Games | `played / min` or `played / min–max` | Chess: always exact (no range); Backgammon: range from min-score win to max-score win |

**Min games:** `minMatches × minPointsToWin`
**Max games (backgammon only):** `minMatches × (minPointsToWin × 2 − 1)`
  — the `2n−1` formula represents both players trading points until the last possible game

**Games played:** `sum(result[0] + result[1]) / scoringDivisor` across all non-bye matches

---

## Key Files

| Concern | File |
|---|---|
| Core types (Player, Match, Results) | `turnament-scheduler/src/types.ts` |
| Results computation | `turnament-scheduler/src/players.ts` |
| Swiss pairing | `turnament-scheduler/src/tournament/swiss/` |
| Amalfi pairing | `turnament-scheduler/src/tournament/amalfi/` |
| Round Robin pairing | `turnament-scheduler/src/tournament/roundrobin/` |
| Elimination pairing | `turnament-scheduler/src/tournament/elimination/` |
| Bye nomination | `turnament-scheduler/src/bye.ts` |
| Sport types, Stats, PlayerWithStats | `turnament-ranking/src/types.ts` |
| Scoring rules (completion, divisor, defaults) | `turnament-ranking/src/scoring.ts` |
| OMV calculation | `turnament-ranking/src/omv.ts` |
| Buchholz Cut-1 calculation | `turnament-ranking/src/buchholz.ts` |
| Net Point Spread calculation | `turnament-ranking/src/nps.ts` |
| Sonneborn-Berger calculation | `turnament-ranking/src/sonnebornBerger.ts` |
| Ranking sort orders | `turnament-ranking/src/rank.ts` |
| Store selectors (rounds, matches, games) | `turnament-web/src/features/round/roundsSlice.ts` |
