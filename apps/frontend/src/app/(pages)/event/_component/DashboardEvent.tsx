import { Event, Guest } from "core";
import GuestList from "./GuestList";
import Statistic from "@/app/_components/_commons/Statistic";
import AccessQrCode from "./AccessQrCode";
import InfoEvent from "./InfoEvent";

export interface DashboardEventoProps {
  event: Event;
  presents: Guest[];
  notPresents: Guest[];
  total: number;
}

export default function DashboardEvento(props: DashboardEventoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 self-stretch">
        <InfoEvent event={props.event} className="flex-1" />
        <AccessQrCode event={props.event} />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <Statistic
          text="Expectativa de Convidados:"
          value={props.event.publicAwaited}
          image="/icones/convidados.svg"
        />
        <Statistic
          text="Confirmações:"
          value={props.presents.length}
          image="/icones/confirmados.svg"
        />
        <Statistic
          text="Total Confirmado:"
          value={props.total}
          image="/icones/acompanhantes.svg"
        />
      </div>

      <button className="botao azul self-end mt-12">
        <span>Atualizar Lista de Convidados</span>
      </button>

      <span className="flex py-2 text-xl font-bold text-white/80">
        Convidados que confimaram PRESENÇA
      </span>
      <GuestList guests={props.presents} />

      <span className="flex py-2 text-xl font-bold text-white/80">
        Convidados que confirmaram AUSÊNCIA
      </span>
      <GuestList guests={props.notPresents} />
    </div>
  );
}
