// Tree Algorithms Lab - Backend file contents (for ZIP download)
// Student: Abdulmoin Hablas | Course: Algorithms 3

export const BACKEND_FILES: Record<string, string> = {
  "backend/main.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# FastAPI application entry point with all endpoints

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import (
    BuildTreeRequest,
    TraversalRequest,
    MaryConvertRequest,
    ExpressionRequest,
)
from algorithms.tree_builder import build_bt, build_bst
from algorithms.traversals import traverse
from algorithms.mary_converter import mary_to_bt, bt_to_bst
from algorithms.expression import (
    build_expression_tree,
    prefix_of,
    postfix_of,
    infix_of,
    evaluate_tree,
)
from utils.tree_utils import serialize, inorder_values

app = FastAPI(title="Tree Algorithms Lab API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "student": "Abdulmoin Hablas"}


@app.post("/api/tree/build")
def api_build_tree(req: BuildTreeRequest):
    try:
        if req.type.upper() == "BST":
            root = build_bst(req.values)
        elif req.type.upper() == "BT":
            root = build_bt(req.values)
        else:
            raise HTTPException(status_code=400, detail="type must be BT or BST")
        return {"tree": serialize(root)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/tree/traversal")
def api_traversal(req: TraversalRequest):
    try:
        order = req.order.lower()
        if order not in ("preorder", "inorder", "postorder"):
            raise HTTPException(status_code=400, detail="Invalid order")
        steps = traverse(req.tree, order)
        return {"order": [order], "steps": steps}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/tree/convert-mary")
def api_convert_mary(req: MaryConvertRequest):
    try:
        bt = mary_to_bt(req.tree)
        inorder_before = inorder_values(bt)
        bst = bt_to_bst(bt)
        inorder_after = inorder_values(bst)
        return {
            "original_mary": req.tree,
            "binary_tree": serialize(bt),
            "bst": serialize(bst),
            "inorder_before": inorder_before,
            "inorder_after": inorder_after,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/expression/build")
def api_expression_build(req: ExpressionRequest):
    try:
        tree = build_expression_tree(req.expression)
        return {
            "tree": serialize(tree),
            "prefix": prefix_of(tree),
            "postfix": postfix_of(tree),
            "value": evaluate_tree(tree),
            "inorder": infix_of(tree),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/expression/symbolic")
def api_expression_symbolic(req: ExpressionRequest):
    try:
        tree = build_expression_tree(req.expression)
        return {
            "tree": serialize(tree),
            "prefix": prefix_of(tree),
            "postfix": postfix_of(tree),
            "inorder": infix_of(tree),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
`,

  "backend/models.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# Pydantic models for request validation

from typing import List, Optional, Any
from pydantic import BaseModel


class BuildTreeRequest(BaseModel):
    values: List[Any]
    type: str  # "BT" or "BST"


class TreeNodeModel(BaseModel):
    id: Optional[str] = None
    value: Any
    left: Optional["TreeNodeModel"] = None
    right: Optional["TreeNodeModel"] = None


TreeNodeModel.model_rebuild()


class TraversalRequest(BaseModel):
    tree: Optional[dict]
    order: str  # "preorder" | "inorder" | "postorder"


class MaryNodeModel(BaseModel):
    value: Any
    children: List["MaryNodeModel"] = []


MaryNodeModel.model_rebuild()


class MaryConvertRequest(BaseModel):
    tree: dict


class ExpressionRequest(BaseModel):
    expression: str
`,

  "backend/algorithms/__init__.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
`,

  "backend/algorithms/tree_builder.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# Binary Tree (BFS level-by-level) and BST construction

from utils.tree_utils import new_node


def build_bt(values):
    """Build a binary tree level-by-level from list of values."""
    if not values:
        return None
    nodes = [new_node(v) for v in values]
    n = len(nodes)
    for i in range(n):
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n:
            nodes[i]["left"] = nodes[l]
        if r < n:
            nodes[i]["right"] = nodes[r]
    return nodes[0]


def bst_insert(root, value):
    """Insert value into BST."""
    if root is None:
        return new_node(value)
    # Numeric comparison
    v = float(value)
    rv = float(root["value"])
    if v < rv:
        root["left"] = bst_insert(root["left"], value)
    elif v > rv:
        root["right"] = bst_insert(root["right"], value)
    return root


def build_bst(values):
    """Build BST by inserting each value."""
    root = None
    for v in values:
        root = bst_insert(root, v)
    return root
`,

  "backend/algorithms/traversals.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# Preorder, Inorder, Postorder traversals

def traverse(tree, order):
    """Return list of step dicts: {index, value}."""
    steps = []

    def visit(n):
        if n is None:
            return
        if order == "preorder":
            steps.append({"index": len(steps), "value": str(n["value"])})
            visit(n.get("left"))
            visit(n.get("right"))
        elif order == "inorder":
            visit(n.get("left"))
            steps.append({"index": len(steps), "value": str(n["value"])})
            visit(n.get("right"))
        else:  # postorder
            visit(n.get("left"))
            visit(n.get("right"))
            steps.append({"index": len(steps), "value": str(n["value"])})

    visit(tree)
    return steps
`,

  "backend/algorithms/mary_converter.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# m-ary -> Binary Tree (Left-Child Right-Sibling) and BT -> BST

from utils.tree_utils import new_node, inorder_values
from algorithms.tree_builder import bst_insert


def mary_to_bt(mnode):
    """Convert m-ary tree to binary tree using Left-Child Right-Sibling."""
    if mnode is None:
        return None
    node = new_node(mnode["value"])
    children = mnode.get("children", [])
    if children:
        node["left"] = mary_to_bt(children[0])
        cur = node["left"]
        for i in range(1, len(children)):
            cur["right"] = mary_to_bt(children[i])
            cur = cur["right"]
    return node


def bt_to_bst(bt):
    """Extract inorder values, sort, rebuild BST."""
    values = inorder_values(bt)
    try:
        sorted_vals = sorted(values, key=lambda x: float(x))
    except ValueError:
        sorted_vals = sorted(values)
    root = None
    for v in sorted_vals:
        root = bst_insert(root, v)
    return root
`,

  "backend/algorithms/expression.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# Infix tokenizer, Shunting-Yard parser, Expression Tree

from utils.tree_utils import new_node


def tokenize(expr):
    tokens = []
    i = 0
    while i < len(expr):
        c = expr[i]
        if c.isspace():
            i += 1
            continue
        if c == "(":
            tokens.append(("lparen", c))
            i += 1
        elif c == ")":
            tokens.append(("rparen", c))
            i += 1
        elif c in "+-*/^":
            tokens.append(("op", c))
            i += 1
        elif c.isdigit() or c == ".":
            j = i
            while j < len(expr) and (expr[j].isdigit() or expr[j] == "."):
                j += 1
            tokens.append(("num", expr[i:j]))
            i = j
        elif c.isalpha() or c == "_":
            j = i
            while j < len(expr) and (expr[j].isalnum() or expr[j] == "_"):
                j += 1
            tokens.append(("sym", expr[i:j]))
            i = j
        else:
            raise ValueError(f"Unexpected character: {c}")
    return tokens


def precedence(op):
    return {"+": 1, "-": 1, "*": 2, "/": 2, "^": 3}.get(op, 0)


def right_assoc(op):
    return op == "^"


def to_postfix(tokens):
    out = []
    stack = []
    for t in tokens:
        kind, val = t
        if kind in ("num", "sym"):
            out.append(t)
        elif kind == "op":
            while stack:
                top = stack[-1]
                if top[0] == "op" and (
                    precedence(top[1]) > precedence(val)
                    or (precedence(top[1]) == precedence(val) and not right_assoc(val))
                ):
                    out.append(stack.pop())
                else:
                    break
            stack.append(t)
        elif kind == "lparen":
            stack.append(t)
        elif kind == "rparen":
            while stack and stack[-1][0] != "lparen":
                out.append(stack.pop())
            if not stack:
                raise ValueError("Mismatched parentheses")
            stack.pop()
    while stack:
        top = stack.pop()
        if top[0] in ("lparen", "rparen"):
            raise ValueError("Mismatched parentheses")
        out.append(top)
    return out


def build_expression_tree(expr):
    postfix = to_postfix(tokenize(expr))
    stack = []
    for kind, val in postfix:
        if kind in ("num", "sym"):
            stack.append(new_node(val, kind="operand"))
        else:
            right = stack.pop()
            left = stack.pop()
            node = new_node(val, kind="operator")
            node["left"] = left
            node["right"] = right
            stack.append(node)
    if len(stack) != 1:
        raise ValueError("Invalid expression")
    return stack[0]


def prefix_of(root):
    res = []

    def visit(n):
        if n is None:
            return
        res.append(str(n["value"]))
        visit(n.get("left"))
        visit(n.get("right"))

    visit(root)
    return " ".join(res)


def postfix_of(root):
    res = []

    def visit(n):
        if n is None:
            return
        visit(n.get("left"))
        visit(n.get("right"))
        res.append(str(n["value"]))

    visit(root)
    return " ".join(res)


def infix_of(root):
    def visit(n):
        if n is None:
            return ""
        if not n.get("left") and not n.get("right"):
            return str(n["value"])
        return f"({visit(n.get('left'))}{n['value']}{visit(n.get('right'))})"

    s = visit(root)
    if s.startswith("(") and s.endswith(")"):
        depth = 0
        can_strip = True
        for i, ch in enumerate(s):
            if ch == "(":
                depth += 1
            elif ch == ")":
                depth -= 1
            if depth == 0 and i < len(s) - 1:
                can_strip = False
                break
        if can_strip:
            return s[1:-1]
    return s


def evaluate_tree(root):
    if root is None:
        raise ValueError("Empty tree")
    if not root.get("left") and not root.get("right"):
        try:
            return float(root["value"])
        except ValueError:
            raise ValueError(f"Cannot evaluate symbol: {root['value']}")
    l = evaluate_tree(root.get("left"))
    r = evaluate_tree(root.get("right"))
    op = root["value"]
    if op == "+":
        return l + r
    if op == "-":
        return l - r
    if op == "*":
        return l * r
    if op == "/":
        return l / r
    if op == "^":
        return l ** r
    raise ValueError(f"Unknown operator: {op}")
`,

  "backend/utils/__init__.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
`,

  "backend/utils/tree_utils.py": `# Tree Algorithms Lab
# Student: Abdulmoin Hablas
# Course: Algorithms 3
# Helpers: node id, new_node, serialize, inorder_values

import uuid


def gen_id():
    return "n_" + uuid.uuid4().hex[:8]


def new_node(value, kind="default"):
    return {
        "id": gen_id(),
        "value": str(value),
        "left": None,
        "right": None,
        "kind": kind,
    }


def serialize(node):
    if node is None:
        return None
    return {
        "id": node.get("id"),
        "value": str(node["value"]),
        "left": serialize(node.get("left")),
        "right": serialize(node.get("right")),
        "kind": node.get("kind", "default"),
    }


def inorder_values(node):
    res = []

    def visit(n):
        if n is None:
            return
        visit(n.get("left"))
        res.append(str(n["value"]))
        visit(n.get("right"))

    visit(node)
    return res
`,

  "backend/requirements.txt": `fastapi==0.115.0
uvicorn[standard]==0.30.6
pydantic==2.9.2
`,

  "backend/README.md": `# Tree Algorithms Lab - Backend

Student: **Abdulmoin Hablas** | Course: **Algorithms 3**

## Install
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

## Run
\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

Health check: http://localhost:8000/api/health
`,
};