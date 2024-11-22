import Guest from "../model/guest";
import validateGuest from "./validateGuest";

export default function complementGuest(guest: Partial<Guest>): Guest {
  const erros = validateGuest(guest);

  if (erros.length > 0) {
    throw new Error(erros.join("\n"));
  }

  const numberCompanions = guest.numberCompanions ?? 0;
  const hasCompanions =
    guest.hasCompanions && guest.confirmed && numberCompanions > 0;

  const guestUpdated = {
    ...guest,
    numberCompanions: hasCompanions ? numberCompanions : 0,
    hasCompanions: hasCompanions,
  };

  return guestUpdated as Guest;
}
