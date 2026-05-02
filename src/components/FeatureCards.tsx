// Interactive feature cards — shown on the landing hero area
import React from "react";
import {
  TreePine,
  Workflow,
  Route,
  Puzzle,
  Calculator,
  Sigma,
  Scale,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface FeatureCardsProps {
  onNavigate?: (tab: string) => void;
}

const FEATURES: { key: string; value: string; icon: React.ElementType }[] = [
  { key: "builder", value: "builder", icon: TreePine },
  { key: "mary", value: "mary", icon: Workflow },
  { key: "traversal", value: "traversal", icon: Route },
  { key: "reconstruct", value: "reconstruct", icon: Puzzle },
  { key: "numeric", value: "numeric", icon: Calculator },
  { key: "symbolic", value: "symbolic", icon: Sigma },
  { key: "avl", value: "avl", icon: Scale },
];

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
    <section className="mb-6">
      <div
        className="text-[10px] uppercase text-[#555555] mb-3 px-1"
        style={{ letterSpacing: "0.25em" }}
      >
        {t("misc.features")}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {FEATURES.map((f, idx) => {
          const Icon = f.icon;
          return (
            <button
              key={f.key}
              onClick={() => onNavigate?.(f.value)}
              className="glass-card p-4 text-start group animate-fade-in-up hover:-translate-y-0.5 transition-transform"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <ArrowRight
                  className="w-4 h-4 text-white/40 group-hover:text-white/90 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-xs font-semibold text-white tracking-wide">
                {t(`tabs.${f.key}`)}
              </div>
              <div
                className="text-[10px] uppercase text-[#555555] mt-1"
                style={{ letterSpacing: "0.15em" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};