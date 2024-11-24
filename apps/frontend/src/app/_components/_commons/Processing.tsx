import Image from "next/image";

export default function Processing() {
  return (
    <div className="flex-1 flex justify-center items-center h-96">
      <Image src="/processing.gif" width={60} height={60} alt="processing" />
    </div>
  );
}
