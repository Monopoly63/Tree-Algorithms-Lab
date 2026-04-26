// Theory Page — dedicated page for the theoretical explanation
// of every algorithm in the lab, organized as lectures.
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  ChevronRight,
  Home,
  ArrowLeft,
  ArrowRight,
  Clock,
  Boxes,
  GitBranch,
  Lightbulb,
  Target,
  Instagram,
  GraduationCap,
} from "lucide-react";
import {
  lectures,
  type Lecture,
  type LabTab,
  type LectureSection,
} from "@/data/lectures";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DownloadBackend } from "@/components/DownloadBackend";
import { SiteFooter } from "@/components/SiteFooter";

const INSTAGRAM_URL =
  "https://www.instagram.com/li0vy_?igsh=MXZ2czd3ODA3ejJ6ZA==";

type Lang = "en" | "ar";

const localize = <T extends { en: string; ar: string }>(
  obj: T,
  lang: Lang,
): string => obj[lang] ?? obj.en;

const accentClass = (accent: Lecture["accent"]): string => {
  switch (accent) {
    case "cyan":
      return "chip-cyan";
    case "purple":
      return "chip-purple";
    case "pink":
      return "chip-pink";
    default:
      return "chip-cyan";
  }
};

interface LectureViewProps {
  lecture: Lecture;
  lang: Lang;
  onOpenLab: (tab?: LabTab) => void;
  onPrev?: () => void;
  onNext?: () => void;
  total: number;
}

