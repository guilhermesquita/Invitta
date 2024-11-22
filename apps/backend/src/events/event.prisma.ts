import { Injectable } from '@nestjs/common';
import { Event, Guest } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class EventPrisma {
  constructor(readonly prisma: PrismaProvider) {}

  saveEvent(event: Event) {
    return this.prisma.event.create({
      data: {
        ...(event as any),
        guests: { create: event.guests },
      },
    });
  }

  saveGuest(event: Event, guest: Guest) {
    return this.prisma.guest.create({
      data: {
        ...guest,
        numberCompanions: +(guest.numberCompanions ?? 0),
        event: { connect: { id: event.id } },
      },
    });
  }

  async getEvents(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: { guests: true },
    }) as any;
  }

  async getById(id: string, complete: boolean = false): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
      include: { guests: complete },
    }) as any;
  }

  async getByAlias(
    alias: string,
    complete: boolean = false,
  ): Promise<Event | null> {
    return this.prisma.event.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
        local: true,
        image: true,
        imageBackground: true,
        alias: true,
        password: complete,
        publicAwaited: complete,
        guests: complete,
      },
      where: { alias },
    }) as any;
  }
}
