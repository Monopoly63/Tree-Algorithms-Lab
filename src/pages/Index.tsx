// Tree Algorithms Lab - Main Page
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
import { TreePine } from "lucide-react";

const Index: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">Tree Algorithms Lab</h1>
              <p className="text-xs text-slate-400">Algorithms 3 · Abdulmoin Hablas</p>
            </div>
          </div>
          <DownloadBackend />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="bg-slate-800 border border-slate-700 flex flex-wrap h-auto">
            <TabsTrigger value="builder" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              1. Tree Builder
            </TabsTrigger>
            <TabsTrigger value="mary" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              2. m-ary → BT → BST
            </TabsTrigger>
            <TabsTrigger value="traversal" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              3. Traversal Visualizer
            </TabsTrigger>
            <TabsTrigger value="numeric" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              4. Numeric Expression
            </TabsTrigger>
            <TabsTrigger value="symbolic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              5. Symbolic Expression
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-4">
            <TreeBuilder onTreeBuilt={setTree} currentTree={tree} />
          </TabsContent>
          <TabsContent value="mary" className="mt-4">
            <MAryConverter />
          </TabsContent>
          <TabsContent value="traversal" className="mt-4">
            <TraversalVisualizer tree={tree} />
          </TabsContent>
          <TabsContent value="numeric" className="mt-4">
            <NumericExpressionTree />
          </TabsContent>
          <TabsContent value="symbolic" className="mt-4">
            <SymbolicExpressionTree />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-slate-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
          Project by <span className="text-slate-300 font-medium">Abdulmoin Hablas</span> · Algorithms 3 ·
          All tree algorithms implemented from scratch (TypeScript in browser + Python backend in ZIP)
        </div>
      </footer>
    </div>
  );
};

export default Index;