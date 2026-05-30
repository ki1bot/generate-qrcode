import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Body from "./components/Body.tsx";

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "kibot-qrcode-theme";

function isValidTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (isValidTheme(savedTheme)) {
    return savedTheme;
  }

  return "dark";
}

function decodeBase64UrlToText(value: string | null): string {
  if (!value) {
    return "";
  }

  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    return decodeURIComponent(escape(atob(paddedBase64)));
  } catch {
    return "";
  }
}

type TextViewerProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function TextViewer({ theme, onToggleTheme }: TextViewerProps) {
  const qrText =
    typeof window !== "undefined"
      ? decodeBase64UrlToText(
          new URLSearchParams(window.location.search).get("qrData"),
        )
      : "";

  const isDark = theme === "dark";

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
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />

        <main className="flex flex-1 items-center justify-center py-8">
          <section
            className={`flex min-h-[520px] w-full max-w-3xl items-center justify-center rounded-[28px] border p-5 text-center shadow-2xl sm:p-8 md:min-h-[620px] ${
              isDark
                ? "border-slate-400/20 bg-slate-950/70"
                : "border-slate-200 bg-white/80"
            }`}
          >
            <div className="w-full">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-cyan-400">
                QR Code Text
              </p>

              <h1
                className={`mb-4 break-words text-3xl font-black leading-tight tracking-[-0.015em] sm:text-5xl ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
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
                className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-black transition duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? "bg-gradient-to-r from-sky-400 to-cyan-400 text-white hover:from-sky-300 hover:to-cyan-300"
                    : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                }`}
              >
                Kembali
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const qrData =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("qrData")
      : null;

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      if (isValidTheme(event.newValue)) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  if (qrData !== null) {
    return <TextViewer theme={theme} onToggleTheme={handleToggleTheme} />;
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
