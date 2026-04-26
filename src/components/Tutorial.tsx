// Simple in-app tutorial overlay (no external library dependency)
import React, { useEffect, useState } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Step {
  titleKey: string;
  bodyKey: string;
}

const STEPS: Step[] = [
  { titleKey: "tutorial.welcome.title", bodyKey: "tutorial.welcome.body" },
  { titleKey: "tutorial.builder.title", bodyKey: "tutorial.builder.body" },
  { titleKey: "tutorial.traversal.title", bodyKey: "tutorial.traversal.body" },
  {
    titleKey: "tutorial.reconstruct.title",
    bodyKey: "tutorial.reconstruct.body",
  },
  { titleKey: "tutorial.export.title", bodyKey: "tutorial.export.body" },
  { titleKey: "tutorial.done.title", bodyKey: "tutorial.done.body" },
];

const STORAGE_KEY = "tal.tutorial.seen";

interface TutorialProps {
  open: boolean;
  onClose: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const handleFinish = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-up"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={handleFinish}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card p-6 md:p-8 max-w-md w-full relative"
      >
        <button
          onClick={handleFinish}
          className="absolute top-3 end-3 w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10"
          aria-label={t("actions.skip")}
        >
          <X className="w-4 h-4 text-white/80" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <div
            className="text-[10px] uppercase text-[#a0a0a0]"
            style={{ letterSpacing: "0.25em" }}
          >
            {step + 1} / {STEPS.length}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{t(current.titleKey)}</h3>
        <p className="text-sm text-[#a0a0a0] leading-relaxed mb-6">
          {t(current.bodyKey)}
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mb-5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === step
                  ? "w-6 bg-white/90"
                  : i < step
                  ? "w-3 bg-white/40"
                  : "w-3 bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleFinish}
            className="text-xs text-[#a0a0a0] hover:text-white transition-colors px-2 py-2"
          >
            {t("actions.skip")}
          </button>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" strokeWidth={1.5} />
                {t("actions.back")}
              </button>
            )}
            {isLast ? (
              <button
                onClick={handleFinish}
                className="glass-btn px-4 py-2 text-xs font-semibold"
              >
                {t("actions.finish")}
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                {t("actions.next")}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const hasSeenTutorial = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};