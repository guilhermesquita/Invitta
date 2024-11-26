"use client";
import useEvent from "@/app/_data/_hook/useEvent";
import { use, useEffect } from "react";
import InfoEvent from "../../event/_component/InfoEvent";
import Window from "@/app/_components/_commons/window";
import Processing from "@/app/_components/_commons/Processing";
import FormGuest from "../../event/_component/FormGuest";
import { Event } from "core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PaginaConvite(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = use(props.params);
  const { event, guest, changeGuest, addGuest, loadEvent } = useEvent();

  useEffect(() => {
    loadEvent(params.alias);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.alias]);

  return event?.alias ? (
    <div>
      <Window
        label="Você foi convidado para:"
        title={event.name}
        image={event.image}
        background={event.imageBackground}
      >
        <InfoEvent hideName event={event as Event} />
        <div className="flex flex-col gap-4 pt-10">
          <span className="text-xl font-bold">Insira seus dados</span>
          <div className="border-t border-zinc-800"></div>
          <FormGuest guest={guest} guestChanged={changeGuest} />
          <button
            className={`btn self-center ${guest.confirmed ? "green" : "red"}`}
            onClick={addGuest}
          >
            Confirmar {guest.confirmed ? "Presença" : "Ausência"}
          </button>
        </div>
      </Window>
    </div>
  ) : (
    <Processing />
  );
}
