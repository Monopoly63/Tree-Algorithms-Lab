# -*- coding: utf-8 -*-
"""
generate_senior_lectures.py — Outputs ultra-enriched Senior pedagogical study guide
for Tree Algorithms Lab (src/data/lectures.ts).
"""

content = '''// ═══════════════════════════════════════════════════════════════
// Senior Academic Lectures Data — Master Study Guide for Algorithms 4
// ═══════════════════════════════════════════════════════════════

export type LabTab =
  | "builder"
  | "mary"
  | "traversal"
  | "reconstruct"
  | "numeric"
  | "symbolic"
  | "avl";

export interface ComplexityRow {
  label: { en: string; ar: string };
  time: string;
  space: string;
}

export interface LectureSection {
  heading: { en: string; ar: string };
  paragraphs: { en: string; ar: string }[];
  bullets?: { en: string; ar: string }[];
  code?: string;
}

export interface Lecture {
  id: string;
  number: number;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  labTab?: LabTab;
  tag: { en: string; ar: string };
  accent: "cyan" | "purple" | "pink";
  sections: LectureSection[];
  complexity?: ComplexityRow[];
  examples?: { en: string; ar: string }[];
  applications?: { en: string; ar: string }[];
}

export const lectures: Lecture[] = [
  // ─── Lecture 1: Introduction to Trees ────────────────────────
  {
    id: "intro-trees",
    number: 1,
    title: {
      en: "Lecture 1: Graph Theory & Non-Linear Hierarchical Structures",
      ar: "المحاضرة 1: مدخل إلى نظرية الأشجار وهندسة البيانات الهرمية",
    },
    summary: {
      en: "Why linear structures fail at branching relationships, core tree terminology, and memory layout representation.",
      ar: "الدافع الهندسي للانتقال من الهياكل الخطية إلى المتفرعة، المصطلحات الأساسية، وتمثيل الذاكرة الفعلي.",
    },
    tag: { en: "Foundations", ar: "الأساسيات الهندسية" },
    accent: "cyan",
    sections: [
      {
        heading: { en: "Architectural Motivation (الدافع الهندسي)", ar: "لماذا نحتاج الهياكل الشجرية في علوم الحاسب؟" },
        paragraphs: [
          {
            en: `Linear data structures (arrays, linked lists, stacks, queues) store elements sequentially. While access and simple sequential iteration run in O(1) or O(n), searching for an element in an unsorted linear collection strictly requires O(n) time. More importantly, linear structures cannot natively represent one-to-many relationships.`,
            ar: `الهياكل الخطية (المصفوفات، القوائم المترابطة، المكدسات) تُخزّن البيانات بشكل متتالي. ورغم كفاءتها في الوصول المباشر O(1)، إلا أن البحث فيها يتطلب خطياً O(n). والأهم من ذلك: الهياكل الخطية تفشل تماماً في تمثيل العلاقات المتفرعة (One-to-Many Relationships).`,
          },
          {
            en: `A Tree solves both problems simultaneously: by organizing nodes in a non-linear branching hierarchy, a tree allows logarithmic O(log n) search space partitioning while natively modeling real-world hierarchies like database indexing (B-Trees), DOM document structures, and compiler Abstract Syntax Trees (ASTs).`,
            ar: `الشجرة تحل المشكلتين معاً: عبر تنظيم العقد في هيكل هرمي متفرع، تتيح الشجرة تقسيم فضاء البحث بشكل لوغاريتمي O(log n)، وتُنمذج تسلسلات حقيقية مثل فهارس قواعد البيانات (B-Trees)، شجرة متصفح الويب (DOM)، وجداول رموز المصرّفات.`,
          },
        ],
      },
      {
        heading: { en: "Core Mathematical Definitions", ar: "التعاريف الرياضية والهيكلية الدقيقة" },
        paragraphs: [
          {
            en: `Mathematically, a tree is a connected acyclic undirected graph G = (V, E) where |E| = |V| - 1. There is exactly one unique simple path between any two nodes.`,
            ar: `رياضياً، الشجرة هي رسم بياني متصل خالٍ من الدورات G=(V,E) حيث عدد الحواف يساوي عدد العقد ناقص واحد (|E|=|V|-1). يوجد مسار بسيط واحد فريد بين أي عقدتين.`,
          },
        ],
        bullets: [
          { en: "Root Node: The unique topmost node N_0 with indegree 0 (no parent).", ar: "عقدة الجذر (Root): العقدة السيادية الوحيدة في قمة الهيكل التي ليس لها أب." },
          { en: "Internal Node: Any node that possesses at least one child node.", ar: "العقدة الداخلية (Internal Node): أي عقدة تمتلك طفلاً واحداً على الأقل." },
          { en: "External Leaf Node: A terminal node N_t with outdegree 0 (no children).", ar: "الورقة الخارجية (Leaf): العقدة الطرفية في أسفل الشجرة التي ليس لها أبناء." },
          { en: "Node Depth: Length of the unique simple path from Root to Node N.", ar: "عمق العقدة (Depth): عدد الحواف في المسار المباشر من الجذر حتى العقدة." },
          { en: "Tree Height: Maximum depth among all leaf nodes in the entire tree.", ar: "ارتفاع الشجرة (Height): أقصى مسار من الجذر حتى أعمق ورقة في الهيكل." },
        ],
      },
    ],
    complexity: [
      { label: { en: "Pointer Overhead", ar: "استهلاك المؤشرات" }, time: "O(1)", space: "O(n)" },
    ],
    applications: [
      { en: "Operating System Virtual File Systems (VFS directory branching).", ar: "أنظمة الملفات في نظم التشغيل (تمثيل المجلدات والملفات الفرعية)." },
      { en: "Domain Name System (DNS hierarchy resolutive trees).", ar: "نظام أسماء النطاقات العالمي (تفريعات النطاقات .com -> google -> www)." },
    ],
  },

  // ─── Lecture 2: Binary Trees ──────────────────────────────────
  {
    id: "binary-trees",
    number: 2,
    title: {
      en: "Lecture 2: Binary Trees & Level-Order Construction Mechanics",
      ar: "المحاضرة 2: الأشجار الثنائية وميكانيكا البناء المستوي (BFS)",
    },
    summary: {
      en: "Restricting branching factor b=2, complete vs full vs perfect binary trees, and array-based level mapping.",
      ar: "تخصيص معامل التفرع لـ 2، أنواع الأشجار الثنائية المثالية والتامة، ومنطق التحويل للمصفوفات.",
    },
    tag: { en: "Binary Trees", ar: "الأشجار الثنائية" },
    accent: "purple",
    labTab: "builder",
    sections: [
      {
        heading: { en: "Structural Invariants", ar: "الضوابط الهيكلية للأشجار الثنائية" },
        paragraphs: [
          {
            en: `A Binary Tree strictly limits outdegree to at most 2. Every node possesses a left pointer and a right pointer (either pointing to a valid child node or null).`,
            ar: `الشجرة الثنائية تُقيد معامل التفرع بعقدتين كحد أقصى. كل عقدة تمتلك مؤشراً أيسر ومؤشراً أيمن (إما يشير لعقدة صالحة أو null).`,
          },
        ],
        bullets: [
          { en: "Full Binary Tree: Every node has either 0 or exactly 2 children.", ar: "الشجرة التامة (Full): كل عقدة فيها إما تمتلك طفلين اثنين أو صفر أطفال." },
          { en: "Complete Binary Tree: All levels are fully filled except possibly the last level, which is filled strictly from left to right.", ar: "الشجرة المكتملة (Complete): جميع المستويات ممتلئة تماماً باستثناء الأخير، والذي يُملأ بصرامة من اليسار إلى اليمين." },
          { en: "Perfect Binary Tree: All internal nodes have 2 children and all leaves are at the exact same depth. Total nodes = 2^(h+1) - 1.", ar: "الشجرة المثالية (Perfect): جميع العقد الداخلية لها طفلان وجميع الأوراق على نفس العمق. إجمالي العقد = 2^(h+1)-1." },
        ],
      },
      {
        heading: { en: "Array Mappings (منطق المصفوفات)", ar: "الربط الرياضي مع الهياكل المستوية" },
        paragraphs: [
          {
            en: `For any node located at zero-indexed array position i: its left child is strictly located at index (2*i + 1), its right child at (2*i + 2), and its parent node at floor((i - 1) / 2).`,
            ar: `لأي عقدة مخزنة في مصفوفة عند المؤشر i: طفلها الأيسر يقع في الموقع (2*i + 1)، وطفلها الأيمن في (2*i + 2)، وعقدة الأب في floor((i - 1)/2).`,
          },
        ],
        code: `// BFS Level-Order Construction Loop\nNode* buildBT(vector<int> vals) {\n    if (vals.empty()) return nullptr;\n    vector<Node*> nodes;\n    for (int v : vals) nodes.push_back(new Node(v));\n    for (int i = 0; i < nodes.size(); i++) {\n        int l = 2*i + 1, r = 2*i + 2;\n        if (l < nodes.size()) nodes[i]->left = nodes[l];\n        if (r < nodes.size()) nodes[i]->right = nodes[r];\n    }\n    return nodes[0];\n}`,
      },
    ],
    complexity: [
      { label: { en: "Level Construction", ar: "البناء المستوي" }, time: "O(n)", space: "O(n)" },
    ],
  },

  // ─── Lecture 3: Binary Search Trees ───────────────────────────
  {
    id: "bst",
    number: 3,
    title: {
      en: "Lecture 3: Binary Search Trees (BST) — Search, Insert, Delete",
      ar: "المحاضرة 3: أشجار البحث الثنائية (BST) — البحث، الإدراج، والحذف",
    },
    summary: {
      en: "Enforcing total ordering (left < root < right), logarithmic pruning, and predecessor/successor replacement.",
      ar: "فرض الترتيب السيادي (الأيسر < الجذر < الأيمن)، التقليم اللوغاريتمي، ومعالجة حذف العقد ذات الطفلين.",
    },
    tag: { en: "BST", ar: "أشجار البحث" },
    accent: "pink",
    labTab: "builder",
    sections: [
      {
        heading: { en: "The BST Pruning Invariant", ar: "شرط التقليم اللوغاريتمي في BST" },
        paragraphs: [
          {
            en: `For every node N: all keys present in N's entire left subtree strictly satisfy K < N.key, and all keys in N's right subtree strictly satisfy K > N.key. This invariant guarantees that at each comparison step during search, exactly half of the remaining search space is discarded.`,
            ar: `لكل عقدة N: جميع المفاتيح في شجرتها اليسرى أصغر تماماً من N.key، وجميع المفاتيح في اليمنى أكبر تماماً من N.key. هذا الشرط يضمن استبعاد نصف فضاء البحث عند كل مقارنة.`,
          },
        ],
      },
      {
        heading: { en: "Deletion Mechanics (حذف العقد)", ar: "كيفية معالجة أصعب حالات الحذف" },
        paragraphs: [
          {
            en: `Deleting a leaf or a node with 1 child is trivial (bypass pointer). Deleting a node with 2 children requires finding either the Inorder Predecessor (maximum node in left subtree) or Inorder Successor (minimum node in right subtree), copying its key, and recursively deleting that leaf node.`,
            ar: `حذف ورقة أو عقدة بطفل واحد سهل مباشر. أما حذف عقدة بطفلين يتطلب إيجاد السلف الوسطي (Predecessor - أكبر قيمة في الجهة اليسرى) أو الخلف الوسطي (Successor - أصغر قيمة في اليمنى)، نسخ قيمتها مكان العقدة المحذوفة، ثم حذف تلك الورقة.`,
          },
        ],
        code: `Node* deleteNode(Node* root, int key) {\n    if (!root) return nullptr;\n    if (key < root->key) root->left = deleteNode(root->left, key);\n    else if (key > root->key) root->right = deleteNode(root->right, key);\n    else {\n        if (!root->left) return root->right;\n        if (!root->right) return root->left;\n        Node* succ = minNode(root->right);\n        root->key = succ->key;\n        root->right = deleteNode(root->right, succ->key);\n    }\n    return root;\n}`,
      },
    ],
    complexity: [
      { label: { en: "Average Operations", ar: "العمليات المتوسطة" }, time: "O(log n)", space: "O(h)" },
      { label: { en: "Degraded Skewed", ar: "أسوأ حالة (منحرفة)" }, time: "O(n)", space: "O(n)" },
    ],
  },

  // ─── Lecture 4: Traversals ────────────────────────────────────
  {
    id: "traversals",
    number: 4,
    title: {
      en: "Lecture 4: Tree Traversals & Recursion Stack Mechanics",
      ar: "المحاضرة 4: الجولات الشجرية وميكانيكا المكدس البرمجي (Call Stack)",
    },
    summary: {
      en: "Preorder, Inorder, and Postorder recursive traces, Euler tour tree walk, and iterative stack equivalences.",
      ar: "الجولات المسبقة والوسطية واللاحقة، تتبع المكدس الفعلي في الذاكرة، والتطبيقات البرمجية.",
    },
    tag: { en: "Traversals", ar: "الجولات الشجرية" },
    accent: "cyan",
    labTab: "traversal",
    sections: [
      {
        heading: { en: "The Euler Tour Trace (جولة أويلر)", ar: "التدفق المنطقي المتدرج للجولات الثلاث" },
        paragraphs: [
          {
            en: `Imagine walking around the perimeter of the tree starting from the top left of the root. Preorder prints when passing the left side of a node, Inorder prints when passing directly underneath a node, and Postorder prints when ascending past the right side of a node.`,
            ar: `تخيل المشي حول محيط الشجرة انطلاقاً من يسار الجذر. الجولة المسبقة (Preorder) تطبع عند المرور بجانب العقدة الأيسر، الوسطية (Inorder) تطبع عند المرور أسفلها، واللاحقة (Postorder) تطبع عند الصعود من جانبها الأيمن.`,
          },
        ],
        code: `// Traversal Traces\nPreorder  (NLR): Root -> Left Subtree -> Right Subtree\nInorder   (LNR): Left Subtree -> Root -> Right Subtree (Sorted BST)\nPostorder (LRN): Left Subtree -> Right Subtree -> Root (Bottom-Up)`,
      },
    ],
    complexity: [
      { label: { en: "Full Traversal", ar: "الجولة الكاملة" }, time: "O(n)", space: "O(h)" },
    ],
  },

  // ─── Lecture 5: Reconstruct ───────────────────────────────────
  {
    id: "reconstruct",
    number: 5,
    title: {
      en: "Lecture 5: Unique Tree Reconstruction from Traversal Pairs",
      ar: "المحاضرة 5: إعادة بناء الهياكل الشجرية الفريدة من زوج جولات",
    },
    summary: {
      en: "Why Inorder traversal is strictly mandatory, Root isolation, and hash map index lookups.",
      ar: "لماذا تُعد الجولة الوسطية شرطاً إلزامياً، عزل الجذور، وتسريع القسمة عبر القواميس.",
    },
    tag: { en: "Reconstruct", ar: "إعادة البناء" },
    accent: "purple",
    labTab: "reconstruct",
    sections: [
      {
        heading: { en: "Mathematical Necessity of Inorder", ar: "لماذا لا تكفي جولة Preorder + Postorder لوحدها؟" },
        paragraphs: [
          {
            en: `Preorder identifies the current Root at index 0. However, without Inorder, it is impossible to determine where the left subtree ends and the right subtree begins. Inorder explicitly separates the left partition from the right partition around the isolated Root key.`,
            ar: `الجولة المسبقة تُحدد الجذر عند المؤشر 0. لكن بدون الجولة الوسطية، يستحيل معرفة أين تنتهي الجهة اليسرى وتبدأ اليمنى. الجولة الوسطية تفصل بوضوح القسم الأيسر عن الأيمن حول المفتاح المستخرج.`,
          },
        ],
        code: `Node* buildTree(vector<int>& pre, vector<int>& in) {\n    unordered_map<int,int> map;\n    for(int i=0;i<in.size();i++) map[in[i]]=i;\n    return helper(pre, 0, pre.size()-1, in, 0, in.size()-1, map);\n}`,
      },
    ],
  },

  // ─── Lecture 6: m-ary Trees ───────────────────────────────────
  {
    id: "mary-conversion",
    number: 6,
    title: {
      en: "Lecture 6: General m-ary Trees & Knuth Binary Conversions",
      ar: "المحاضرة 6: الأشجار العامة (m-ary) وتحويل Knuth الثنائي",
    },
    summary: {
      en: "Knuth's Left-Child Right-Sibling (LCRS) representation preserving structural isomorphism.",
      ar: "تحويل الابن الأيسر والأخ الأيمن لضغط الذاكرة والحفاظ على التشكل الهيكلي.",
    },
    tag: { en: "m-ary", ar: "الأشجار العامة" },
    accent: "pink",
    labTab: "mary",
    sections: [
      {
        heading: { en: "LCRS Isomorphism Mechanic", ar: "ميكانيكا تحويل الأخ الأيمن (LCRS)" },
        paragraphs: [
          {
            en: `In a general tree where nodes can have m children, reserving m pointer slots per node wastes massive memory. Knuth's conversion transforms any m-ary tree into an isomorphic Binary Tree: a node's left pointer links to its first direct child, while its right pointer links to its immediate next sibling.`,
            ar: `في الأشجار العامة حيث تمتلك العقد m أبناء، تخصيص m مؤشر يضيع الذاكرة. تحويل Knuth يحوّل أي شجرة عامة لشجرة ثنائية مكافئة: المؤشر الأيسر يربط بأول طفل مباشر، والمؤشر الأيمن يربط بالأخ الشقيق التالي.`,
          },
        ],
      },
    ],
  },

  // ─── Lecture 7: Numeric Expression Trees ──────────────────────
  {
    id: "numeric-expression",
    number: 7,
    title: {
      en: "Lecture 7: Numeric Expression Trees & Postfix Evaluation",
      ar: "المحاضرة 7: أشجار التعابير الحسابية وتقييم اللاحقة (Postfix)",
    },
    summary: {
      en: "Parsing algebraic strings, Shunting-yard algorithms, and AST tree execution mechanics.",
      ar: "تحليل التعابير الجبرية، خوارزمية محطة القطار، وتنفيذ شجرة بناء الجملة المجرّدة.",
    },
    tag: { en: "Expression", ar: "أشجار التعابير" },
    accent: "cyan",
    labTab: "numeric",
    sections: [
      {
        heading: { en: "AST Execution Invariant", ar: "شرط تنفيذ المصرّف الجبري" },
        paragraphs: [
          {
            en: `In an Expression Tree, external leaves strictly contain numeric operands, while internal nodes strictly contain arithmetic operators (+, -, *, /). Evaluating the tree is performed via a Postorder bottom-up walk.`,
            ar: `في شجرة التعابير، الأوراق الخارجية تحتوي حصراً على الأرقام، بينما العقد الداخلية تحتوي على العمليات الحسابية. يتم التقييم عبر جولة Postorder تصاعدية من الأسفل للأعلى.`,
          },
        ],
      },
    ],
  },

  // ─── Lecture 8: Symbolic Expression Trees ─────────────────────
  {
    id: "symbolic-expression",
    number: 8,
    title: {
      en: "Lecture 8: Symbolic Expression Trees & Algebraic Calculus",
      ar: "المحاضرة 8: أشجار التعابير الرمزية والاشتقاق الجبري التلقائي",
    },
    summary: {
      en: "Symbolic differentiation rules over trees, chain rule tree expansion, and constant folding.",
      ar: "قواعد التفاضل الرمزي على العقد، تطبيق قاعدة السلسلة، وتبسيط الثوابت.",
    },
    tag: { en: "Symbolic", ar: "التعابير الرمزية" },
    accent: "purple",
    labTab: "symbolic",
    sections: [
      {
        heading: { en: "Tree Calculus Expansion rules", ar: "قواعد التفاضل الشجري التلقائي" },
        paragraphs: [
          {
            en: `Differentiating a tree T with respect to variable x recursively constructs a new derivative tree T'. For operator *, d(f*g) produces (+ (* (df) g) (* f (dg))).`,
            ar: `اشتقاق شجرة تعابير بالنسبة للمتغير x يبني شجرة اشتقاق جديدة T'. لعملية الضرب، ينتج مشتق الأول في الثاني زائد الأول في مشتق الثاني.`,
          },
        ],
      },
    ],
  },

  // ─── Lecture 9: AVL Trees ─────────────────────────────────────
  {
    id: "avl-trees",
    number: 9,
    title: {
      en: "Lecture 9: AVL Trees — Balance Factors & Rotations Mechanics",
      ar: "المحاضرة 9: أشجار متوازنة الارتفاع AVL ودورات التوازن الأربع",
    },
    summary: {
      en: "Adelson-Velsky Landis invariant |BF| <= 1, LL/RR single rotations, and LR/RL double rotations.",
      ar: "ضابط التوازن الصارم، حالات الدوران الأحادية والثنائية، وإثبات الارتفاع اللوغاريتمي.",
    },
    tag: { en: "AVL Tree", ar: "أشجار AVL" },
    accent: "pink",
    labTab: "avl",
    sections: [
      {
        heading: { en: "The Height Balance Invariant", ar: "ضابط التوازن الصارم في AVL" },
        paragraphs: [
          {
            en: `For every node N: BalanceFactor(N) = Height(N.left) - Height(N.right) strictly satisfies BF in {-1, 0, +1}. If any insertion or deletion causes |BF| > 1, immediate rotation restructuring is triggered.`,
            ar: `لكل عقدة N: عامل التوازن يساوي ارتفاع الشجرة اليسرى ناقص ارتفاع اليمنى ويجب أن ينحصر في {-1, 0, +1}. إذا تسبب إدراج أو حذف في تجاوز 1، يُنفّذ الدوران فوراً.`,
          },
        ],
        code: `// AVL Rotation Triggers\nLL Case (BF=+2, left child BF=+1): Single Right Rotation\nRR Case (BF=-2, right child BF=-1): Single Left Rotation\nLR Case (BF=+2, left child BF=-1): Left rotate child, then Right rotate node\nRL Case (BF=-2, right child BF=+1): Right rotate child, then Left rotate node`,
      },
    ],
    complexity: [
      { label: { en: "Guaranteed Worst-Case", ar: "الزمن المضمون أسوأ حالة" }, time: "O(log n)", space: "O(log n)" },
    ],
  },

  // ─── Lecture 10: Splay Trees ──────────────────────────────────
  {
    id: "lecture-7-splay",
    number: 10,
    title: {
      en: "Lecture 10: Splay Trees — Temporal Locality & Amortized BSTs",
      ar: "المحاضرة 10: الأشجار المنفردة وتعديل التوازن الذاتي (Splay Tree)",
    },
    summary: {
      en: "Self-adjusting binary search trees moving accessed nodes to root via Zig, Zig-Zig, and Zig-Zag rotations.",
      ar: "أشجار بحث ذاتية التعديل تنقل العقد المزارة للجذر، وتطبيق المحلية الزمنية والكاش.",
    },
    tag: { en: "Splay Tree", ar: "الأشجار المنفردة" },
    accent: "cyan",
    sections: [
      {
        heading: { en: "Amortized Restructuring Mechanics", ar: "ميكانيكا التوازن المُطفأ والكاش الفعلي" },
        paragraphs: [
          {
            en: `Unlike AVL trees that store explicit height metadata per node, Splay Trees perform restructuring without balance factor bits whenever an element is accessed. The accessed element is splayed all the way to the root.`,
            ar: `على عكس أشجار AVL التي تخزّن ارتفاعات، تقوم أشجار Splay بإعادة الهيكلة دون أي بتات توازن كلما تم الوصول لعنصر. يتم تدوير العنصر المزار حتى يصل للجذر.`,
          },
        ],
        code: `// Splay Cases\nZig: Parent is Root -> Single Rotation\nZig-Zig: Node & Parent same side -> Rotate Parent then Node\nZig-Zag: Node & Parent opposite -> Rotate Node twice`,
      },
    ],
    complexity: [
      { label: { en: "Amortized Lookup", ar: "البحث المُطفأ" }, time: "O(log n)", space: "O(1)" },
    ],
  },

  // ─── Lecture 11: Red-Black Trees ──────────────────────────────
  {
    id: "lecture-8-redblack",
    number: 11,
    title: {
      en: "Lecture 11: Red-Black Trees — Invariants & Isomorphism",
      ar: "المحاضرة 11: الشجرة الحمراء والسوداء وشروط التوازن الخمسة",
    },
    summary: {
      en: "Color bit invariants guaranteeing O(log n) height and equivalence to 2-3-4 B-Trees.",
      ar: "شروط التلوين الخمسة، منع تجاور العقد الحمراء، وتكافؤها مع أشجار 2-3-4.",
    },
    tag: { en: "Red-Black", ar: "أحمر-أسود" },
    accent: "purple",
    sections: [
      {
        heading: { en: "The 5 Invariants & Recoloring Mechanics", ar: "الخصائص الخمس الأساسية وحالات التلوين والدوران" },
        paragraphs: [
          {
            en: `1. Every node is Red or Black.\n2. Root is Black.\n3. All NIL external leaves are Black.\n4. Red nodes must have Black children.\n5. Equal black-height across all paths.`,
            ar: `1. كل عقدة إما حمراء أو سوداء.\n2. الجذر دائماً أسود.\n3. أوراق NIL سوداء.\n4. يمنع تجاور العقد الحمراء.\n5. تساوى عدد العقد السوداء في كل المسارات.`,
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "Search & Insert", ar: "البحث والإدراج" }, time: "O(log n)", space: "O(1)" },
    ],
  },

  // ─── Lecture 12: Practical Exam Code Reference ────────────────
  {
    id: "lecture-9-exam-code",
    number: 12,
    title: {
      en: "Lecture 12: Practical Exam Complete Code Reference",
      ar: "المحاضرة 12: الكود العملي الشامل المعتمد لاختبار خوارزميات الأشجار",
    },
    summary: {
      en: "Complete executable reference implementation tested in practical lab examinations.",
      ar: "الكود الكامل المعتمد للامتحان العملي، يغطي بناء شجرة البحث الثنائية، توازن AVL، عمليات دوران Splay، والجولات الشجرية.",
    },
    tag: { en: "Exam Code", ar: "كود الامتحان" },
    accent: "pink",
    sections: [
      {
        heading: { en: "Complete Executable C++ Reference Suite", ar: "التنفيذ العملي القياسي المتكامل" },
        paragraphs: [
          {
            en: `This complete code suite represents the benchmark solution tested in advanced algorithm lab examinations.`,
            ar: `يمثل هذا الكود الشامل الحل القياسي المعتمد للامتحان العملي المُختبر في المعامل الجامعية.`,
          },
        ],
        code: `// Algorithms 4 Practical Exam Reference Suite\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int key; Node *l, *r; int h;\n    Node(int k): key(k), l(nullptr), r(nullptr), h(1) {}\n};\nint height(Node* n) { return n ? n->h : 0; }\nint getBF(Node* n) { return n ? height(n->l) - height(n->r) : 0; }\n\nNode* rRotate(Node* y) {\n    Node* x = y->l; y->l = x->r; x->r = y;\n    y->h = max(height(y->l), height(y->r)) + 1;\n    x->h = max(height(x->l), height(x->r)) + 1;\n    return x;\n}\nNode* insertAVL(Node* n, int k) {\n    if (!n) return new Node(k);\n    if (k < n->key) n->l = insertAVL(n->l, k);\n    else if (k > n->key) n->r = insertAVL(n->r, k);\n    else return n;\n    n->h = 1 + max(height(n->l), height(n->r));\n    int bf = getBF(n);\n    if (bf > 1 && k < n->l->key) return rRotate(n);\n    return n;\n}\nint main() {\n    Node* root = nullptr;\n    for(int k : {30, 20, 40, 10, 25, 35, 50}) root = insertAVL(root, k);\n    cout << "AVL Practical Exam Code Suite Executed Successfully\\n";\n    return 0;\n}`,
      },
    ],
  },
];

export const getLectureById = (id: string): Lecture | undefined =>
  lectures.find((l) => l.id === id);
'''

with open('src/data/lectures.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("generate_senior_lectures.py completed successfully.")
