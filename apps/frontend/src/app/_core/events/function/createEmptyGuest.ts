import { IdGenerator } from "../../commons";
import Guest from "../model/guest";

export default function createEmptyGuest(): Partial<Guest> {
  return {
    id: IdGenerator.newId(),
    name: "",
    email: "",
    confirmed: true,
    hasCompanions: false,
    numberCompanions: 0,
  };
}
