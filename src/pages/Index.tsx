// Tree Algorithms Lab - Main Page (Premium Glass / Blur theme)
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
  Sparkles,
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
      {/* Header */}
      <header className="sticky top-0 z-30 glass-panel border-x-0 border-t-0 rounded-none">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl glass-strong flex items-center justify-center shadow-lg shadow-black/50">
              <GitBranch className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-pulse-glow"></span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white text-glow tracking-tight">
                Tree Algorithms Lab
              </h1>
              <p className="text-[11px] text-white/50 tracking-wider uppercase">
                Algorithms 3 · Abdulmoin Hablas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Instagram icon in header */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Follow on Instagram"
              className="group relative w-11 h-11 rounded-xl glass-card !rounded-xl insta-glow-hover flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-5 h-5 text-white/90 group-hover:text-white transition-colors relative z-10" />
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 insta-gradient transition-opacity"></span>
            </a>
            <DownloadBackend />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 py-8 relative">
        {/* Hero / Intro */}
        <section className="glass-card p-7 mb-6 animate-fade-in-up relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-40"></div>
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3">
                <Sparkles className="w-3 h-3" />
                Interactive Lab
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-glow">
                Visualize &amp; Explore Binary Trees
              </h2>
              <p className="text-sm text-white/60 mt-2 max-w-2xl leading-relaxed">
                Build trees, run traversals, convert m-ary → BT → BST, and parse expression
                trees — all rendered in real-time with a sleek glass UI.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/50 glass px-3 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All algorithms run locally in your browser
            </div>
          </div>
        </section>

        <Tabs value={active} onValueChange={setActive} className="w-full">
          {/* Professional Step Tabs */}
          <TabsList className="glass-panel h-auto p-1.5 flex flex-wrap gap-1 w-full">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="flex-1 min-w-[160px] flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-white/20 transition-all"
                >
                  <span className="text-[10px] font-mono opacity-70">{t.step}</span>
                  <Icon className="w-4 h-4" />
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

      {/* Footer */}
      <footer className="mt-12 relative">
        {/* Luminous top border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* About */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">Tree Algorithms Lab</span>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed">
                  Every algorithm written from scratch. Python backend available as ZIP.
                </p>
              </div>

              {/* Connect - Instagram */}
              <div className="md:col-span-1 md:text-center">
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3">
                  Follow Me
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card insta-glow-hover group transition-all duration-300 hover:scale-[1.03]"
                >
                  <span className="w-9 h-9 rounded-lg insta-gradient flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <Instagram className="w-4 h-4 text-white" />
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Instagram</div>
                    <div className="text-sm font-semibold text-white group-hover:text-glow transition-all">
                      {INSTAGRAM_HANDLE}
                    </div>
                  </div>
                </a>
              </div>

              {/* Credits */}
              <div className="md:col-span-1 md:text-right">
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  Credits
                </div>
                <div className="text-sm text-white/80 font-medium">Abdulmoin Hablas</div>
                <div className="text-[12px] text-white/50 mt-0.5">Algorithms 3 · 2026</div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 text-center text-[11px] text-white/40 tracking-wide">
              © 2026 Tree Algorithms Lab · Built with React · TypeScript · Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;