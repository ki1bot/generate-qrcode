type Theme = "dark" | "light";

type FooterProps = {
  theme: Theme;
};

function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`w-full py-5 text-center text-sm font-medium ${
        isDark
          ? "border-slate-400/20 text-slate-400"
          : "border-slate-200 text-slate-600"
      }`}
    >
      <p>© {new Date().getFullYear()} Rifqi. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
