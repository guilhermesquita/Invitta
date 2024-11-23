"use client";
import { createContext, useCallback } from "react";
import { useToast } from "../_hook/useToast";

export interface ContextMessagesProps {
  addSuccess: (text: string) => void;
  addError: (text: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextMessages = createContext<ContextMessagesProps>({} as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProvedorContextMessages(props: any) {
  const { toast } = useToast();

  const addMessage = useCallback(
    function (type: "success" | "erro", text: string) {
      toast({
        title:
          type == "success" ? "Tudo certo por aqui!" : "Ops, algo deu errado!",
        description: text
          .split(/\n/)
          .map((linha) => <p key={linha}>{linha}</p>),
        variant: type == "success" ? "default" : "destructive",
      });
    },
    [toast]
  );

  return (
    <ContextMessages.Provider
      value={{
        addSuccess(text) {
          addMessage("success", text);
        },
        addError(text) {
          addMessage("erro", text);
        },
      }}
    >
      {props.children}
    </ContextMessages.Provider>
  );
}

export default ContextMessages;
