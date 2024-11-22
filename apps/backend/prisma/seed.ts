import { PrismaClient } from '@prisma/client';
import { events } from 'core';

async function seed() {
  const prisma = new PrismaClient();

  const transaction = events.map(async (event) => {
    await prisma.event.create({
      data: {
        id: event.id,
        alias: event.alias,
        password: event.password,
        name: event.name,
        date: event.date,
        local: event.local,
        description: event.description,
        image: event.image,
        imageBackground: event.imageBackground,
        publicAwaited: event.publicAwaited,
        guests: {
          create: event.guests.map((guest) => ({
            id: guest.id,
            name: guest.name,
            email: guest.email,
            confirmed: guest.confirmed,
            hasCompanions: guest.hasCompanions,
            numberCompanions: guest.numberCompanions,
          })),
        },
      },
    });
  });

  await Promise.all(transaction);
}
seed();
