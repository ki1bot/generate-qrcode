import {
  useEffect,
  useRef,
  useState,
} from "react";

const GITHUB_URL =
  "https://github.com/ki1bot";

type Theme = "dark" | "light";

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function Navbar({
  theme,
  onToggleTheme,
}: NavbarProps) {
  const isDark = theme === "dark";

  const [
    isProfileOpen,
    setIsProfileOpen,
  ] = useState(false);

  const profileRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          target,
        )
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  const closeProfileMenu = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="relative z-50 flex w-full items-center justify-between gap-3">
      <a
        href="/"
        className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-xs font-black transition duration-200 sm:h-11 sm:px-5 sm:text-sm ${
          isDark
            ? "border-cyan-300/25 bg-slate-950/55 text-white hover:border-cyan-300/50"
            : "border-slate-300 bg-white/80 text-slate-950 hover:border-cyan-400"
        }`}
      >
        Generate QR Code
      </a>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            isDark
              ? "Gunakan tema terang"
              : "Gunakan tema gelap"
          }
          className={`grid h-10 w-10 touch-manipulation place-items-center rounded-full border transition duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-11 sm:w-11 ${
            isDark
              ? "border-slate-400/25 bg-slate-900/80 hover:border-cyan-300/50"
              : "border-slate-300 bg-white/85 hover:border-cyan-400"
          }`}
        >
          <img
            src={
              isDark
                ? "/assets/icon/moonWhite.png"
                : "/assets/icon/sunBlack.png"
            }
            alt=""
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          />
        </button>

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setIsProfileOpen(
                (current) => !current,
              )
            }
            aria-label="Buka informasi pembuat"
            aria-controls="profile-menu"
            aria-expanded={
              isProfileOpen
            }
            className={`grid h-10 w-10 touch-manipulation place-items-center rounded-full border transition duration-200 hover:-translate-y-0.5 active:scale-95 sm:h-11 sm:w-11 ${
              isDark
                ? "border-slate-400/25 bg-slate-900/80 hover:border-cyan-300/50"
                : "border-slate-300 bg-white/85 hover:border-cyan-400"
            }`}
          >
            <img
              src={
                isDark
                  ? "/assets/icon/profileWhite.png"
                  : "/assets/icon/profileBlack.png"
              }
              alt=""
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </button>

          <div
            id="profile-menu"
            role="menu"
            aria-hidden={
              !isProfileOpen
            }
            className={`absolute right-0 top-[calc(100%+0.75rem)] z-[90] w-[min(240px,calc(100vw-2rem))] origin-top-right rounded-3xl border p-4 shadow-[0_24px_60px_rgba(2,6,23,0.36)] backdrop-blur-xl transition duration-150 ${
              isProfileOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
            } ${
              isDark
                ? "border-slate-400/20 bg-slate-950/95 text-white"
                : "border-slate-200 bg-white/95 text-slate-950"
            }`}
          >
            <div
              className={`mb-4 flex items-center gap-3 border-b pb-4 ${
                isDark
                  ? "border-slate-800"
                  : "border-slate-200"
              }`}
            >
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
                  alt="Profil Kibot"
                  className="h-6 w-6 object-contain"
                />
              </div>

              <div className="min-w-0">
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                    isDark
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  Created by
                </p>

                <h2 className="truncate text-lg font-black tracking-tight">
                  Kibot
                </h2>
              </div>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label="Buka akun GitHub Kibot"
              onClick={
                closeProfileMenu
              }
              className={`flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              <img
                src={
                  isDark
                    ? "/assets/icon/githubBlack.png"
                    : "/assets/icon/githubWhite.png"
                }
                alt=""
                className="h-5 w-5 object-contain"
              />

              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;