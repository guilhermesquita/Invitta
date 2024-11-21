import { events } from "@/app/_core/constants";
import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";

const Events = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {events.map((event) => {
        return (
          <div
            key={event.id}
            className="flex flex-col bg-zinc-800 rounded-lg w-full overflow-hidden"
          >
            <div className="relative w-full h-44">
              <Image
                src={event.image}
                fill
                alt={event.name}
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col items-center p-7 gap-5">
              <span className="text-lg font-black">{event.name}</span>
              <p className="flex-1 text-sm text-zinc-400 text-center">
                {event.description}
              </p>
              <QRCode
                value={JSON.stringify({ id: event.id, senha: event.password })}
                className="w-44 h-44 rounded-lg"
              />
              <div className="flex gap-5">
                <Link
                  className="btn red flex-1"
                  href={`/evento/admin/${event.id}/${event.password}`}
                >
                  Admin
                </Link>

                <Link
                  className="btn green flex-1"
                  href={`/evento/admin/${event.id}/${event.password}`}
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
