"use client";

import { Event, Guest } from "@/app/_core";
import { events } from "@/app/_core/constants";
import DashboardEvento from "../../_component/DashboardEvent";
import FormPasswordEvent from "../../_component/FormPasswordEvent";
import { use, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminPageEvent = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = use(props.params);

  const id = params.all[0];
  const [event, setEvent] = useState<Event | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, _setPassword] = useState<string | null>(
    params.all[1] ?? null
  );

  const presents = event?.guest.filter((g) => g.confirmed) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notPresents = event?.guest.filter((g) => !g.confirmed) ?? [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const total =
    presents?.reduce((total: number, guest: Guest) => {
      return total + guest.numberCompanions + 1;
    }, 0) ?? 0;

  function loadEvent() {
    const event = events.find((ev) => ev.id === id && ev.password === password);
    setEvent(event ?? null);
  }

  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password]);

  return (
    <div className="flex flex-col items-center">
      {event ? (
        <DashboardEvento
          event={event}
          presents={presents}
          notPresents={notPresents}
          total={total}
        />
      ) : (
        <FormPasswordEvent />
      )}
    </div>
  );
};

export default AdminPageEvent;
