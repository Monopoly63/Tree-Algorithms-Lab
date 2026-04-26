// Breadcrumb navigation for the current active tab
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BreadcrumbsProps {
  currentLabel: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentLabel }) => {
  const { t } = useTranslation();
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[11px] text-[#a0a0a0] mb-4 px-1"
    >
      <a
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <Home className="w-3 h-3" strokeWidth={1.5} />
        <span className="uppercase" style={{ letterSpacing: "0.15em" }}>
          {t("breadcrumb.home")}
        </span>
      </a>
      <ChevronRight
        className="w-3 h-3 text-[#555555] rtl:rotate-180"
        strokeWidth={1.5}
      />
      <span
        className="uppercase text-white/90 font-semibold"
        style={{ letterSpacing: "0.15em" }}
      >
        {currentLabel}
      </span>
    </nav>
  );
};