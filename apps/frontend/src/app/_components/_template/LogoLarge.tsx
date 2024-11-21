import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Righteous({
  subsets: ["latin"],
  weight: "400",
});

const LogoLarge = () => {
  return (
    <Link
      href="/"
      className={`flex flex-col items-center gap-2 ${font.className}`}
    >
      <Image src="/logo.svg" width={100} height={100} alt="Logo" />
      <h1 className="flex flex-col items-center text-5xl">
        <div>
          INVITT<span className="text-blue-500">4</span>
        </div>
      </h1>
    </Link>
  );
};

export default LogoLarge;
