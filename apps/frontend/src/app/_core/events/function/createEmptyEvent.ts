import { Event } from "..";
import { IdGenerator } from "../../commons";

export const createEmptyEvent = (): Partial<Event> => {
  return {
    id: IdGenerator.newId(),
    name: "",
    description: "",
    date: new Date(),
    local: "",
    publicAwaited: 1,
    image: "",
    imageBackground: "",
  };
};
