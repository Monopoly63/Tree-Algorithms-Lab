// Tree Algorithms Lab - Main Page
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TreeNode } from "@/lib/tree";
import { TreeBuilder } from "@/modules/TreeBuilder";
import { TraversalVisualizer } from "@/modules/TraversalVisualizer";
import { MAryConverter } from "@/modules/MAryConverter";
import { NumericExpressionTree } from "@/modules/NumericExpressionTree";
import { SymbolicExpressionTree } from "@/modules/SymbolicExpressionTree";
import { TreeReconstructor } from "@/modules/TreeReconstructor";
import { AVLTree } from "@/modules/AVLTree";
import { DownloadBackend } from "@/components/DownloadBackend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TreePine,
  GitBranch,
  Workflow,
  Route,
  Calculator,
  Sigma,
  Puzzle,
  Scale,
  Instagram,
  GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { ExportTree } from "@/components/ExportTree";
import { Tutorial, hasSeenTutorial } from "@/components/Tutorial";

const INSTAGRAM_URL =
  "https://www.instagram.com/li0vy_?igsh=MXZ2czd3ODA3ejJ6ZA==";

const TAB_KEYS = [
  { value: "builder", step: "01", icon: TreePine },
  { value: "mary", step: "02", icon: Workflow },
  { value: "traversal", step: "03", icon: Route },
  { value: "reconstruct", step: "04", icon: Puzzle },
  { value: "numeric", step: "05", icon: Calculator },
  { value: "symbolic", step: "06", icon: Sigma },
  { value: "avl", step: "07", icon: Scale },
] as const;

const VALID_TABS = TAB_KEYS.map((t) => t.value) as readonly string[];

const Index: React.FC = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const urlTab = params.get("tab");
  const initialTab =
    urlTab && VALID_TABS.includes(urlTab) ? urlTab : "builder";

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [active, setActive] = useState<string>(initialTab);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsAnchorRef = useRef<HTMLDivElement>(null);

  // Sync URL when active tab changes (deep-linking from Theory page)
  useEffect(() => {
    if (params.get("tab") !== active) {
      const next = new URLSearchParams(params);
      next.set("tab", active);
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Scroll to tabs if URL already has a tab param on first render
  useEffect(() => {
    if (urlTab && VALID_TABS.includes(urlTab)) {
      const tid = window.setTimeout(() => {
        tabsAnchorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
      return () => window.clearTimeout(tid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-open tutorial on first visit
  useEffect(() => {
    if (!hasSeenTutorial()) {
      const tid = window.setTimeout(() => setTutorialOpen(true), 900);
      return () => window.clearTimeout(tid);
    }
  }, []);

  const activeMeta = TAB_KEYS.find((x) => x.value === active) ?? TAB_KEYS[0];

  const scrollToTabs = () => {
    tabsAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavigate = (tab: string) => {
    setActive(tab);
    window.setTimeout(scrollToTabs, 50);
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* ═══ HEADER ═══ */}
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

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1 glass p-1 rounded-xl">
            <span className="px-4 py-1.5 text-xs font-semibold text-white glass-strong rounded-lg">
              {t("nav.lab")}
            </span>
            <Link
              to="/theory"
              className="px-4 py-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.5} />
              {t("nav.theory")}
            </Link>
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

      {/* ═══ MAIN ═══ */}
      <main className="max-w-7xl mx-auto px-5 py-8 relative">
        <Hero onStart={scrollToTabs} onTutorial={() => setTutorialOpen(true)} />

        <FeatureCards onNavigate={handleNavigate} />

        {/* Anchor for smooth scroll */}
        <div ref={tabsAnchorRef} />

        <Breadcrumbs currentLabel={t(`tabs.${activeMeta.value}`)} />

        <Tabs value={active} onValueChange={setActive} className="w-full">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <TabsList className="glass-tabs h-auto flex flex-wrap gap-1 flex-1 min-w-[280px]">
              {TAB_KEYS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-1 min-w-[150px] flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[#666666] data-[state=active]:glass-tab-active transition-all"
                  >
                    <span className="text-[10px] font-mono opacity-70">
                      {tab.step}
                    </span>
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-xs font-semibold tracking-wide">
                      {t(`tabs.${tab.value}`)}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <ExportTree
              target={contentRef.current}
              tree={tree}
              filename={`tree-${active}`}
            />
          </div>

          <div className="mt-4" ref={contentRef}>
            <TabsContent value="builder" className="animate-fade-in-up">
              <TreeBuilder onTreeBuilt={setTree} currentTree={tree} />
            </TabsContent>
            <TabsContent value="mary" className="animate-fade-in-up">
              <MAryConverter />
            </TabsContent>
            <TabsContent value="traversal" className="animate-fade-in-up">
              <TraversalVisualizer tree={tree} />
            </TabsContent>
            <TabsContent value="reconstruct" className="animate-fade-in-up">
              <TreeReconstructor />
            </TabsContent>
            <TabsContent value="numeric" className="animate-fade-in-up">
              <NumericExpressionTree />
            </TabsContent>
            <TabsContent value="symbolic" className="animate-fade-in-up">
              <SymbolicExpressionTree />
            </TabsContent>
            <TabsContent value="avl" className="animate-fade-in-up">
              <AVLTree />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <SiteFooter onNavigate={handleNavigate} />

      <Tutorial open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
    </div>
  );
};

export default Index;