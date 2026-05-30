import { useEffect, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/ki1bot";

type Theme = "dark" | "light";

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const isDark = theme === "dark";
  const isLight = theme === "light";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="relative z-70 flex w-full items-center justify-between gap-3">
      <a
        href="/"
        className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-[0.78rem] font-black tracking-[-0.005em] transition duration-200 sm:h-11 sm:px-5 sm:text-sm ${
          isDark
            ? "border-cyan-300/25 bg-slate-950/55 text-white hover:border-cyan-300/45"
            : "border-slate-300 bg-white/80 text-slate-950 hover:border-cyan-400"
        }`}
      >
        Generate QR Code
      </a>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Ganti tema"
          className={`grid h-10 w-10 place-items-center rounded-full border transition duration-200 active:scale-95 sm:h-11 sm:w-11 ${
            isDark
              ? "border-slate-400/25 bg-slate-900/80 hover:border-cyan-300/40"
              : "border-slate-300 bg-white/85 hover:border-cyan-400"
          }`}
        >
          <img
            src={
              isDark
                ? "/assets/icon/moonWhite.png"
                : "/assets/icon/sunBlack.png"
            }
            alt="Theme icon"
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          />
        </button>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((current) => !current)}
            aria-label="Buka profil"
            aria-expanded={isProfileOpen}
            className={`grid h-10 w-10 place-items-center rounded-full border transition duration-200 active:scale-95 sm:h-11 sm:w-11 ${
              isDark
                ? "border-slate-400/25 bg-slate-900/80 hover:border-cyan-300/40"
                : "border-slate-300 bg-white/85 hover:border-cyan-400"
            }`}
          >
            <img
              src={
                isDark
                  ? "/assets/icon/profileWhite.png"
                  : "/assets/icon/profileBlack.png"
              }
              alt="Profile icon"
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </button>

          {isProfileOpen && (
            <div
              className={`absolute right-0 top-[calc(100%+0.75rem)] z-90 w-[min(240px,calc(100vw-2rem))] rounded-24px border p-4 shadow-[0_24px_60px_rgba(2,6,23,0.36)] ${
                isDark
                  ? "border-slate-400/20 bg-slate-950/95 text-white"
                  : "border-slate-200 bg-white/95 text-slate-950"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${
                    isDark
                      ? "border-cyan-300/20 bg-cyan-300/10"
                      : "border-cyan-400/30 bg-cyan-100"
                  }`}
                >
                  <img
                    src={
                      isDark
                        ? "/assets/icon/profileWhite.png"
                        : "/assets/icon/profileBlack.png"
                    }
                    alt="Profile icon"
                    className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[0.62rem] font-black uppercase tracking-[0.18em] ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Created by
                  </p>
                  <h3 className="truncate text-lg font-black tracking-[-0.020em]">
                    Kibot
                  </h3>
                </div>
              </div>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition duration-200 hover:-translate-y-0.5 ${
                  isLight
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                <img
                  src={
                    isLight
                      ? "/assets/icon/githubWhite.png"
                      : "/assets/icon/githubBlack.png"
                  }
                  alt="GitHub icon"
                  className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                />

                <span className="tracking-[0.050em]">GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
