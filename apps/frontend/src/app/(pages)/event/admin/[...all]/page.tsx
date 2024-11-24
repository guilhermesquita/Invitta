"use client";

import { Event, events, Guest } from "core";
import FormPasswordEvent from "../../_component/FormPasswordEvent";
import { use, useCallback, useEffect, useState } from "react";
import useAPI from "@/app/_data/_hook/useApi";
import DashboardEvent from "../../_component/DashboardEvent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminPageEvent = (props: any) => {
  const { httpPost } = useAPI();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = use(props.params);

  const id = params.all[0];
  const [event, setEvent] = useState<Event | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, _setPassword] = useState<string | null>(
    params.all[1] ?? null
  );

  const presents = event?.guests.filter((g) => g.confirmed) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notPresents = event?.guests.filter((g) => !g.confirmed) ?? [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const total =
    presents?.reduce((total: number, guest: Guest) => {
      return total + guest.numberCompanions + 1;
    }, 0) ?? 0;

  function loadEvent() {
    const event = events.find((ev) => ev.id === id && ev.password === password);
    setEvent(event ?? null);
  }

  const getEvent = useCallback(async () => {
    if (!id || !password) return;
    const event = await httpPost("/events/access", { id, password });
    setEvent(event);
  }, [httpPost, id, password]);

  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password]);

  return (
    <div className="flex flex-col items-center">
      {event ? (
        <DashboardEvent
          event={event}
          presents={presents}
          notPresents={notPresents}
          total={total}
          updateGuestList={getEvent}
        />
      ) : (
        <FormPasswordEvent />
      )}
    </div>
  );
};

export default AdminPageEvent;
