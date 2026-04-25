// Tree Algorithms Lab - Main Page (Pure Black/White Glassmorphism)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { TreeNode } from "@/lib/tree";
import { TreeBuilder } from "@/modules/TreeBuilder";
import { TraversalVisualizer } from "@/modules/TraversalVisualizer";
import { MAryConverter } from "@/modules/MAryConverter";
import { NumericExpressionTree } from "@/modules/NumericExpressionTree";
import { SymbolicExpressionTree } from "@/modules/SymbolicExpressionTree";
import { DownloadBackend } from "@/components/DownloadBackend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TreePine,
  GitBranch,
  Workflow,
  Route,
  Calculator,
  Sigma,
  Instagram,
} from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/li0vy_?igsh=MXZ2czd3ODA3ejJ6ZA==";
const INSTAGRAM_HANDLE = "@li0vy_";

const TABS = [
  { value: "builder", label: "Tree Builder", step: "01", icon: TreePine },
  { value: "mary", label: "m-ary → BT → BST", step: "02", icon: Workflow },
  { value: "traversal", label: "Traversal Visualizer", step: "03", icon: Route },
  { value: "numeric", label: "Numeric Expression", step: "04", icon: Calculator },
  { value: "symbolic", label: "Symbolic Expression", step: "05", icon: Sigma },
];

const Index: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [active, setActive] = useState("builder");

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
                TREE ALGORITHMS LAB
              </h1>
              <p
                className="text-[10px] text-[#a0a0a0] uppercase mt-0.5"
                style={{ letterSpacing: "0.15em" }}
              >
                Algorithms 3 · Abdulmoin Hablas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Instagram — pure white, no gradient */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @li0vy_"
              title="Follow @li0vy_"
              className="group w-11 h-11 rounded-xl glass flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-white/25"
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
        {/* Hero */}
        <section className="glass-card p-7 mb-6 animate-fade-in-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div
                className="text-[10px] uppercase text-[#555555] mb-3"
                style={{ letterSpacing: "0.3em" }}
              >
                Interactive Lab
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Visualize &amp; Explore Binary Trees
              </h2>
              <p className="text-sm text-[#a0a0a0] mt-2 max-w-2xl leading-relaxed">
                Build trees, run traversals, convert m-ary → BT → BST, and parse expression
                trees — all rendered in real-time.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#a0a0a0] glass px-3 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Running locally in your browser
            </div>
          </div>
        </section>

        <Tabs value={active} onValueChange={setActive} className="w-full">
          <TabsList className="glass-tabs h-auto flex flex-wrap gap-1 w-full">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="flex-1 min-w-[160px] flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] text-[#666666] data-[state=active]:glass-tab-active transition-all"
                >
                  <span className="text-[10px] font-mono opacity-70">{t.step}</span>
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-xs font-semibold tracking-wide">{t.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="builder" className="animate-fade-in-up">
              <TreeBuilder onTreeBuilt={setTree} currentTree={tree} />
            </TabsContent>
            <TabsContent value="mary" className="animate-fade-in-up">
              <MAryConverter />
            </TabsContent>
            <TabsContent value="traversal" className="animate-fade-in-up">
              <TraversalVisualizer tree={tree} />
            </TabsContent>
            <TabsContent value="numeric" className="animate-fade-in-up">
              <NumericExpressionTree />
            </TabsContent>
            <TabsContent value="symbolic" className="animate-fade-in-up">
              <SymbolicExpressionTree />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="mt-12 relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="glass-panel p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* About */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Tree Algorithms Lab
                  </span>
                </div>
                <p className="text-[12px] text-[#a0a0a0] leading-relaxed">
                  Every algorithm written from scratch. Python backend available as ZIP.
                </p>
              </div>

              {/* Instagram */}
              <div className="md:text-center">
                <div
                  className="text-[10px] uppercase text-[#555555] mb-3"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Follow Me
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2.5 glass-card group transition-all duration-200 hover:bg-white/10"
                  style={{ borderRadius: "12px" }}
                >
                  <span className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </span>
                  <div className="text-left">
                    <div
                      className="text-[10px] uppercase text-[#a0a0a0]"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      Instagram
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {INSTAGRAM_HANDLE}
                    </div>
                  </div>
                </a>
              </div>

              {/* Credits */}
              <div className="md:text-right">
                <div
                  className="text-[10px] uppercase text-[#555555] mb-2"
                  style={{ letterSpacing: "0.3em" }}
                >
                  Credits
                </div>
                <div className="text-sm text-white font-medium">Abdulmoin Hablas</div>
                <div className="text-[12px] text-[#a0a0a0] mt-0.5">Algorithms 3 · 2026</div>
              </div>
            </div>

            <div
              className="mt-6 pt-5 border-t text-center text-[11px] text-[#555555]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              © 2026 Tree Algorithms Lab · Built with React · TypeScript · Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;