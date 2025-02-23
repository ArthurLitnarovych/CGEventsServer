import { Inject, Injectable } from '@nestjs/common';
import { Event } from './models/event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { Op, WhereOptions } from 'sequelize';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @Inject('EVENTS_REPOSITORY')
    private eventRepository: typeof Event,
  ) {}

  toRad = (value: number) => (value * Math.PI) / 180;

  haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  async getSimilarEvents(
    location: { lat: number; lng: number },
    eventId: string,
  ): Promise<Event[]> {
    const allEvents = await this.eventRepository.findAll({
      where: {
        id: { [Op.ne]: eventId },
      },
    });

    const eventsWithDistance = allEvents
      .map((event) => {
        if (event.location && event.location.lat && event.location.lng) {
          const distance = this.haversineDistance(
            location.lat,
            location.lng,
            event.location.lat,
            event.location.lng,
          );
          return { event, distance };
        }
        return null;
      })
      .filter((item) => item !== null)
      .sort((a, b) => a.distance - b.distance);

    return eventsWithDistance.slice(0, 3).map((item) => item.event);
  }

  async findAll(dto: GetEventsDto): Promise<Event[]> {
    const { fromDate, endDate, categories } = dto;
    const query: WhereOptions<Event> = {};

    if (fromDate && endDate) {
      query.eventDate = { [Op.between]: [fromDate, endDate] };
    } else if (fromDate) {
      query.eventDate = { [Op.gte]: fromDate };
    } else if (endDate) {
      query.eventDate = { [Op.lte]: endDate };
    }

    if (categories) {
      query.category = { [Op.iLike]: `%${categories}` };
    }

    return await this.eventRepository.findAll({ where: query });
  }

  async create(eventData: CreateEventDto): Promise<Event> {
    return this.eventRepository.create(eventData);
  }

  async findOne(id: string): Promise<Event> {
    return this.eventRepository.findByPk(id);
  }

  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    const event = await this.findOne(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event.update(eventData);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    if (!event) {
      throw new Error('Event not found');
    }
    await event.destroy();
  }
}
