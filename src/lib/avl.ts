// Tree Algorithms Lab - AVL Tree Algorithms
// Student: Abdulmoin Hablas | Course: Algorithms 3

import { TreeNode, genId } from "./tree";

// ─── AVLNode Interface ───────────────────────────────────────
export interface AVLNode {
  id: string;
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

// ─── Rotation Step (for history log) ─────────────────────────
export interface RotationStep {
  type: "LL" | "RR" | "LR" | "RL";
  node: number;
  description: string;
}

// ─── Helper Functions ────────────────────────────────────────

export function getHeight(node: AVLNode | null): number {
  return node ? node.height : 0;
}

export function getBalanceFactor(node: AVLNode | null): number {
  if (!node) return 0;
  return getHeight(node.left) - getHeight(node.right);
}

function updateHeight(node: AVLNode): void {
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

// ─── Rotations ───────────────────────────────────────────────

/** Right rotation (LL case) */
function rotateRight(y: AVLNode): AVLNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

/** Left rotation (RR case) */
function rotateLeft(x: AVLNode): AVLNode {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

// ─── Rotation History Tracking ───────────────────────────────

let _rotationSteps: RotationStep[] = [];

export function getRotationSteps(): RotationStep[] {
  return [..._rotationSteps];
}

export function clearRotationSteps(): void {
  _rotationSteps = [];
}

// ─── AVL Insert ──────────────────────────────────────────────

function makeAVLNode(value: number): AVLNode {
  return {
    id: genId("avl"),
    value,
    left: null,
    right: null,
    height: 1,
  };
}

export function avlInsert(root: AVLNode | null, value: number): AVLNode {
  if (!root) return makeAVLNode(value);

  if (value < root.value) {
    root.left = avlInsert(root.left, value);
  } else if (value > root.value) {
    root.right = avlInsert(root.right, value);
  } else {
    // Duplicate — ignore
    return root;
  }

  updateHeight(root);
  const bf = getBalanceFactor(root);

  // Left-Left (LL)
  if (bf > 1 && root.left && value < root.left.value) {
    _rotationSteps.push({
      type: "LL",
      node: root.value,
      description: `Right rotation at node ${root.value} (LL case)`,
    });
    return rotateRight(root);
  }

  // Right-Right (RR)
  if (bf < -1 && root.right && value > root.right.value) {
    _rotationSteps.push({
      type: "RR",
      node: root.value,
      description: `Left rotation at node ${root.value} (RR case)`,
    });
    return rotateLeft(root);
  }

  // Left-Right (LR)
  if (bf > 1 && root.left && value > root.left.value) {
    _rotationSteps.push({
      type: "LR",
      node: root.value,
      description: `Left rotation at ${root.left.value}, then right rotation at ${root.value} (LR case)`,
    });
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }

  // Right-Left (RL)
  if (bf < -1 && root.right && value < root.right.value) {
    _rotationSteps.push({
      type: "RL",
      node: root.value,
      description: `Right rotation at ${root.right.value}, then left rotation at ${root.value} (RL case)`,
    });
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
}

// ─── AVL Delete ──────────────────────────────────────────────

function minValueNode(node: AVLNode): AVLNode {
  let current = node;
  while (current.left) current = current.left;
  return current;
}

export function avlDelete(root: AVLNode | null, value: number): AVLNode | null {
  if (!root) return null;

  if (value < root.value) {
    root.left = avlDelete(root.left, value);
  } else if (value > root.value) {
    root.right = avlDelete(root.right, value);
  } else {
    // Node found
    if (!root.left || !root.right) {
      root = root.left ?? root.right;
      if (!root) return null;
    } else {
      const successor = minValueNode(root.right);
      root.value = successor.value;
      root.id = successor.id;
      root.right = avlDelete(root.right, successor.value);
    }
  }

  updateHeight(root);
  const bf = getBalanceFactor(root);

  // Left-Left (LL)
  if (bf > 1 && getBalanceFactor(root.left) >= 0) {
    _rotationSteps.push({
      type: "LL",
      node: root.value,
      description: `Right rotation at node ${root.value} (LL case after delete)`,
    });
    return rotateRight(root);
  }

  // Left-Right (LR)
  if (bf > 1 && root.left && getBalanceFactor(root.left) < 0) {
    _rotationSteps.push({
      type: "LR",
      node: root.value,
      description: `Left rotation at ${root.left.value}, then right rotation at ${root.value} (LR case after delete)`,
    });
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }

  // Right-Right (RR)
  if (bf < -1 && getBalanceFactor(root.right) <= 0) {
    _rotationSteps.push({
      type: "RR",
      node: root.value,
      description: `Left rotation at node ${root.value} (RR case after delete)`,
    });
    return rotateLeft(root);
  }

  // Right-Left (RL)
  if (bf < -1 && root.right && getBalanceFactor(root.right) > 0) {
    _rotationSteps.push({
      type: "RL",
      node: root.value,
      description: `Right rotation at ${root.right.value}, then left rotation at ${root.value} (RL case after delete)`,
    });
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
}

// ─── AVL Search ──────────────────────────────────────────────

export function avlSearch(root: AVLNode | null, value: number): AVLNode | null {
  if (!root) return null;
  if (value === root.value) return root;
  if (value < root.value) return avlSearch(root.left, value);
  return avlSearch(root.right, value);
}

// ─── Convert AVLNode → TreeNode (for rendering) ─────────────

export function toTreeNode(avlRoot: AVLNode | null): TreeNode | null {
  if (!avlRoot) return null;
  return {
    id: avlRoot.id,
    value: String(avlRoot.value),
    left: toTreeNode(avlRoot.left),
    right: toTreeNode(avlRoot.right),
    kind: "default",
  };
}

// ─── Build AVL from array ────────────────────────────────────

export function buildAVL(values: number[]): AVLNode | null {
  let root: AVLNode | null = null;
  for (const v of values) {
    root = avlInsert(root, v);
  }
  return root;
}

// ─── Collect balance factors for display ─────────────────────

export interface NodeBalanceInfo {
  id: string;
  value: number;
  balanceFactor: number;
  height: number;
}

export function collectBalanceInfo(root: AVLNode | null): NodeBalanceInfo[] {
  const result: NodeBalanceInfo[] = [];
  const walk = (node: AVLNode | null) => {
    if (!node) return;
    result.push({
      id: node.id,
      value: node.value,
      balanceFactor: getBalanceFactor(node),
      height: node.height,
    });
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return result;
}

// ─── Plain BST Insert (no balancing) ─────────────────────────

export function bstInsert(root: AVLNode | null, value: number): AVLNode {
  if (!root) return makeAVLNode(value);
  if (value < root.value) {
    root.left = bstInsert(root.left, value);
  } else if (value > root.value) {
    root.right = bstInsert(root.right, value);
  }
  updateHeight(root);
  return root;
}

export function buildUnbalancedBST(values: number[]): AVLNode | null {
  let root: AVLNode | null = null;
  for (const v of values) {
    root = bstInsert(root, v);
  }
  return root;
}

// ─── Find imbalanced node IDs ────────────────────────────────

export function findImbalancedNodes(root: AVLNode | null): string[] {
  const ids: string[] = [];
  const walk = (node: AVLNode | null) => {
    if (!node) return;
    if (Math.abs(getBalanceFactor(node)) > 1) {
      ids.push(node.id);
    }
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return ids;
}

// ─── AVL Fix Step (one rotation at a time) ───────────────────

export interface FixStepResult {
  newRoot: AVLNode;
  step: RotationStep;
}

/**
 * Deep-clone an AVLNode tree so mutations don't affect the original.
 */
function cloneAVL(node: AVLNode | null): AVLNode | null {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    left: cloneAVL(node.left),
    right: cloneAVL(node.right),
    height: node.height,
  };
}

/** Recursively update heights in post-order. */
function updateHeightsPostOrder(node: AVLNode | null): void {
  if (!node) return;
  updateHeightsPostOrder(node.left);
  updateHeightsPostOrder(node.right);
  updateHeight(node);
}

/**
 * Find the deepest imbalanced node (post-order) and apply ONE rotation.
 * Returns null if the tree is already balanced.
 */
export function avlFixStep(root: AVLNode | null): FixStepResult | null {
  if (!root) return null;

  // Clone the tree so we can mutate safely
  const cloned = cloneAVL(root)!;

  // Post-order traversal to find the deepest imbalanced node
  let target: { node: AVLNode; parent: AVLNode | null; direction: "left" | "right" | "root" } | null = null;

  const findDeepest = (
    node: AVLNode | null,
    parent: AVLNode | null,
    dir: "left" | "right" | "root",
  ) => {
    if (!node) return;
    findDeepest(node.left, node, "left");
    findDeepest(node.right, node, "right");
    if (Math.abs(getBalanceFactor(node)) > 1 && !target) {
      target = { node, parent, direction: dir };
    }
  };

  findDeepest(cloned, null, "root");

  if (!target) return null;

  const { node: imbalanced, parent, direction } = target;
  const bf = getBalanceFactor(imbalanced);
  let rotated: AVLNode;
  let step: RotationStep;

  if (bf > 1) {
    // Left-heavy
    const leftBf = getBalanceFactor(imbalanced.left);
    if (leftBf >= 0) {
      step = {
        type: "LL",
        node: imbalanced.value,
        description: `Right rotation at node ${imbalanced.value} (LL case)`,
      };
      rotated = rotateRight(imbalanced);
    } else {
      step = {
        type: "LR",
        node: imbalanced.value,
        description: `Left rotation at ${imbalanced.left!.value}, then right rotation at ${imbalanced.value} (LR case)`,
      };
      imbalanced.left = rotateLeft(imbalanced.left!);
      rotated = rotateRight(imbalanced);
    }
  } else {
    // Right-heavy
    const rightBf = getBalanceFactor(imbalanced.right);
    if (rightBf <= 0) {
      step = {
        type: "RR",
        node: imbalanced.value,
        description: `Left rotation at node ${imbalanced.value} (RR case)`,
      };
      rotated = rotateLeft(imbalanced);
    } else {
      step = {
        type: "RL",
        node: imbalanced.value,
        description: `Right rotation at ${imbalanced.right!.value}, then left rotation at ${imbalanced.value} (RL case)`,
      };
      imbalanced.right = rotateRight(imbalanced.right!);
      rotated = rotateLeft(imbalanced);
    }
  }

  // Attach rotated subtree back
  let newRoot: AVLNode;
  if (direction === "root" || !parent) {
    newRoot = rotated;
  } else {
    if (direction === "left") {
      parent.left = rotated;
    } else {
      parent.right = rotated;
    }
    updateHeightsPostOrder(cloned);
    newRoot = cloned;
  }

  return { newRoot, step };
}