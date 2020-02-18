import { scheduler as AmalfiScheduler } from './tournament/amalfi';
import { scheduler as EliminationScheduler } from './tournament/elimination';
import { scheduler as RoundRobinScheduler } from './tournament/roundrobin';
import { scheduler as SwissScheduler } from './tournament/swiss';
import { SchedulerType } from './types';

export { getRanking } from './rank';
export * from './types';

export function getSchedulerByType(type: SchedulerType) {
  switch (type) {
    case 'ROUND_ROBIN':
      return RoundRobinScheduler;
    case 'SWISS':
      return SwissScheduler;
    case 'ELIMINATION':
      return EliminationScheduler;
    case 'AMALFI':
      return AmalfiScheduler;
  }
}

const implementedSchedulers: SchedulerType[] = [
  'ROUND_ROBIN',
  'SWISS',
  'ELIMINATION',
];

export function getSchedulerTypesAsList() {
  return implementedSchedulers;
}
