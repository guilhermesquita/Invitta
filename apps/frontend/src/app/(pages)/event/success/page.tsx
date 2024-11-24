"use client";
import Window from "@/app/_components/_commons/window";
import useEvent from "@/app/_data/_hook/useEvent";
import { useEffect, useState } from "react";
import InfoEvent from "../_component/InfoEvent";
import CopyClipboard from "@/app/_components/_commons/CopyClipboard";
import AccessQrCode from "../_component/AccessQrCode";
import { IconFingerprint, IconLink } from "@tabler/icons-react";
import { Event } from "core";

export default function EventoSucesso() {
  const { event } = useEvent();

  const [urlAtual, setUrlAtual] = useState("");

  useEffect(() => {
    console.log(event);
    setUrlAtual(window.location.origin);
  }, []);

  return event.alias ? (
    <Window
      label="Seu event foi criado:"
      title={event.name}
      image={event.image}
      background={event.imageBackground}
    >
      <InfoEvent hideName event={event as Event} />
      <div className="flex gap-5 items-center py-6">
        <div className="flex-1 flex flex-col gap-5">
          <CopyClipboard
            icon={IconLink}
            label="Link para Convidar"
            text={`${urlAtual}/invite/${event.alias}`}
          />
          <CopyClipboard
            icon={IconLink}
            label="Link Administrador"
            text={`${urlAtual}/event/admin/${event.id}`}
          />
          <CopyClipboard
            icon={IconFingerprint}
            label="Senha Administrador"
            text={event.password ?? ""}
            observation="Essa senha não será exibida novamente, então guarde-a com cuidado!"
          />
        </div>
        <AccessQrCode event={event as Event} />
      </div>
    </Window>
  ) : null;
}
