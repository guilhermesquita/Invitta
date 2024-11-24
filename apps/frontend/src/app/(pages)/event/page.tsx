"use client";
import Window from "@/app/_components/_commons/window";
import useEvent from "@/app/_data/_hook/useEvent";
import FormEvent from "./_component/FormEvent";

const PageEvent = () => {
  const { event } = useEvent();

  return (
    <div>
      <Window
        label="Qual evento vamos criar?"
        title={event?.name ? event?.name : "Novo evento"}
        image={event?.image}
        background={event?.imageBackground}
      >
        <FormEvent />
      </Window>
    </div>
  );
};

export default PageEvent;
