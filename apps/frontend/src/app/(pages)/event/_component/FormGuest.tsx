import FieldHome from "@/app/_components/_commons/FieldHome";
import FieldYesNot from "@/app/_components/_commons/FieldYesNot";
import { Guest } from "core";

export interface FormGuestProps {
  guest: Partial<Guest>;
  guestChanged: (guest: Partial<Guest>) => void;
}

export default function FormGuest(props: FormGuestProps) {
  return (
    <div className="flex flex-col gap-5">
      <FieldHome
        label="Nome"
        value={props.guest.name ?? ""}
        onChange={(e) =>
          props.guestChanged({ ...props.guest, name: e.target.value })
        }
      />
      <FieldHome
        label="Email"
        value={props.guest.email ?? ""}
        onChange={(e) =>
          props.guestChanged({ ...props.guest, email: e.target.value })
        }
      />
      <div className="flex gap-5">
        <FieldYesNot
          label="Presença Confirmada?"
          value={props.guest.confirmed ?? true}
          onChange={(value) =>
            props.guestChanged({ ...props.guest, confirmed: value })
          }
          className="flex-1"
        />
        {props.guest.confirmed && (
          <div className="flex-1 flex gap-5">
            <FieldYesNot
              label="Possui Acompanhantes?"
              value={props.guest.hasCompanions ?? false}
              onChange={(value) =>
                props.guestChanged({
                  ...props.guest,
                  hasCompanions: value,
                  numberCompanions: value ? 1 : 0,
                })
              }
              className="flex-1"
            />
            {props.guest.hasCompanions && (
              <FieldHome
                label="Quantos Acompanhantes?"
                value={props.guest.numberCompanions ?? 1}
                onChange={(e) =>
                  props.guestChanged({
                    ...props.guest,
                    numberCompanions: +e.target.value,
                  })
                }
                min={1}
                type="number"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
