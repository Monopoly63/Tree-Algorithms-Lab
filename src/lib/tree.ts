// Tree Algorithms Lab - Core algorithms (TypeScript port)
// Student: Abdulmoin Hablas | Course: Algorithms 3

export interface TreeNode {
  id: string;
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;
  kind?: "operator" | "operand" | "default";
}

export interface MaryNode {
  id: string;
  value: string;
  children: MaryNode[];
}

let _idCounter = 0;
export function genId(prefix = "n"): string {
  _idCounter += 1;
  return `${prefix}_${_idCounter}_${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Binary Tree Builders ----------

// Build BT level-by-level (BFS)
export function buildBT(values: (string | number)[]): TreeNode | null {
  if (values.length === 0) return null;
  const nodes: TreeNode[] = values.map((v) => ({
    id: genId(),
    value: String(v),
    left: null,
    right: null,
    kind: "default",
  }));
  for (let i = 0; i < nodes.length; i++) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < nodes.length) nodes[i].left = nodes[l];
    if (r < nodes.length) nodes[i].right = nodes[r];
  }
  return nodes[0];
}

// Build BST by inserting values
export function buildBST(values: (string | number)[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const v of values) {
    root = bstInsert(root, Number(v));
  }
  return root;
}

function bstInsert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) {
    return { id: genId(), value: String(val), left: null, right: null, kind: "default" };
  }
  if (val < Number(root.value)) root.left = bstInsert(root.left, val);
  else if (val > Number(root.value)) root.right = bstInsert(root.right, val);
  return root;
}

// ---------- Traversals ----------
export type TraversalType = "preorder" | "inorder" | "postorder";

export interface TraversalStep {
  index: number;
  value: string;
  nodeId: string;
}

export function traverse(root: TreeNode | null, type: TraversalType): TraversalStep[] {
  const steps: TraversalStep[] = [];
  const visit = (n: TreeNode | null) => {
    if (!n) return;
    if (type === "preorder") {
      steps.push({ index: steps.length, value: n.value, nodeId: n.id });
      visit(n.left);
      visit(n.right);
    } else if (type === "inorder") {
      visit(n.left);
      steps.push({ index: steps.length, value: n.value, nodeId: n.id });
      visit(n.right);
    } else {
      visit(n.left);
      visit(n.right);
      steps.push({ index: steps.length, value: n.value, nodeId: n.id });
    }
  };
  visit(root);
  return steps;
}

// ---------- m-ary -> BT (Left-Child Right-Sibling) -> BST ----------

export function maryToBT(root: MaryNode | null): TreeNode | null {
  if (!root) return null;
  const convert = (mnode: MaryNode | null): TreeNode | null => {
    if (!mnode) return null;
    const btnode: TreeNode = {
      id: genId(),
      value: mnode.value,
      left: null,
      right: null,
      kind: "default",
    };
    // Left child = first child
    if (mnode.children.length > 0) {
      btnode.left = convert(mnode.children[0]);
      // Right chain of siblings
      let cur = btnode.left;
      for (let i = 1; i < mnode.children.length; i++) {
        if (cur) {
          cur.right = convert(mnode.children[i]);
          cur = cur.right;
        }
      }
    }
    return btnode;
  };
  return convert(root);
}

export function inorderValues(root: TreeNode | null): string[] {
  return traverse(root, "inorder").map((s) => s.value);
}

export function btToBST(bt: TreeNode | null): TreeNode | null {
  const vals = inorderValues(bt);
  // Sort numerically if all numeric, else lexicographic
  const allNumeric = vals.every((v) => !isNaN(Number(v)));
  const sorted = allNumeric
    ? vals.map(Number).sort((a, b) => a - b).map(String)
    : [...vals].sort();
  let root: TreeNode | null = null;
  for (const v of sorted) {
    if (allNumeric) root = bstInsert(root, Number(v));
    else root = bstInsertStr(root, v);
  }
  return root;
}

function bstInsertStr(root: TreeNode | null, val: string): TreeNode {
  if (root === null) {
    return { id: genId(), value: val, left: null, right: null, kind: "default" };
  }
  if (val < root.value) root.left = bstInsertStr(root.left, val);
  else if (val > root.value) root.right = bstInsertStr(root.right, val);
  return root;
}

// ---------- Expression Tree ----------

type Token =
  | { type: "num"; value: string }
  | { type: "sym"; value: string }
  | { type: "op"; value: string }
  | { type: "lparen" }
  | { type: "rparen" };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }
    if ("+-*/^".includes(c)) {
      tokens.push({ type: "op", value: c });
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < expr.length && /[0-9.]/.test(expr[j])) j++;
      tokens.push({ type: "num", value: expr.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i;
      while (j < expr.length && /[a-zA-Z0-9_]/.test(expr[j])) j++;
      tokens.push({ type: "sym", value: expr.slice(i, j) });
      i = j;
      continue;
    }
    throw new Error(`Unexpected character: ${c}`);
  }
  return tokens;
}

function precedence(op: string): number {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/") return 2;
  if (op === "^") return 3;
  return 0;
}

function isRightAssoc(op: string): boolean {
  return op === "^";
}

// Shunting-Yard -> postfix tokens -> build tree
export function buildExpressionTree(expr: string): TreeNode {
  const tokens = tokenize(expr);
  const output: Token[] = [];
  const opStack: Token[] = [];
  for (const t of tokens) {
    if (t.type === "num" || t.type === "sym") {
      output.push(t);
    } else if (t.type === "op") {
      while (opStack.length > 0) {
        const top = opStack[opStack.length - 1];
        if (top.type === "op") {
          if (
            precedence(top.value) > precedence(t.value) ||
            (precedence(top.value) === precedence(t.value) && !isRightAssoc(t.value))
          ) {
            output.push(opStack.pop()!);
            continue;
          }
        }
        break;
      }
      opStack.push(t);
    } else if (t.type === "lparen") {
      opStack.push(t);
    } else if (t.type === "rparen") {
      while (opStack.length > 0 && opStack[opStack.length - 1].type !== "lparen") {
        output.push(opStack.pop()!);
      }
      if (opStack.length === 0) throw new Error("Mismatched parentheses");
      opStack.pop(); // remove lparen
    }
  }
  while (opStack.length > 0) {
    const t = opStack.pop()!;
    if (t.type === "lparen" || t.type === "rparen") throw new Error("Mismatched parentheses");
    output.push(t);
  }

  // Build tree from postfix
  const stack: TreeNode[] = [];
  for (const t of output) {
    if (t.type === "num" || t.type === "sym") {
      stack.push({
        id: genId(),
        value: t.value,
        left: null,
        right: null,
        kind: "operand",
      });
    } else if (t.type === "op") {
      const right = stack.pop();
      const left = stack.pop();
      if (!right || !left) throw new Error("Invalid expression");
      stack.push({
        id: genId(),
        value: t.value,
        left,
        right,
        kind: "operator",
      });
    }
  }
  if (stack.length !== 1) throw new Error("Invalid expression");
  return stack[0];
}

export function prefixOf(root: TreeNode | null): string {
  const res: string[] = [];
  const visit = (n: TreeNode | null) => {
    if (!n) return;
    res.push(n.value);
    visit(n.left);
    visit(n.right);
  };
  visit(root);
  return res.join(" ");
}

export function postfixOf(root: TreeNode | null): string {
  const res: string[] = [];
  const visit = (n: TreeNode | null) => {
    if (!n) return;
    visit(n.left);
    visit(n.right);
    res.push(n.value);
  };
  visit(root);
  return res.join(" ");
}

export function infixOf(root: TreeNode | null): string {
  const visit = (n: TreeNode | null): string => {
    if (!n) return "";
    if (!n.left && !n.right) return n.value;
    return `(${visit(n.left)}${n.value}${visit(n.right)})`;
  };
  const s = visit(root);
  // Strip outermost parens if present
  if (s.startsWith("(") && s.endsWith(")")) {
    // Check balanced outer
    let depth = 0;
    let canStrip = true;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") depth++;
      else if (s[i] === ")") depth--;
      if (depth === 0 && i < s.length - 1) {
        canStrip = false;
        break;
      }
    }
    if (canStrip) return s.slice(1, -1);
  }
  return s;
}

export function evaluateTree(root: TreeNode | null): number {
  if (!root) throw new Error("Empty tree");
  if (!root.left && !root.right) {
    const n = Number(root.value);
    if (isNaN(n)) throw new Error(`Cannot evaluate symbol: ${root.value}`);
    return n;
  }
  const l = evaluateTree(root.left);
  const r = evaluateTree(root.right);
  switch (root.value) {
    case "+":
      return l + r;
    case "-":
      return l - r;
    case "*":
      return l * r;
    case "/":
      return l / r;
    case "^":
      return Math.pow(l, r);
    default:
      throw new Error(`Unknown operator: ${root.value}`);
  }
}

// ---------- Tree Reconstruction (Preorder+Inorder / Postorder+Inorder) ----------

export interface ReconstructInput {
  values: string[];
  inorder: string[];
}

// Validate common preconditions for reconstruction from two traversals
export function validateReconstructionInputs(
  first: string[],
  inorder: string[],
  firstName: string
): string | null {
  if (first.length === 0 || inorder.length === 0) {
    return "Both traversals must be non-empty.";
  }
  if (first.length !== inorder.length) {
    return `Length mismatch: ${firstName} has ${first.length} element(s), but inorder has ${inorder.length}.`;
  }
  // Check for duplicates — reconstruction from two traversals requires unique labels
  const dupsA = findDuplicates(first);
  if (dupsA.length > 0) {
    return `Duplicate value(s) in ${firstName}: ${dupsA.join(", ")}. Reconstruction requires unique node values.`;
  }
  const dupsB = findDuplicates(inorder);
  if (dupsB.length > 0) {
    return `Duplicate value(s) in inorder: ${dupsB.join(", ")}. Reconstruction requires unique node values.`;
  }
  // Check that both traversals contain the same set of values
  const setA = new Set(first);
  const setB = new Set(inorder);
  const missingInInorder = first.filter((v) => !setB.has(v));
  if (missingInInorder.length > 0) {
    return `${firstName} contains value(s) not present in inorder: ${missingInInorder.join(", ")}.`;
  }
  const missingInFirst = inorder.filter((v) => !setA.has(v));
  if (missingInFirst.length > 0) {
    return `Inorder contains value(s) not present in ${firstName}: ${missingInFirst.join(", ")}.`;
  }
  return null;
}

function findDuplicates(arr: string[]): string[] {
  const seen = new Set<string>();
  const dups = new Set<string>();
  for (const v of arr) {
    if (seen.has(v)) dups.add(v);
    seen.add(v);
  }
  return [...dups];
}

// Parse a user-provided traversal line (comma or whitespace separated)
export function parseTokens(text: string): string[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Build tree from preorder + inorder
export function buildFromPreIn(preorder: string[], inorder: string[]): TreeNode | null {
  const err = validateReconstructionInputs(preorder, inorder, "preorder");
  if (err) throw new Error(err);
  const inorderIndex = new Map<string, number>();
  inorder.forEach((v, i) => inorderIndex.set(v, i));

  let preIdx = 0;
  const build = (inLeft: number, inRight: number): TreeNode | null => {
    if (inLeft > inRight) return null;
    const rootVal = preorder[preIdx++];
    const idx = inorderIndex.get(rootVal);
    if (idx === undefined || idx < inLeft || idx > inRight) {
      // This shouldn't happen if validation passed, but guard anyway
      throw new Error(
        `Inconsistent traversals: cannot place "${rootVal}" from preorder in inorder range.`
      );
    }
    const node: TreeNode = {
      id: genId(),
      value: rootVal,
      left: null,
      right: null,
      kind: "default",
    };
    node.left = build(inLeft, idx - 1);
    node.right = build(idx + 1, inRight);
    return node;
  };
  return build(0, inorder.length - 1);
}

// Build tree from postorder + inorder
export function buildFromPostIn(postorder: string[], inorder: string[]): TreeNode | null {
  const err = validateReconstructionInputs(postorder, inorder, "postorder");
  if (err) throw new Error(err);
  const inorderIndex = new Map<string, number>();
  inorder.forEach((v, i) => inorderIndex.set(v, i));

  let postIdx = postorder.length - 1;
  const build = (inLeft: number, inRight: number): TreeNode | null => {
    if (inLeft > inRight) return null;
    const rootVal = postorder[postIdx--];
    const idx = inorderIndex.get(rootVal);
    if (idx === undefined || idx < inLeft || idx > inRight) {
      throw new Error(
        `Inconsistent traversals: cannot place "${rootVal}" from postorder in inorder range.`
      );
    }
    const node: TreeNode = {
      id: genId(),
      value: rootVal,
      left: null,
      right: null,
      kind: "default",
    };
    // IMPORTANT: right first when consuming postorder from the end
    node.right = build(idx + 1, inRight);
    node.left = build(inLeft, idx - 1);
    return node;
  };
  return build(0, inorder.length - 1);
}

// ---------- Expression Tree: build from prefix / postfix notations ----------

const OPERATORS = new Set(["+", "-", "*", "/", "^"]);

function classifyOperandKind(v: string): "operator" | "operand" {
  return OPERATORS.has(v) ? "operator" : "operand";
}

// Build expression tree from prefix tokens (Polish notation).
// Example: "+ 2 * 3 4"  or  "* + a b - c d"
export function buildExpressionTreeFromPrefix(tokens: string[]): TreeNode {
  if (tokens.length === 0) throw new Error("Prefix expression is empty.");
  let i = 0;
  const build = (): TreeNode => {
    if (i >= tokens.length) {
      throw new Error(
        "Invalid prefix expression: not enough operands for the given operators."
      );
    }
    const tok = tokens[i++];
    if (OPERATORS.has(tok)) {
      const left = build();
      const right = build();
      return {
        id: genId(),
        value: tok,
        left,
        right,
        kind: "operator",
      };
    }
    return {
      id: genId(),
      value: tok,
      left: null,
      right: null,
      kind: "operand",
    };
  };
  const root = build();
  if (i !== tokens.length) {
    throw new Error(
      `Invalid prefix expression: ${tokens.length - i} extra token(s) after the main expression.`
    );
  }
  return root;
}

// Build expression tree from postfix tokens (Reverse Polish Notation).
// Example: "2 3 4 * +"  or  "a b + c d - *"
export function buildExpressionTreeFromPostfix(tokens: string[]): TreeNode {
  if (tokens.length === 0) throw new Error("Postfix expression is empty.");
  const stack: TreeNode[] = [];
  for (const tok of tokens) {
    if (OPERATORS.has(tok)) {
      if (stack.length < 2) {
        throw new Error(
          `Invalid postfix expression: operator "${tok}" expects two operands but only ${stack.length} available.`
        );
      }
      const right = stack.pop()!;
      const left = stack.pop()!;
      stack.push({
        id: genId(),
        value: tok,
        left,
        right,
        kind: "operator",
      });
    } else {
      stack.push({
        id: genId(),
        value: tok,
        left: null,
        right: null,
        kind: "operand",
      });
    }
  }
  if (stack.length !== 1) {
    throw new Error(
      `Invalid postfix expression: ${stack.length} trees left on the stack after processing (expected 1). Check the operator/operand balance.`
    );
  }
  // Ensure kinds are correct in case we parsed a single operand
  const root = stack[0];
  // Mark operand/operator kinds across the whole tree (defensive)
  const fix = (n: TreeNode | null) => {
    if (!n) return;
    n.kind = classifyOperandKind(n.value);
    fix(n.left);
    fix(n.right);
  };
  fix(root);
  return root;
}