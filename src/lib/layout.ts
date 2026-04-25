// Tree Algorithms Lab - Tree Layout
// Student: Abdulmoin Hablas | Course: Algorithms 3
import { TreeNode, MaryNode } from "./tree";

export interface PositionedNode {
  id: string;
  value: string;
  x: number;
  y: number;
  kind?: string;
}

export interface PositionedEdge {
  from: { x: number; y: number };
  to: { x: number; y: number };
  id: string;
}

export interface LayoutResult {
  nodes: PositionedNode[];
  edges: PositionedEdge[];
  width: number;
  height: number;
}

const LEVEL_HEIGHT = 80;
const NODE_SPACING = 60;

export function layoutBinaryTree(root: TreeNode | null): LayoutResult {
  const nodes: PositionedNode[] = [];
  const edges: PositionedEdge[] = [];
  if (!root) return { nodes, edges, width: 200, height: 100 };

  let x = 0;
  const positions = new Map<string, { x: number; y: number }>();

  const assign = (n: TreeNode | null, depth: number) => {
    if (!n) return;
    assign(n.left, depth + 1);
    const px = x * NODE_SPACING + 40;
    const py = depth * LEVEL_HEIGHT + 40;
    positions.set(n.id, { x: px, y: py });
    nodes.push({ id: n.id, value: n.value, x: px, y: py, kind: n.kind });
    x += 1;
    assign(n.right, depth + 1);
  };
  assign(root, 0);

  const addEdges = (n: TreeNode | null) => {
    if (!n) return;
    const p = positions.get(n.id)!;
    if (n.left) {
      const c = positions.get(n.left.id)!;
      edges.push({ from: p, to: c, id: `${n.id}-${n.left.id}` });
      addEdges(n.left);
    }
    if (n.right) {
      const c = positions.get(n.right.id)!;
      edges.push({ from: p, to: c, id: `${n.id}-${n.right.id}` });
      addEdges(n.right);
    }
  };
  addEdges(root);

  const width = Math.max(200, x * NODE_SPACING + 40);
  const maxDepth = nodes.reduce((m, n) => Math.max(m, n.y), 0);
  const height = maxDepth + 80;
  return { nodes, edges, width, height };
}

export function layoutMaryTree(root: MaryNode | null): LayoutResult {
  const nodes: PositionedNode[] = [];
  const edges: PositionedEdge[] = [];
  if (!root) return { nodes, edges, width: 200, height: 100 };

  let leafX = 0;
  const positions = new Map<string, { x: number; y: number }>();

  const assign = (n: MaryNode, depth: number): number => {
    const py = depth * LEVEL_HEIGHT + 40;
    let cx: number;
    if (n.children.length === 0) {
      cx = leafX * NODE_SPACING + 40;
      leafX += 1;
    } else {
      const childXs = n.children.map((c) => assign(c, depth + 1));
      cx = (Math.min(...childXs) + Math.max(...childXs)) / 2;
    }
    positions.set(n.id, { x: cx, y: py });
    nodes.push({ id: n.id, value: n.value, x: cx, y: py, kind: "default" });
    return cx;
  };
  assign(root, 0);

  const addEdges = (n: MaryNode) => {
    const p = positions.get(n.id)!;
    for (const c of n.children) {
      const cp = positions.get(c.id)!;
      edges.push({ from: p, to: cp, id: `${n.id}-${c.id}` });
      addEdges(c);
    }
  };
  addEdges(root);

  const width = Math.max(200, leafX * NODE_SPACING + 40);
  const maxDepth = nodes.reduce((m, n) => Math.max(m, n.y), 0);
  const height = maxDepth + 80;
  return { nodes, edges, width, height };
}