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
  const qrText =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("qrText")
      : "";

  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-dvh w-full px-4 py-8 ${
        isDark ? "bg-[#020617] text-white" : "bg-slate-100 text-slate-950"
      }`}
    >
      <section
        className={`mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-3xl items-center justify-center rounded-[28px] border p-5 text-center shadow-2xl sm:p-8 ${
          isDark
            ? "border-slate-400/20 bg-slate-950/70"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="w-full">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-cyan-400">
            QR Code Text
          </p>

          <h1 className="mb-4 break-words text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            {qrText || "Tidak ada teks"}
          </h1>

          <p
            className={`mx-auto mb-6 max-w-xl text-sm leading-6 sm:text-base ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Ini adalah teks yang dibuat dari QR Code.
          </p>

          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-400 px-6 text-sm font-black text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            Kembali
          </a>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const qrText =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("qrText")
      : null;

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
      className={`min-h-dvh w-full overflow-x-hidden ${
        isDark
          ? "bg-[#020617] text-white"
          : "bg-gradient-to-br from-slate-100 via-white to-cyan-50 text-slate-950"
      }`}
    >
      <div
        className={`pointer-events-none fixed inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_36%)]"
        }`}
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1180px] flex-col px-4 py-4 sm:px-6 md:px-8 md:py-6">
        <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
        <Body theme={theme} />
      </div>
    </div>
  );
}

export default App;
