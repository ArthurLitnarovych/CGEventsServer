import { Event } from './event.model';

export const eventsProviders = [
  {
    provide: 'EVENTS_REPOSITORY',
    useValue: Event,
  },
];
