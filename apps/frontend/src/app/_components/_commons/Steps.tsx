"use client";
import { useState } from "react";

export interface StepsProps {
  labels: string[];
  labelAction: string;
  allowNextStep?: boolean[];
  action: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export default function Steps(props: StepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  function noPreviousStep() {
    return currentStep === 0;
  }

  function noNextStep() {
    return currentStep === props.labels.length - 1;
  }

  function previouStep() {
    if (noPreviousStep()) return;
    setCurrentStep(currentStep - 1);
  }

  function nextStep() {
    if (noNextStep()) return;
    setCurrentStep(currentStep + 1);
  }

  function renderizarLabels() {
    return (
      <div className="flex gap-4 select-none">
        {props.labels.map((label, i) => {
          const selecionado = currentStep === i;
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`
                    flex items-center justify-center
                    w-9 h-9 rounded-full
                    ${selecionado ? "bg-white text-black" : "bg-zinc-700 text-zinc-400"}    
                `}
              >
                {i + 1}
              </span>
              <span className={selecionado ? "text-white" : "text-zinc-600"}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  const allowNextStep = props.allowNextStep?.[currentStep] ?? true;

  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="self-center">{renderizarLabels()}</div>
      <div>{props.children[currentStep]}</div>
      <div className="flex justify-between">
        <button
          onClick={previouStep}
          className={`
            btn
            ${
              noPreviousStep()
                ? "bg-zinc-400 cursor-not-allowed opacity-50"
                : "bg-zinc-700 hover:bg-zinc-600 text-white"
            }
          `}
          disabled={noPreviousStep()}
        >
          <span>Anterior</span>
        </button>
        {noNextStep() ? (
          <button
            onClick={props.action}
            disabled={!allowNextStep}
            className={`
                btn 
                ${
                  !allowNextStep
                    ? "bg-zinc-400 cursor-not-allowed opacity-50"
                    : "bg-green-700 hover:bg-green-600 text-white"
                }
            `}
          >
            <span>{props.labelAction}</span>
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!allowNextStep || noNextStep()}
            className={`
            btn
            ${
              !allowNextStep || noNextStep()
                ? "bg-zinc-400 cursor-not-allowed opacity-50"
                : "bg-green-700 hover:bg-green-600 text-white"
            }
          `}
          >
            <span>Próximo</span>
          </button>
        )}
      </div>
    </div>
  );
}
