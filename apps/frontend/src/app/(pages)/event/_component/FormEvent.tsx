import { Alias, Data } from "core";
import useEvent from "@/app/_data/_hook/useEvent";
import Steps from "@/app/_components/_commons/Steps";
import FieldHome from "@/app/_components/_commons/FieldHome";

export default function FormEvent() {
  const { event, aliasValid, changeEvent, saveEvent } = useEvent();

  const labels = [
    "Identificação do Evento",
    "Local e Data",
    "Informações Finais",
  ];

  const allowNextStep: boolean[] = [
    !!event.alias && !!event.name && aliasValid,
    !!event.date && !!event.local,
    !!event.description && (event.publicAwaited ?? 0) > 0,
    // &&
    // !!event.imagem &&
    // !!event.imageBackground,
  ];

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        action={saveEvent}
        allowNextStep={allowNextStep}
      >
        <div className="flex flex-col gap-5">
          <FieldHome
            label="Identificador"
            description="Identificador único e exclusivo para o evento (usado na URL)"
            value={Alias.format(event.alias ?? "")}
            onChange={(e) =>
              changeEvent({
                ...event,
                alias: Alias.format(e.target.value),
              })
            }
            erro={aliasValid ? "" : "Alias já foi utilizado em outro evento"}
          />
          <FieldHome
            label="Nome"
            description='Nome do evento (ex.: "Festa de Aniversário do João")'
            value={event.name ?? ""}
            onChange={(e) =>
              changeEvent({
                ...event,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <FieldHome
            label="Data"
            description="Data e hora em que o evento ocorrerá"
            value={Data.format(event.date ?? new Date())}
            onChange={(e) =>
              changeEvent({
                ...event,
                date: Data.unformat(e.target.value),
              })
            }
            type="datetime-local"
          />
          <FieldHome
            label="Local"
            description="Local onde o evento será realizado"
            value={event.local ?? ""}
            onChange={(e) =>
              changeEvent({
                ...event,
                local: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <FieldHome
            label="Descrição"
            description='Descrição do evento (ex.: "Só entra se trouxer presente!")'
            value={event.description ?? ""}
            onChange={(e) =>
              changeEvent({
                ...event,
                description: e.target.value,
              })
            }
          />
          <FieldHome
            label="Image"
            description="URL da imagem que será exibida no convite"
            value={event.image ?? ""}
            onChange={(e) =>
              changeEvent({
                ...event,
                image: e.target.value,
              })
            }
          />
          <FieldHome
            label="Background"
            description="URL da imagem que será exibida como background no convite"
            value={event.imageBackground ?? ""}
            onChange={(e) =>
              changeEvent({
                ...event,
                imageBackground: e.target.value,
              })
            }
          />
          <FieldHome
            label="Público Esperado"
            description="Total de convidados e acompanhantes esperados"
            value={event.publicAwaited ?? 1}
            onChange={(e) =>
              changeEvent({
                ...event,
                publicAwaited: Number(e.target.value),
              })
            }
            type="number"
            min={1}
          />
        </div>
      </Steps>
    </div>
  );
}
