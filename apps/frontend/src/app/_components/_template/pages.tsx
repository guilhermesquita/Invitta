import Logo from "./Logo";

export interface PagesProps {
  children: React.ReactNode;
  className?: string;
}

const Pages = ({ children, className }: PagesProps) => {
  return (
    <div
      className="flex flex-col items-center py-10 min-h-screen
        bg-[url('/background.png')] bg-cover"
    >
      <Logo />

      <main
        className={`
            flex-1 flex flex-col justify-center py-10
            container ${className}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Pages;
