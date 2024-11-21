import Link from "next/link";
import LogoLarge from "./_components/_template/LogoLarge";

export default function Home() {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-cover gap-10"
      style={{
        backgroundImage: "url(/background-elementos.svg)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <LogoLarge />
        <p className="text-zinc-500 font-light w-96 leading-6 select-none text-center">
          Crie e gerencie o convite do seu evento de forma rápida e fácil, sem
          complicações!
        </p>
      </div>
      <Link href="/event" className="btn blue text-lg uppercase">
        Crie seu evento
      </Link>
    </div>
  );
}
