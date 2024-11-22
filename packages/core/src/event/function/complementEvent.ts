import { IdGenerator, Password } from "../../commons";
import Event from "../model/event";
import validateEvent from "./validateEvent";

export default function complementEvent(eventPartial: Partial<Event>): Event {
  const erros = validateEvent(eventPartial);

  if (erros.length) {
    throw new Error(erros.join("\n"));
  }

  const event: Event = {
    ...eventPartial,
    id: eventPartial.id ?? IdGenerator.newId(),
    password: eventPartial.password ?? Password.generate(20),
    publicAwaited: +(eventPartial.publicAwaited ?? 1),
  } as Event;

  return event;
}
