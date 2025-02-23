import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './models/event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto } from './dto/get-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: GetEventsDto): Promise<Event[]> {
    return this.eventsService.findAll(query);
  }

  @Post()
  async create(@Body() eventData: CreateEventDto): Promise<Event> {
    return this.eventsService.create(eventData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() eventData: Partial<Event>,
  ): Promise<Event> {
    return this.eventsService.update(id, eventData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }

  @Get(':eventId/similar')
  async getSimilarEvents(
    @Param('eventId') eventId: string,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ): Promise<Event[]> {
    const location = { lat, lng };
    return this.eventsService.getSimilarEvents(location, eventId);
  }
}
