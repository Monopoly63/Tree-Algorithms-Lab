// Dark/Light mode toggle button
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useTranslation } from "react-i18next";

export const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();
  const label =
    theme === "dark" ? t("theme.toggleLight") : t("theme.toggleDark");

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group w-11 h-11 rounded-xl glass flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-white/25"
      style={{ borderRadius: "10px" }}
    >
      {theme === "dark" ? (
        <Sun
          className="w-5 h-5 text-white/90 group-hover:text-white transition-transform group-hover:rotate-45"
          strokeWidth={1.5}
        />
      ) : (
        <Moon
          className="w-5 h-5 text-white/90 group-hover:text-white transition-transform group-hover:-rotate-12"
          strokeWidth={1.5}
        />
      )}
    </button>
  );
};