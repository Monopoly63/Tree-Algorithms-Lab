// Hero section for the landing page
import React from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, Play, BookOpen } from "lucide-react";

interface HeroProps {
  onStart?: () => void;
  onTutorial?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onTutorial }) => {
  const { t } = useTranslation();
  return (
    <section className="glass-card p-7 md:p-10 mb-6 animate-fade-in-up relative overflow-hidden">
      {/* Decorative blurred orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -end-24 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 text-[10px] uppercase text-[#a0a0a0] mb-4 glass px-3 py-1.5 rounded-full"
            style={{ letterSpacing: "0.25em" }}
          >
            <Sparkles className="w-3 h-3" strokeWidth={1.5} />
            {t("hero.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t("hero.title")}
          </h2>
          <p className="text-sm md:text-base text-[#a0a0a0] mt-3 max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onStart}
              className="glass-btn px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4" strokeWidth={1.5} />
              {t("hero.ctaStart")}
            </button>
            <button
              onClick={onTutorial}
              className="glass-btn px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 !bg-transparent hover:!bg-white/10"
            >
              <BookOpen className="w-4 h-4" strokeWidth={1.5} />
              {t("hero.ctaLearn")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#a0a0a0] glass px-3 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          {t("hero.liveBadge")}
        </div>
      </div>
    </section>
  );
};