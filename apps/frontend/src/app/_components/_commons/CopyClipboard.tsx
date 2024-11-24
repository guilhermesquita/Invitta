import useMessages from "@/app/_data/_hook/useMessages";
import { IconCopy } from "@tabler/icons-react";
export interface CopyClipboardProps {
  icon: React.ElementType;
  label: string;
  text: string;
  observation?: string;
}

export default function CopyClipboard(props: CopyClipboardProps) {
  const { addSuccess } = useMessages();

  function copyText() {
    navigator.clipboard.writeText(props.text);
    addSuccess("Texto copiado com sucesso!");
  }

  return (
    <div className="flex flex-col gap-2">
      <span>{props.label}</span>
      <div
        className="flex items-center gap-3 bg-black 
            border border-zinc-800 px-4 py-2 text-zinc-300 text-lg "
      >
        {props.icon && <props.icon stroke={1.3} />}
        <span className="flex-1">{props.text}</span>
        <IconCopy stroke={1.3} onClick={copyText} className="cursor-pointer" />
      </div>
      {props.observation && (
        <span className="text-xs text-yellow-300/80">{props.observation}</span>
      )}
    </div>
  );
}
