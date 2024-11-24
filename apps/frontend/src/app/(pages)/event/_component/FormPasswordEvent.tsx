import FieldHome from "@/app/_components/_commons/FieldHome";

export interface FormPasswordEventProps {
  password: string;
  setPassword: (password: string) => void;
  acessarEvento: () => void;
}

export default function FormPasswordEvent(props: FormPasswordEventProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 bg-zinc-900 p-8
      rounded-lg shadow-lg w-[500px] border border-zinc-800"
    >
      <h1 className="text-3xl font-black">Bem-vindo(a)</h1>
      <h2 className="text-lg font-semibold -mt-3">Administrador</h2>
      <p className="text-sm text-zinc-400">
        Insira sua senha para gerenciar o evento
      </p>
      <FieldHome
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        placeholder="Digite sua senha"
        type="password"
        outterClassName="w-full"
      />
      <button className="btn azul" onClick={props.acessarEvento}>
        Acessar Evento
      </button>
    </div>
  );
}
