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
  events,
  Guest,
  IdGenerator,
} from 'core';

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

  @Get('validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    const event = events.find((event) => event.alias === alias);
    return { valid: !event || event.id === id };
  }

  @Post('access')
  async accessEvento(@Body() data: { id: string; password: string }) {
    // const event = await this.repo.buscarPorId(dados.id);
    const event = events.find(
      (event) => event.id === event.id && event.password === event.password,
    );

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
    // const event = await this.repo.buscarPorAlias(alias);
    const event = events.find((event) => event.alias === alias);
    if (!event) {
      throw new HttpException('evento não encontrado.', 400);
    }

    const guestComplete = complementGuest(guest);
    event.guests.push(guestComplete);
    return this.serialize(event);
    // await this.repo.salvarConvidado(event, convidadoCompleto);
  }

  @Post()
  async saveEvent(@Body() event: Event) {
    // const eventRegistred = await this.repo.buscarPorAlias(event.alias);
    const eventRegistred = events.find(
      (ev) => ev.alias === event.alias || ev.id === event.id,
    );

    if (eventRegistred && eventRegistred.id !== event.id) {
      throw new HttpException('Já existe um evento com esse alias ou id.', 400);
    }

    const completeEvent = complementEvent(this.unserialize(event));
    events.push(completeEvent);
    this.serialize(completeEvent);

    // await this.repo.salvar(eventoCompleto);
  }

  private serialize(event: Event) {
    if (!event) return null;
    return { ...event, date: Data.format(event.date) };
  }

  private unserialize(event: any): Event {
    return { ...event, date: Data.unformat(event.date) };
  }
}
