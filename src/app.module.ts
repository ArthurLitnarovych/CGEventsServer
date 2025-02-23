import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EventsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