const SectionBlock: React.FC<{ section: LectureSection; lang: Lang }> = ({
  section,
  lang,
}) => (
  <div className="glass-card p-6 md:p-7">
    <h3 className="text-base md:text-lg font-bold text-white mb-3">
      {localize(section.heading, lang)}
    </h3>
    <div className="theory-prose">
      {section.paragraphs.map((p, i) => (
        <p key={i}>{localize(p, lang)}</p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul>
          {section.bullets.map((b, i) => (
            <li key={i}>{localize(b, lang)}</li>
          ))}
        </ul>
      )}
      {section.code && (
        <pre>
          <code>{section.code}</code>
        </pre>
      )}
    </div>
  </div>
);

const LectureView: React.FC<LectureViewProps> = ({
  lecture,
  lang,
  onOpenLab,
  onPrev,
  onNext,
  total,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5 animate-fade-in-up" key={lecture.id}>
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono ${accentClass(
              lecture.accent,
            )}`}
            style={{ letterSpacing: "0.15em" }}
          >
            {localize(lecture.tag, lang)}
          </span>
          <span
            className="text-[10px] uppercase text-[#a0a0a0]"
            style={{ letterSpacing: "0.25em" }}
          >
            {String(lecture.number).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          {localize(lecture.title, lang)}
        </h2>
        <p className="mt-2 text-[14px] text-[#a0a0a0] leading-relaxed">
          {localize(lecture.summary, lang)}
        </p>

        {lecture.labTab && (
          <div className="mt-5">
            <button
              onClick={() => onOpenLab(lecture.labTab)}
              className="glass-btn px-4 py-2 text-xs font-semibold inline-flex items-center gap-2"
            >
              <Target className="w-3.5 h-3.5" strokeWidth={1.5} />
              {t("theory.sections.tryIt")}
              <ArrowRight
                className="w-3.5 h-3.5 rtl:rotate-180"
                strokeWidth={1.5}
              />
            </button>
          </div>
        )}
      </div>

      {lecture.sections.map((sec, i) => (
        <SectionBlock key={i} section={sec} lang={lang} />
      ))}

      {lecture.complexity && lecture.complexity.length > 0 && (
        <div className="glass-card p-6 md:p-7">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("theory.sections.complexity")}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start">
              <thead>
                <tr
                  className="text-[10px] uppercase text-[#888]"
                  style={{ letterSpacing: "0.15em" }}
                >
                  <th className="text-start font-semibold py-2 px-3">
                    {lang === "ar" ? "العملية" : "Operation"}
                  </th>
                  <th className="text-start font-semibold py-2 px-3">
                    {lang === "ar" ? "الزمن" : "Time"}
                  </th>
                  <th className="text-start font-semibold py-2 px-3">
                    {lang === "ar" ? "الذاكرة" : "Space"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {lecture.complexity.map((row, idx) => (
                  <tr
                    key={idx}
                    className="text-[13px] border-t"
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <td className="py-2.5 px-3 text-white/90">
                      {localize(row.label, lang)}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-white/90">
                      {row.time}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-white/90">
                      {row.space}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {lecture.examples && lecture.examples.length > 0 && (
        <div className="glass-card p-6 md:p-7">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("theory.sections.examples")}
            </h3>
          </div>
          <ul className="theory-prose">
            {lecture.examples.map((ex, i) => (
              <li key={i}>{localize(ex, lang)}</li>
            ))}
          </ul>
        </div>
      )}

      {lecture.applications && lecture.applications.length > 0 && (
        <div className="glass-card p-6 md:p-7">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
              <Boxes className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("theory.sections.applications")}
            </h3>
          </div>
          <ul className="theory-prose">
            {lecture.applications.map((ap, i) => (
              <li key={i}>{localize(ap, lang)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onPrev}
          disabled={!onPrev}
          className="glass-btn px-4 py-2.5 text-xs font-semibold inline-flex items-center gap-2 disabled:opacity-40"
        >
          <ArrowLeft
            className="w-3.5 h-3.5 rtl:rotate-180"
            strokeWidth={1.5}
          />
          {t("actions.previous")}
        </button>
        <button
          onClick={onNext}
          disabled={!onNext}
          className="glass-btn px-4 py-2.5 text-xs font-semibold inline-flex items-center gap-2 disabled:opacity-40"
        >
          {t("actions.next")}
          <ArrowRight
            className="w-3.5 h-3.5 rtl:rotate-180"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
};

const Theory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const urlLectureId = params.get("lecture");

  const initialIdx = useMemo(() => {
    if (!urlLectureId) return 0;
    const idx = lectures.findIndex((l) => l.id === urlLectureId);
    return idx >= 0 ? idx : 0;
  }, [urlLectureId]);

  const [activeIdx, setActiveIdx] = useState<number>(initialIdx);

  useEffect(() => {
    const id = lectures[activeIdx]?.id;
    if (id && params.get("lecture") !== id) {
      setParams({ lecture: id }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  useEffect(() => {
    if (!urlLectureId) return;
    const idx = lectures.findIndex((l) => l.id === urlLectureId);
    if (idx >= 0 && idx !== activeIdx) {
      setActiveIdx(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLectureId]);

  const lecture = lectures[activeIdx];
  const total = lectures.length;

  const goToLab = (tab?: LabTab) => {
    if (tab) {
      navigate(`/?tab=${tab}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      <header className="sticky top-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl glass-strong flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse-glow"></span>
            </div>
            <div>
              <h1
                className="text-base md:text-lg font-semibold text-white"
                style={{ letterSpacing: "0.05em" }}
              >
                {t("brand.title")}
              </h1>
              <p
                className="text-[10px] text-[#a0a0a0] uppercase mt-0.5"
                style={{ letterSpacing: "0.15em" }}
              >
                {t("brand.subtitle")}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 glass p-1 rounded-xl">
            <Link
              to="/"
              className="px-4 py-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white rounded-lg transition-colors"
            >
              {t("nav.lab")}
            </Link>
            <span className="px-4 py-1.5 text-xs font-semibold text-white glass-strong rounded-lg">
              {t("nav.theory")}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @li0vy_"
              title="Follow @li0vy_"
              className="group w-11 h-11 rounded-xl glass hidden sm:flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-white/25"
              style={{ borderRadius: "10px" }}
            >
              <Instagram
                className="w-5 h-5 text-white/90 group-hover:text-white transition-colors"
                strokeWidth={1.5}
              />
            </a>
            <DownloadBackend />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8 relative">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] text-[#a0a0a0] mb-5 px-1"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Home className="w-3 h-3" strokeWidth={1.5} />
            <span className="uppercase" style={{ letterSpacing: "0.15em" }}>
              {t("breadcrumb.home")}
            </span>
          </Link>
          <ChevronRight
            className="w-3 h-3 text-[#666] rtl:rotate-180"
            strokeWidth={1.5}
          />
          <span
            className="uppercase text-white/90 font-semibold"
            style={{ letterSpacing: "0.15em" }}
          >
            {t("breadcrumb.theory")}
          </span>
        </nav>

        <section className="glass-card p-7 md:p-10 mb-6 animate-fade-in-up relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -end-24 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div className="relative flex items-start gap-4 flex-wrap justify-between">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 text-[10px] uppercase text-[#a0a0a0] mb-4 glass px-3 py-1.5 rounded-full"
                style={{ letterSpacing: "0.25em" }}
              >
                <GraduationCap className="w-3 h-3" strokeWidth={1.5} />
                {t("nav.theory")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                {t("theory.pageTitle")}
              </h2>
              <p className="text-sm md:text-base text-[#a0a0a0] mt-3 max-w-2xl leading-relaxed">
                {t("theory.pageSubtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#a0a0a0] glass px-3 py-2 rounded-full">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
              {total} {t("theory.lecturesLabel")}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          <aside className="lg:sticky lg:top-[96px] self-start">
            <div className="glass-panel p-3">
              <div
                className="text-[10px] uppercase text-[#666] mb-3 px-3 pt-1"
                style={{ letterSpacing: "0.25em" }}
              >
                {t("theory.lecturesLabel")}
              </div>
              <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {lectures.map((lec, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <li key={lec.id}>
                      <button
                        onClick={() => setActiveIdx(idx)}
                        className={[
                          "w-full text-start px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 group",
                          isActive
                            ? "glass-strong"
                            : "hover:bg-white/5 border border-transparent",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-mono shrink-0 mt-0.5",
                            isActive
                              ? "glass-strong text-white"
                              : "glass text-[#a0a0a0] group-hover:text-white",
                          ].join(" ")}
                        >
                          {String(lec.number).padStart(2, "0")}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span
                            className={[
                              "block text-[13px] font-semibold leading-snug",
                              isActive ? "text-white" : "text-white/85",
                            ].join(" ")}
                          >
                            {localize(lec.title, lang)}
                          </span>
                          <span
                            className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] ${accentClass(
                              lec.accent,
                            )}`}
                            style={{ letterSpacing: "0.1em" }}
                          >
                            {localize(lec.tag, lang)}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <article className="min-w-0">
            <LectureView
              lecture={lecture}
              lang={lang}
              onOpenLab={goToLab}
              onPrev={
                activeIdx > 0 ? () => setActiveIdx(activeIdx - 1) : undefined
              }
              onNext={
                activeIdx < total - 1
                  ? () => setActiveIdx(activeIdx + 1)
                  : undefined
              }
              total={total}
            />
          </article>
        </div>
      </main>

      <SiteFooter
        onNavigate={(tab) => {
          navigate(`/?tab=${tab}`);
        }}
      />
    </div>
  );
};

export default Theory;