// Tree Algorithms Lab - Tab 2: m-ary -> BT -> BST Converter
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { maryToBT, btToBST, inorderValues, genId, MaryNode, TreeNode } from "@/lib/tree";
import { layoutMaryTree, layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SAMPLE = `{
  "value": "A",
  "children": [
    { "value": "B", "children": [
      { "value": "E", "children": [] },
      { "value": "F", "children": [] }
    ]},
    { "value": "C", "children": [
      { "value": "G", "children": [] }
    ]},
    { "value": "D", "children": [] }
  ]
}`;

function assignIds(m: any): MaryNode {
  return {
    id: genId("m"),
    value: String(m.value),
    children: Array.isArray(m.children) ? m.children.map(assignIds) : [],
  };
}

export const MAryConverter: React.FC = () => {
  const [input, setInput] = useState(SAMPLE);
  const [mary, setMary] = useState<MaryNode | null>(null);
  const [bt, setBt] = useState<TreeNode | null>(null);
  const [bst, setBst] = useState<TreeNode | null>(null);
  const [beforeList, setBeforeList] = useState<string[]>([]);
  const [afterList, setAfterList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const maryTree = assignIds(parsed);
      const btTree = maryToBT(maryTree);
      const before = inorderValues(btTree);
      const bstTree = btToBST(btTree);
      const after = inorderValues(bstTree);
      setMary(maryTree);
      setBt(btTree);
      setBst(bstTree);
      setBeforeList(before);
      setAfterList(after);
    } catch (e: any) {
      setError(e.message || "Invalid JSON input");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">m-ary → BT → BST</h2>
          <Label className="text-slate-300">m-ary Tree JSON</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="bg-slate-900 border-slate-700 text-slate-100 font-mono text-xs"
          />
          <Button onClick={handleConvert} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Convert
          </Button>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
            Algorithm: Left-Child Right-Sibling → inorder → sort → rebuild BST
          </div>
        </div>
        <div className="md:col-span-2 grid md:grid-cols-3 gap-3">
          <TreeCanvas layout={layoutMaryTree(mary)} title="m-ary Tree" />
          <TreeCanvas layout={layoutBinaryTree(bt)} title="Binary Tree (LCRS)" />
          <TreeCanvas layout={layoutBinaryTree(bst)} title="BST" />
        </div>
      </div>
      {(beforeList.length > 0 || afterList.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Inorder BEFORE (of BT):</div>
            <div className="flex flex-wrap gap-2">
              {beforeList.map((v, i) => (
                <span key={i} className="px-2 py-1 rounded bg-slate-700 text-slate-100 font-mono text-sm">{v}</span>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-2">Inorder AFTER (of BST):</div>
            <div className="flex flex-wrap gap-2">
              {afterList.map((v, i) => (
                <span key={i} className="px-2 py-1 rounded bg-emerald-700 text-white font-mono text-sm">{v}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};