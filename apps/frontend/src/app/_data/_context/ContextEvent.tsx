/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createEmptyEvent, createEmptyGuest, Data, Event, Guest } from "core";
import useAPI from "../_hook/useApi";
import useMessages from "../_hook/useMessages";

export interface ContextEventProps {
  event: Partial<Event>;
  guest: Partial<Guest>;
  aliasValid: boolean;

  changeEvent(event: Partial<Event>): void;
  changeGuest(guest: Partial<Guest>): void;

  loadEvent(idOrAlias: string): Promise<void>;
  saveEvent(): Promise<void>;

  addGuest(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextEvent = createContext<ContextEventProps>({} as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProviderContextEvent(props: any) {
  const { httpGet, httpPost } = useAPI();
  const { addError } = useMessages();
  const router = useRouter();

  const [aliasValid, setAliasValid] = useState(true);
  const [event, setEvent] = useState<Partial<Event>>(createEmptyEvent());
  const [guest, setGuest] = useState<Partial<Guest>>(createEmptyGuest());

  const saveEvent = useCallback(
    async function () {
      try {
        const eventCreated = await httpPost("/events", event);
        router.push("/event/success");
        setEvent({
          ...eventCreated,
          data: Data.unformat(eventCreated.data),
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        addError(error.messagem ?? "Ocorreu um erro inesperado!");
      }
    },
    [event, httpPost, router]
  );

  const loadEvent = useCallback(
    async function (idOrAlias: string) {
      try {
        const event = await httpGet(`/events/${idOrAlias}`);
        if (!event) return;
        console.log(event);
        setEvent({
          ...event,
          data: Data.format(event.data),
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        addError(error.messagem ?? "Ocorreu um erro inesperado!");
      }
    },
    [httpGet, setEvent]
  );

  const addGuest = useCallback(
    async function () {
      try {
        await httpPost(`/events/${event.alias}/guest`, guest);
        router.push("/invite/thanks");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        addError(error.messagem ?? "Ocorreu um erro inesperado!");
      }
    },
    [httpPost, event, guest, router]
  );

  const validateAlias = useCallback(
    async function () {
      try {
        const { valid } = await httpGet(
          `/events/validate/${event.alias}/${event.id}`
        );
        setAliasValid(valid);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        addError(error.messagem ?? "Ocorreu um erro inesperado!");
      }
    },
    [httpGet, event]
  );

  useEffect(() => {
    if (event?.alias) validateAlias();
  }, [event?.alias, validateAlias]);

  return (
    <ContextEvent.Provider
      value={{
        event,
        guest,
        aliasValid,
        changeEvent: setEvent,
        changeGuest: setGuest,
        saveEvent,
        loadEvent,
        addGuest,
      }}
    >
      {props.children}
    </ContextEvent.Provider>
  );
}

export default ContextEvent;
