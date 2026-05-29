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

  const hasQrValue = cleanQrValue.length > 0;

  const qrType = useMemo(() => {
    return getQrType(qrValue);
  }, [qrValue]);

  const handleDownload = () => {
    if (!hasQrValue) return;

    const canvas = qrCodeRef.current?.querySelector(
      "canvas",
    ) as HTMLCanvasElement | null;

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
    <main className="flex flex-1 flex-col items-center pb-8 pt-8 sm:pt-10 md:justify-center md:pb-4 md:pt-7">
      <section className="w-full max-w-[960px]">
        <div className="mx-auto mb-7 max-w-[830px] text-center md:mb-8">
          <h1
            className={`mx-auto max-w-[820px] break-words text-[2.35rem] font-black leading-[0.98] tracking-[-0.07em] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.2rem] ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            Generate QR Code Cepat, Rapi, dan Siap Download
          </h1>

          <p
            className={`mx-auto mt-5 max-w-[720px] text-[0.92rem] leading-7 sm:text-base md:mt-6 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Masukkan link, Gmail, nomor WhatsApp, atau teks biasa. Sistem akan
            otomatis membuat target QR Code yang sesuai.
          </p>
        </div>

        <div
          className={`w-full rounded-[28px] border p-3 shadow-[0_28px_80px_rgba(2,6,23,0.26)] sm:rounded-[34px] sm:p-4 md:p-5 ${
            isDark
              ? "border-slate-400/18 bg-slate-950/58"
              : "border-slate-200/90 bg-white/72"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] md:items-stretch">
            <div
              className={`rounded-[24px] border p-4 sm:p-5 md:rounded-[28px] md:p-6 ${
                isDark
                  ? "border-slate-400/16 bg-slate-950/50"
                  : "border-slate-200 bg-white/80"
              }`}
            >
              <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.22em] text-cyan-400">
                Input Data
              </p>

              <h2
                className={`text-[1.45rem] font-black leading-none tracking-[-0.055em] sm:text-[1.7rem] ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Atur QR Code
              </h2>

              <p
                className={`mt-3 text-[0.86rem] leading-6 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Input akan diarahkan ke Gmail, WhatsApp, URL website, atau
                halaman teks.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="qr-value"
                  className={`text-[0.86rem] font-bold ${
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
                  className={`h-[112px] w-full resize-none rounded-[18px] border px-4 py-3.5 text-sm leading-6 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] sm:text-base md:h-[108px] ${
                    isDark
                      ? "border-slate-400/25 bg-slate-950/75 text-white placeholder:text-slate-500 focus:bg-slate-950/90"
                      : "border-slate-300/80 bg-white/90 text-slate-950 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="foreground-color"
                    className={`text-[0.86rem] font-bold ${
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
                    className={`h-11 w-full cursor-pointer rounded-[16px] border p-1.5 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] ${
                      isDark
                        ? "border-slate-400/25 bg-slate-950/75"
                        : "border-slate-300/80 bg-white/90"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="background-color"
                    className={`text-[0.86rem] font-bold ${
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
                    className={`h-11 w-full cursor-pointer rounded-[16px] border p-1.5 outline-none transition duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] ${
                      isDark
                        ? "border-slate-400/25 bg-slate-950/75"
                        : "border-slate-300/80 bg-white/90"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[115px_1fr]">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`h-11 rounded-[16px] px-4 font-bold transition duration-200 active:scale-[0.98] md:hover:-translate-y-0.5 ${
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
                  className="h-11 rounded-[16px] bg-gradient-to-r from-sky-400 to-cyan-400 px-4 font-bold text-sky-950 shadow-[0_16px_32px_rgba(34,211,238,0.2)] transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 md:hover:-translate-y-0.5 md:disabled:hover:translate-y-0"
                >
                  Download PNG
                </button>
              </div>
            </div>

            <div
              className={`rounded-[24px] border p-4 sm:p-5 md:rounded-[28px] md:p-6 ${
                isDark
                  ? "border-slate-400/16 bg-slate-950/50"
                  : "border-slate-200 bg-white/80"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-cyan-400">
                    Preview
                  </p>

                  <h2
                    className={`text-[1.45rem] font-black leading-none tracking-[-0.055em] sm:text-[1.65rem] ${
                      isDark ? "text-white" : "text-slate-950"
                    }`}
                  >
                    QR Code Generator
                  </h2>
                </div>

                <span
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[0.68rem] font-bold ${
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
                  className="grid aspect-square w-[220px] place-items-center rounded-[24px] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_52px_rgba(2,6,23,0.34)] sm:w-[250px] md:w-[238px]"
                >
                  {hasQrValue ? (
                    <QRCodeCanvas
                      value={cleanQrValue}
                      size={210}
                      level="M"
                      marginSize={4}
                      fgColor={foregroundColor}
                      bgColor={backgroundColor}
                      className="block !h-[190px] !w-[190px] sm:!h-[215px] sm:!w-[215px] md:!h-[205px] md:!w-[205px]"
                    />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center rounded-[20px] bg-slate-100 text-center">
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
                className={`mt-4 rounded-[20px] border p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] ${
                  isDark
                    ? "border-slate-400/20 bg-slate-950/50"
                    : "border-slate-200/80 bg-white/75"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p
                    className={`text-[0.66rem] font-black uppercase tracking-[0.16em] ${
                      isDark ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    Target Output
                  </p>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.66rem] font-bold ${
                      isDark
                        ? "bg-slate-800/80 text-slate-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {hasQrValue ? "Ready" : "Empty"}
                  </span>
                </div>

                <p
                  className={`mb-3 max-h-[44px] min-h-5 overflow-hidden break-all text-[0.84rem] leading-5 ${
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
        </div>
      </section>
    </main>
  );
}

export default Body;
