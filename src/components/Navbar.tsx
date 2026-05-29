const GITHUB_URL = "https://github.com/ki1bot";

type Theme = "dark" | "light";

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const isDark = theme === "dark";

  return (
    <header className="z-[100] mx-auto flex w-[calc(100%_-_24px)] flex-none items-center justify-between py-3 md:w-[min(1080px,calc(100%_-_40px))] md:py-4">
      <div
        aria-label="Project QR Code"
        className={`inline-flex select-none items-center rounded-full border px-3.5 py-2 text-[0.82rem] font-extrabold backdrop-blur-2xl md:px-4 md:text-[0.9rem] ${
          isDark
            ? "border-slate-400/25 bg-slate-900/70 text-blue-100 shadow-[0_14px_38px_rgba(2,6,23,0.24)]"
            : "border-slate-300/80 bg-white/75 text-slate-900 shadow-[0_14px_38px_rgba(15,23,42,0.12)]"
        }`}
      >
        <span>Project QR Code</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={onToggleTheme}
          className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border backdrop-blur-2xl transition duration-200 md:h-[50px] md:w-[50px] md:hover:-translate-y-0.5 ${
            isDark
              ? "border-slate-400/30 bg-white/10 hover:border-sky-400/75 hover:bg-white/20 md:hover:shadow-[0_18px_38px_rgba(56,189,248,0.18)]"
              : "border-slate-300/80 bg-white/75 hover:border-sky-500/50 hover:bg-white md:hover:shadow-[0_18px_38px_rgba(15,23,42,0.14)]"
          }`}
        >
          <img
            src={isDark ? "/assets/icon/moon.png" : "/assets/icon/sun.png"}
            alt={isDark ? "Dark theme" : "Light theme"}
            className="h-6 w-6 object-contain md:h-7 md:w-7"
          />
        </button>

        <div className="group relative">
          <button
            type="button"
            aria-label="Open profile menu"
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border backdrop-blur-2xl transition duration-200 md:h-[50px] md:w-[50px] md:hover:-translate-y-0.5 ${
              isDark
                ? "border-slate-400/30 bg-white/10 hover:border-sky-400/75 hover:bg-white/20 md:hover:shadow-[0_18px_38px_rgba(56,189,248,0.18)]"
                : "border-slate-300/80 bg-white/75 hover:border-sky-500/50 hover:bg-white md:hover:shadow-[0_18px_38px_rgba(15,23,42,0.14)]"
            }`}
          >
            <img
              src="/assets/icon/profile.png"
              alt="Profile"
              className="h-7 w-7 object-contain md:h-[30px] md:w-[30px]"
            />
          </button>

          <div
            className={`invisible absolute right-0 top-[calc(100%+10px)] w-[235px] translate-y-2 rounded-3xl border p-4 opacity-0 shadow-[0_26px_70px_rgba(2,6,23,0.55)] backdrop-blur-2xl transition duration-200 before:absolute before:right-5 before:-top-[7px] before:h-3.5 before:w-3.5 before:rotate-45 before:border-l before:border-t group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 md:top-[calc(100%+12px)] md:w-[260px] md:p-[18px] ${
              isDark
                ? "border-slate-400/30 bg-slate-900/95 before:border-slate-400/30 before:bg-slate-900/95"
                : "border-slate-200/90 bg-white/95 before:border-slate-200/90 before:bg-white/95"
            }`}
          >
            <div className="mb-4 flex items-center gap-3.5">
              <img
                src="/assets/icon/profile.png"
                alt="Profile"
                className={`h-11 w-11 rounded-2xl p-2 object-contain md:h-[46px] md:w-[46px] ${
                  isDark ? "bg-white/10" : "bg-slate-100"
                }`}
              />

              <div>
                <p
                  className={`mb-1 mt-0 text-[0.68rem] font-black uppercase tracking-[0.14em] md:text-[0.72rem] ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Created by
                </p>

                <h3
                  className={`m-0 text-[1.2rem] leading-none tracking-[-0.04em] md:text-[1.35rem] ${
                    isDark ? "text-white" : "text-slate-950"
                  }`}
                >
                  Kibot
                </h3>
              </div>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2.5 rounded-2xl bg-slate-700 font-black text-white no-underline transition duration-200 hover:bg-slate-600 md:min-h-12 md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_34px_rgba(15,23,42,0.35)]"
            >
              <img
                src="/assets/icon/github.png"
                alt="GitHub"
                className="h-6 w-6 object-contain"
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
