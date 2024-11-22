import { Controller, Get, Param } from '@nestjs/common';
import { Data, Event, events, IdGenerator } from 'core';

@Controller('events')
export class EventsController {
  @Get()
  async getEvents() {
    return events.map(this.serialize);
  }

  @Get(':idOrAlias')
  async getEvent(@Param('idOrAlias') idOrAlias: string) {
    // let event: Event;
    if (IdGenerator.validate(idOrAlias)) {
      //   event = await this.repo.buscarPorId(idOuAlias, true);
      return this.serialize(events.find((e) => e.id === idOrAlias));
    } else {
      //   event = await this.repo.buscarPorAlias(idOuAlias, true);
      return this.serialize(events.find((e) => e.alias === idOrAlias));
    }
    // return this.serializar(event);
  }

  private serialize(event: Event) {
    if (!event) return null;
    return { ...event, date: Data.format(event.date) };
  }

  private unserialize(event: any): Event {
    return { ...event, date: Data.unformat(event.date) };
  }
}
