// Tree Algorithms Lab - Main Page (Full Blur / Black-Gray theme)
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
import { TreePine, GitBranch, Workflow, Route, Calculator, Sigma } from "lucide-react";

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
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 glass-panel border-x-0 border-t-0 rounded-none">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg shadow-black/50">
              <GitBranch className="w-5 h-5 text-white" />
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
          <DownloadBackend />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 py-8">
        {/* Hero / Intro */}
        <section className="glass-card p-6 mb-6 animate-fade-in-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-2">
                Interactive Lab
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Visualize &amp; Explore Binary Trees
              </h2>
              <p className="text-sm text-white/60 mt-2 max-w-2xl">
                Build trees, run traversals, convert m-ary → BT → BST, and parse expression
                trees — all rendered in real-time with a sleek glass UI.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
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
                  className="flex-1 min-w-[160px] flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-white/10 transition-all"
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
      <footer className="mt-10">
        <div className="max-w-7xl mx-auto px-5 py-6">
          <div className="glass-card px-5 py-4 text-center text-[11px] text-white/40 tracking-wide">
            Project by{" "}
            <span className="text-white/80 font-medium">Abdulmoin Hablas</span> · Algorithms 3 ·
            Every algorithm written from scratch · Python backend available as ZIP
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;