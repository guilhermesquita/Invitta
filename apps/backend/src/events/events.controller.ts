import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import {
  complementEvent,
  complementGuest,
  Data,
  Event,
  Guest,
  IdGenerator,
} from 'core';
import { EventPrisma } from './event.prisma';

@Controller('events')
export class EventsController {
  constructor(readonly repo: EventPrisma) {}
  @Get()
  async getEvents() {
    const events = await this.repo.getEvents();
    return events.map(this.serialize);
  }

  @Get(':idOrAlias')
  async getEvent(@Param('idOrAlias') idOrAlias: string) {
    let event: Event;
    if (IdGenerator.validate(idOrAlias)) {
      event = await this.repo.getById(idOrAlias, true);
    } else {
      event = await this.repo.getByAlias(idOrAlias, true);
    }
    return this.serialize(event);
  }

  @Get('validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    const event = await this.repo.getByAlias(alias);
    return { valid: !event || event.id === id };
  }

  @Post('access')
  async accessEvento(@Body() data: { id: string; password: string }) {
    const event = await this.repo.getById(data.id);

    if (!event) {
      throw new HttpException('Evento não encontrado.', 400);
    }

    if (event.password !== data.password) {
      throw new HttpException('Senha não corresponde ao evento.', 400);
    }

    return this.serialize(event);
  }

  @Post(':alias/guest')
  async saveGuest(@Param('alias') alias: string, @Body() guest: Guest) {
    const event = await this.repo.getByAlias(alias);
    if (!event) {
      throw new HttpException('evento não encontrado.', 400);
    }

    const guestComplete = complementGuest(guest);
    await this.repo.saveGuest(event, guestComplete);
  }

  @Post()
  async saveEvent(@Body() event: Event) {
    const eventRegistred = await this.repo.getByAlias(event.alias);

    if (eventRegistred && eventRegistred.id !== event.id) {
      throw new HttpException('Já existe um evento com esse alias ou id.', 400);
    }

    const completeEvent = complementEvent(this.unserialize(event));
    await this.repo.saveEvent(completeEvent);
  }

  private serialize(event: Event) {
    if (!event) return null;
    return { ...event, date: Data.format(event.date) };
  }

  private unserialize(event: any): Event {
    return { ...event, date: Data.unformat(event.date) } as Event;
  }
}
