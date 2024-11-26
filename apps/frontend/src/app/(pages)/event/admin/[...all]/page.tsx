"use client";

import { Event, Guest } from "core";
import { use, useCallback, useEffect, useState } from "react";
import useAPI from "@/app/_data/_hook/useApi";
import DashboardEvent from "../../_component/DashboardEvent";
import FormPasswordEvent from "../../_component/FormPasswordEvent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminPageEvent = (props: any) => {
  const { httpPost, httpGet } = useAPI();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = use(props.params);

  const id = params.all[0];
  const [event, setEvent] = useState<Event | null>(null);
  const [password, setPassword] = useState<string>(params.all[1] ?? "");

  const presents = event?.guests.filter((g) => g.confirmed) ?? [];
  const notPresents = event?.guests.filter((g) => !g.confirmed) ?? [];

  const total =
    presents?.reduce((total: number, guest: Guest) => {
      return total + guest.numberCompanions + 1;
    }, 0) ?? 0;

  async function loadEvent() {
    const events = await httpGet("/events");
    const ev = events.find(
      (ev: Event) => ev.id === id && ev.password === password
    );
    setEvent(ev);
  }

  const getEvent = useCallback(async () => {
    if (!id || !password) return;
    await httpPost("/events/access", { id, password });
  }, [httpPost, id, password]);

  useEffect(() => {
    const ev = async () => {
      await loadEvent();
    };
    ev();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password]);

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEvent]);

  return (
    <div className="flex flex-col items-center">
      {event ? (
        <DashboardEvent
          event={event}
          presents={presents}
          notPresents={notPresents}
          total={total}
          updateGuestList={loadEvent}
        />
      ) : (
        <FormPasswordEvent
          accessEvent={getEvent}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default AdminPageEvent;
