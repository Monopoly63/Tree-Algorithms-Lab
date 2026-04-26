// Site footer
import React from "react";
import { Link } from "react-router-dom";
import {
  GitBranch,
  Instagram,
  Heart,
  GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const INSTAGRAM_URL =
  "https://www.instagram.com/li0vy_?igsh=MXZ2czd3ODA3ejJ6ZA==";
const INSTAGRAM_HANDLE = "@li0vy_";

interface SiteFooterProps {
  onNavigate?: (tab: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const tabKeys = [
    "builder",
    "mary",
    "traversal",
    "reconstruct",
    "numeric",
    "symbolic",
  ];

  return (
    <footer className="mt-12 relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="glass-panel p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {/* About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold text-white">
                  {t("brand.title")}
                </span>
              </div>
              <p className="text-[12px] text-[#a0a0a0] leading-relaxed max-w-md">
                {t("footer.aboutText")}
              </p>

              <Link
                to="/theory"
                className="mt-4 inline-flex items-center gap-2 px-3 py-2 glass rounded-lg text-[12px] font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("footer.theory")}
              </Link>
            </div>

            {/* Resources */}
            <div>
              <div
                className="text-[10px] uppercase text-[#555555] mb-3"
                style={{ letterSpacing: "0.25em" }}
              >
                {t("footer.resources")}
              </div>
              <ul className="space-y-1.5">
                {tabKeys.map((k) => (
                  <li key={k}>
                    <button
                      onClick={() => onNavigate?.(k)}
                      className="text-[12px] text-[#a0a0a0] hover:text-white transition-colors"
                    >
                      {t(`tabs.${k}`)}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/theory"
                    className="text-[12px] text-[#a0a0a0] hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3 h-3" strokeWidth={1.5} />
                    {t("footer.theory")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Me */}
            <div>
              <div
                className="text-[10px] uppercase text-[#555555] mb-3"
                style={{ letterSpacing: "0.25em" }}
              >
                {t("footer.followMe")}
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-3 py-2.5 glass-card group transition-all duration-200 hover:bg-white/10 w-full"
                style={{ borderRadius: "12px" }}
              >
                <span className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-white" strokeWidth={1.5} />
                </span>
                <div className="text-start overflow-hidden">
                  <div
                    className="text-[10px] uppercase text-[#a0a0a0]"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    Instagram
                  </div>
                  <div className="text-sm font-semibold text-white truncate">
                    {INSTAGRAM_HANDLE}
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div
            className="mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#555555]"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-1.5">
              <span>© 2026 {t("footer.rights")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{t("footer.madeWith")}</span>
              <Heart className="w-3 h-3 text-white/70" strokeWidth={1.5} />
              <span>{t("footer.by")} Abdulmoin Hablas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};