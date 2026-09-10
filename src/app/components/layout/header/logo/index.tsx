import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
      <div className="relative flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark p-1 sm:p-1.5 shadow-md shadow-primary/20 border border-primary/30 group-hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/logo/app_icon.png"
          alt="ARIKE Icon"
          width={36}
          height={36}
          className="size-7 sm:size-8 object-contain rounded-lg"
          priority
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
            ARIKE<span className="text-secondary">.</span>
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 leading-none">
            v3.0
          </span>
        </div>
        <span className="hidden min-[360px]:block text-[9px] sm:text-[10px] uppercase tracking-widest text-lightblue font-medium -mt-0.5 whitespace-nowrap">
          Caisse & Gestion Offline
        </span>
      </div>
    </Link>
  );
};

export default Logo;
