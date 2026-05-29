import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  createQrTarget,
  DEFAULT_QR_VALUE,
  getQrType,
} from "../utils/server.js";

type Theme = "dark" | "light";

type BodyProps = {
  theme: Theme;
};

function Body({ theme }: BodyProps) {
  const isDark = theme === "dark";
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const [qrValue, setQrValue] = useState(DEFAULT_QR_VALUE);
  const [foregroundColor, setForegroundColor] = useState("#020617");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [copyText, setCopyText] = useState("Copy Text");

  const cleanQrValue = useMemo(() => {
    return createQrTarget(qrValue);
  }, [qrValue]);

  const hasQrValue = Boolean(cleanQrValue);

  const qrType = useMemo(() => {
    return getQrType(qrValue);
  }, [qrValue]);

  const handleDownload = () => {
    if (!hasQrValue) return;

    const canvas = qrCodeRef.current?.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode-kibot.png";
    link.click();
  };

  const handleCopy = async () => {
    if (!hasQrValue) return;

    try {
      await navigator.clipboard.writeText(cleanQrValue);
      setCopyText("Copied");
    } catch {
      setCopyText("Failed");
    }

    setTimeout(() => {
      setCopyText("Copy Text");
    }, 1400);
  };

  const handleReset = () => {
    setQrValue(DEFAULT_QR_VALUE);
    setForegroundColor("#020617");
    setBackgroundColor("#ffffff");
    setCopyText("Copy Text");
  };

  return (
    <main className="mx-auto w-[calc(100%_-_24px)] pb-6 md:flex md:min-h-0 md:w-[min(1100px,calc(100%_-_40px))] md:flex-1 md:flex-col md:justify-center md:gap-3 md:overflow-hidden md:py-3">
      <section className="mx-auto mb-4 max-w-[720px] -translate-y-3 text-center md:mb-0">
        <h1
          className={`mx-auto max-w-[720px] -translate-y-3 text-[clamp(1.8rem,9vw,2.55rem)] font-black leading-[1.12] tracking-[-0.025em] md:text-[clamp(1.5rem,2.75vw,2.85rem)] ${
            isDark ? "text-white" : "text-slate-950"
          }`}
        >
          Generate QR Code Cepat, Rapi, dan Siap Download
        </h1>

        <p
          className={`mx-auto mt-5 max-w-[680px] text-[0.94rem] leading-[1.6] md:mt-4 md:text-[0.95rem] md:leading-[1.5] ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Masukkan link, Gmail, nomor WhatsApp, atau teks biasa. Sistem akan
          otomatis membuat target QR Code yang sesuai.
        </p>
      </section>

      <section
        className={`relative overflow-hidden rounded-[26px] border p-1 backdrop-blur-2xl md:rounded-[30px] ${
          isDark
            ? "border-slate-400/20 bg-slate-950/35 shadow-[0_26px_75px_rgba(2,6,23,0.38)]"
            : "border-slate-200/80 bg-white/70 shadow-[0_26px_75px_rgba(15,23,42,0.14)]"
        }`}
      >
        <div className="pointer-events-none absolute -left-20 top-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-8 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

        <div
          className={`relative grid rounded-[22px] md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:rounded-[26px] ${
            isDark ? "bg-slate-950/20" : "bg-white/35"
          }`}
        >
          <div className="p-4 sm:p-5 md:p-6">
            <div className="mb-4">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-cyan-400 md:text-[0.72rem]">
                Input Data
              </p>

              <h2
                className={`text-[1.45rem] font-black leading-none tracking-[-0.055em] md:text-[1.6rem] ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Atur QR Code
              </h2>

              <p
                className={`mt-2 max-w-[430px] text-[0.82rem] leading-6 md:text-[0.84rem] ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Input akan diarahkan ke Gmail, WhatsApp, URL website, atau
                halaman teks.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="qr-value"
                  className={`text-[0.86rem] font-bold md:text-[0.88rem] ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Isi QR Code
                </label>

                <textarea
                  id="qr-value"
                  value={qrValue}
                  placeholder="Contoh: Rifqi, Rifqi@gmail.com, 08123456789, atau https://github.com/ki1bot"
                  onChange={(event) => setQrValue(event.target.value)}
                  className={`h-[112px] w-full resize-none rounded-[18px] border px-4 py-3.5 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] md:h-[108px] md:rounded-[20px] md:px-5 md:py-4 ${
                    isDark
                      ? "border-slate-400/25 bg-slate-950/75 text-white placeholder:text-slate-500 focus:bg-slate-950/90"
                      : "border-slate-300/80 bg-white/85 text-slate-950 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="foreground-color"
                    className={`text-[0.86rem] font-bold md:text-[0.88rem] ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Warna QR
                  </label>

                  <input
                    id="foreground-color"
                    type="color"
                    value={foregroundColor}
                    onChange={(event) => setForegroundColor(event.target.value)}
                    className={`h-11 w-full cursor-pointer rounded-[16px] border p-1.5 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] md:rounded-[17px] ${
                      isDark
                        ? "border-slate-400/25 bg-slate-950/75"
                        : "border-slate-300/80 bg-white/85"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="background-color"
                    className={`text-[0.86rem] font-bold md:text-[0.88rem] ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Warna Background
                  </label>

                  <input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    className={`h-11 w-full cursor-pointer rounded-[16px] border p-1.5 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] md:rounded-[17px] ${
                      isDark
                        ? "border-slate-400/25 bg-slate-950/75"
                        : "border-slate-300/80 bg-white/85"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-[105px_1fr]">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`h-11 rounded-[16px] px-4 font-bold transition duration-200 active:scale-[0.98] md:rounded-[17px] md:hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-slate-700/40 text-slate-100 md:hover:bg-slate-700/60"
                      : "bg-slate-200 text-slate-800 md:hover:bg-slate-300"
                  }`}
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!hasQrValue}
                  className="h-11 rounded-[16px] bg-gradient-to-r from-sky-400 to-cyan-400 px-4 font-bold text-sky-950 shadow-[0_16px_32px_rgba(34,211,238,0.2)] transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 md:rounded-[17px] md:hover:-translate-y-0.5 md:disabled:hover:translate-y-0"
                >
                  Download PNG
                </button>
              </div>
            </div>
          </div>

          <div
            className={`h-px w-full md:my-6 md:h-auto md:w-px ${
              isDark
                ? "bg-gradient-to-r from-transparent via-slate-400/20 to-transparent md:bg-gradient-to-b"
                : "bg-gradient-to-r from-transparent via-slate-300/90 to-transparent md:bg-gradient-to-b"
            }`}
          />

          <div className="p-4 sm:p-5 md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-cyan-400 md:text-[0.72rem]">
                  Preview
                </p>

                <h2
                  className={`text-[1.45rem] font-black leading-none tracking-[-0.055em] md:text-[1.6rem] ${
                    isDark ? "text-white" : "text-slate-950"
                  }`}
                >
                  QR Code Generator
                </h2>
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-[0.68rem] font-bold md:text-xs ${
                  isDark
                    ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-200"
                    : "border-cyan-500/30 bg-cyan-100 text-cyan-700"
                }`}
              >
                {qrType}
              </span>
            </div>

            <div className="flex justify-center">
              <div
                ref={qrCodeRef}
                className="grid aspect-square w-[230px] place-items-center rounded-[24px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_52px_rgba(2,6,23,0.34)] sm:w-[250px] md:w-[238px] md:rounded-[26px]"
              >
                {hasQrValue ? (
                  <QRCodeCanvas
                    value={cleanQrValue}
                    size={205}
                    level="M"
                    marginSize={4}
                    fgColor={foregroundColor}
                    bgColor={backgroundColor}
                    className="block !h-[198px] !w-[198px] sm:!h-[215px] sm:!w-[215px] md:!h-[205px] md:!w-[205px]"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-[20px] bg-slate-100 text-center md:rounded-[22px]">
                    <div>
                      <p className="text-[2rem] font-black tracking-[-0.08em] text-slate-300">
                        QR
                      </p>
                      <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Waiting
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`mt-4 rounded-[20px] border p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:rounded-[22px] ${
                isDark
                  ? "border-slate-400/20 bg-slate-950/50"
                  : "border-slate-200/80 bg-white/75"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p
                  className={`text-[0.66rem] font-black uppercase tracking-[0.16em] md:text-[0.68rem] ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Target Output
                </p>

                <span
                  className={`rounded-full px-2.5 py-1 text-[0.66rem] font-bold md:text-[0.68rem] ${
                    isDark
                      ? "bg-slate-800/80 text-slate-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {hasQrValue ? "Ready" : "Empty"}
                </span>
              </div>

              <p
                className={`mb-3 max-h-[44px] min-h-5 overflow-hidden break-all text-[0.84rem] leading-5 md:max-h-[40px] md:text-[0.86rem] ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {cleanQrValue || "Hasil QR Code akan muncul di sini"}
              </p>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasQrValue}
                className="h-10 w-full rounded-[16px] bg-blue-700/80 font-bold text-white transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 md:hover:-translate-y-0.5 md:hover:bg-blue-700 md:disabled:hover:translate-y-0 md:disabled:hover:bg-blue-700/80"
              >
                {copyText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Body;
