import { SchedulerType, Scheduler } from './types';

import { scheduler as SwissScheduler } from './tournament/swiss';
import { scheduler as RoundRobinScheduler } from './tournament/roundrobin';
export { getRanking } from './rank';
export * from './types';

export function getSchedulerByType(type: SchedulerType) {
  switch (type) {
    case 'ROUND_ROBIN':
      return RoundRobinScheduler;
    case 'SWISS':
      return SwissScheduler;
  }
}

const implementedSchedulers: SchedulerType[] = ['ROUND_ROBIN', 'SWISS'];

export function getSchedulerTypesAsList() {
  return implementedSchedulers;
}
