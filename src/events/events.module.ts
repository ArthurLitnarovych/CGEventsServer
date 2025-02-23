import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/database.module';
import { eventsProviders } from './models/events.providers';

@Module({
  imports: [DatabaseModule],
  providers: [EventsService, ...eventsProviders],
  controllers: [EventsController],
})
export class EventsModule {}
