import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Body from "./components/Body.tsx";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem("kibot-qrcode-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "dark";
}

function TextViewer({ theme }: { theme: Theme }) {
  const qrText = new URLSearchParams(window.location.search).get("qrText");
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-dvh overflow-y-auto bg-cover bg-center px-4 py-6 md:flex md:items-center md:justify-center md:overflow-hidden md:p-6 ${
        isDark
          ? "bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92)),url('/assets/icon/background.png')] text-white"
          : "bg-[linear-gradient(135deg,rgba(248,250,252,0.94),rgba(226,232,240,0.9)),url('/assets/icon/background.png')] text-slate-950"
      }`}
    >
      <main
        className={`mx-auto w-full max-w-[720px] rounded-[28px] border p-6 text-center backdrop-blur-2xl md:rounded-[32px] md:p-8 ${
          isDark
            ? "border-slate-400/20 bg-slate-950/50 shadow-[0_26px_70px_rgba(2,6,23,0.45)]"
            : "border-slate-200/80 bg-white/75 shadow-[0_26px_70px_rgba(15,23,42,0.16)]"
        }`}
      >
        <p className="mb-3 text-[0.72rem] font-black uppercase tracking-[0.18em] text-sky-400 md:text-[0.76rem]">
          QR Code Text
        </p>

        <h1
          className={`mb-5 break-words text-[clamp(1.8rem,9vw,3rem)] font-black leading-tight tracking-[-0.06em] md:text-[clamp(2rem,5vw,4rem)] ${
            isDark ? "text-white" : "text-slate-950"
          }`}
        >
          {qrText || "Tidak ada teks"}
        </h1>

        <p
          className={`mx-auto mb-6 max-w-[520px] text-sm leading-6 md:text-base ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Ini adalah teks yang dibuat dari QR Code.
        </p>

        <a
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-[16px] bg-gradient-to-r from-sky-400 to-cyan-400 px-6 font-bold text-sky-950 no-underline shadow-[0_14px_30px_rgba(56,189,248,0.22)] transition duration-200 hover:-translate-y-0.5 md:h-12 md:rounded-[18px]"
        >
          Kembali
        </a>
      </main>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const qrText = new URLSearchParams(window.location.search).get("qrText");
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("kibot-qrcode-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  if (qrText !== null) {
    return <TextViewer theme={theme} />;
  }

  return (
    <div
      className={`min-h-dvh overflow-y-auto bg-cover bg-center md:flex md:h-dvh md:flex-col md:overflow-hidden md:bg-fixed ${
        isDark
          ? "bg-[linear-gradient(135deg,rgba(2,6,23,0.94),rgba(15,23,42,0.9)),url('/assets/icon/background.png')] text-white"
          : "bg-[linear-gradient(135deg,rgba(248,250,252,0.94),rgba(226,232,240,0.9)),url('/assets/icon/background.png')] text-slate-950"
      }`}
    >
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <Body theme={theme} />
    </div>
  );
}

export default App;
