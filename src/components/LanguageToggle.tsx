// Language toggle — English ↔ Arabic
import React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith("ar") ? "ar" : "en";
  const next = current === "ar" ? "en" : "ar";

  const handleClick = () => {
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={t("language.toggle")}
      title={t("language.toggle")}
      className="group h-11 px-3 rounded-xl glass flex items-center gap-2 transition-all duration-200 hover:bg-white/10 hover:border-white/25"
      style={{ borderRadius: "10px" }}
    >
      <Languages className="w-4 h-4 text-white/90" strokeWidth={1.5} />
      <span className="text-xs font-semibold text-white/90 tracking-wide">
        {current === "ar" ? "EN" : "AR"}
      </span>
    </button>
  );
};