export interface InformationProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export default function Information(props: InformationProps) {
  return (
    <div className="flex-1 flex flex-col items-start border border-zinc-800 px-6 py-3 rounded-lg">
      <span className="text-zinc-400 font-bold">{props.label}</span>
      <div className="text-xl">{props.children}</div>
    </div>
  );
}
