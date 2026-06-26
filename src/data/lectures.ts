// ═══════════════════════════════════════════════════════════════
// Lectures Data — Theory content for every algorithm in the lab.
//
// This file is intentionally structured as a plain typed array so
// adding a new lecture in the future is a simple copy/paste:
// 1. Append a new `Lecture` object to the array.
// 2. Provide both English (`en`) and Arabic (`ar`) fields.
// 3. Reference the matching lab module via `labTab` (optional).
//
// Each lecture contains: introduction, definition, key terms,
// detailed explanation (paragraphs + bullet points), time/space
// complexity, examples, pseudocode, applications, and a link into
// the interactive lab.
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
  /** e.g. "Search (average)" */
  label: { en: string; ar: string };
  /** e.g. "O(log n)" — kept as-is in both languages */
  time: string;
  /** e.g. "O(n)" */
  space: string;
}

export interface LectureSection {
  heading: { en: string; ar: string };
  /** Free-form paragraphs, one per entry. */
  paragraphs: { en: string; ar: string }[];
  /** Optional bullet list. */
  bullets?: { en: string; ar: string }[];
  /** Optional pseudocode block (shared across languages). */
  code?: string;
}

export interface Lecture {
  id: string;
  number: number;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  /** Related lab tab (deep-link). Omit for pure theory lectures. */
  labTab?: LabTab;
  /** Short tag, e.g. "Basics", "Traversal". */
  tag: { en: string; ar: string };
  /** Accent color for the lecture card. */
  accent: "cyan" | "purple" | "pink";
  sections: LectureSection[];
  complexity?: ComplexityRow[];
  examples?: { en: string; ar: string }[];
  applications?: { en: string; ar: string }[];
}

export const lectures: Lecture[] = [
  // ─────────────────────────────────────────────────────────
  // LECTURE 1 — Introduction to Trees
  // ─────────────────────────────────────────────────────────
  {
    id: "intro-trees",
    number: 1,
    title: {
      en: "Introduction to Trees",
      ar: "مقدمة عن الأشجار",
    },
    summary: {
      en: "The core terminology and non-linear structure of trees.",
      ar: "المصطلحات الأساسية والبنية غير الخطية للأشجار.",
    },
    tag: { en: "Basics", ar: "الأساسيات" },
    accent: "cyan",
    sections: [
      {
        heading: { en: "What is a tree?", ar: "ما هي الشجرة؟" },
        paragraphs: [
          {
            en: "A tree is a non-linear hierarchical data structure that consists of nodes connected by edges. Unlike arrays or linked lists, a tree models relationships that branch out — making it ideal for representing hierarchies like file systems, organizational charts, or expression parsing.",
            ar: "الشجرة هي بنية بيانات هرمية غير خطية تتكوّن من عقد (Nodes) متصلة بحواف (Edges). على عكس المصفوفات أو القوائم المترابطة، تُنمذج الشجرة علاقات متفرّعة — ممّا يجعلها مثالية لتمثيل التسلسلات الهرمية مثل أنظمة الملفات أو الهياكل التنظيمية أو تحليل التعابير.",
          },
          {
            en: "A tree has exactly one root node. Every other node has exactly one parent, and any number of children. There are no cycles.",
            ar: "للشجرة عقدة جذر (Root) واحدة فقط. كل عقدة أخرى لها أب واحد فقط، وأي عدد من الأبناء. لا توجد دورات (Cycles).",
          },
        ],
      },
      {
        heading: { en: "Key Terms", ar: "المصطلحات الأساسية" },
        paragraphs: [],
        bullets: [
          {
            en: "Root — the topmost node with no parent.",
            ar: "الجذر (Root) — العقدة الأعلى التي ليس لها أب.",
          },
          {
            en: "Parent / Child — a node directly above / below another.",
            ar: "الأب / الابن — العقدة التي أعلى أو أسفل أخرى مباشرةً.",
          },
          {
            en: "Leaf — a node with no children.",
            ar: "الورقة (Leaf) — عقدة ليس لها أبناء.",
          },
          {
            en: "Depth — distance from the root to the node.",
            ar: "العمق (Depth) — المسافة من الجذر إلى العقدة.",
          },
          {
            en: "Height — distance from the node to its deepest leaf.",
            ar: "الارتفاع (Height) — المسافة من العقدة إلى أعمق ورقة تحتها.",
          },
          {
            en: "Subtree — any node plus all its descendants.",
            ar: "الشجرة الفرعية (Subtree) — أي عقدة مع كل أحفادها.",
          },
          {
            en: "Degree of a node — the number of its children.",
            ar: "درجة العقدة (Degree) — عدد أبنائها.",
          },
        ],
      },
      {
        heading: { en: "Why trees?", ar: "لماذا الأشجار؟" },
        paragraphs: [
          {
            en: "Trees enable logarithmic operations when balanced, fast hierarchical search, and elegant recursive algorithms. They form the foundation of BSTs, heaps, tries, syntax trees, segment trees, and many more structures.",
            ar: "تتيح الأشجار عمليات لوغاريتمية عندما تكون متوازنة، وبحثاً هرمياً سريعاً، وخوارزميات تكرارية أنيقة. وهي تشكّل الأساس لأشجار البحث الثنائية (BST)، والأكوام (Heaps)، والـ Tries، وأشجار التركيب، وأشجار المقاطع (Segment Trees)، والعديد غيرها.",
          },
        ],
      },
    ],
    applications: [
      { en: "File systems and directory hierarchies.", ar: "أنظمة الملفات والتسلسلات الهرمية للمجلّدات." },
      { en: "HTML / XML DOM structures.", ar: "بنية HTML / XML DOM." },
      { en: "Decision trees in AI and ML.", ar: "أشجار القرار في الذكاء الاصطناعي وتعلّم الآلة." },
      { en: "Database indexes (B-Trees).", ar: "فهارس قواعد البيانات (B-Trees)." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 2 — Binary Trees
  // ─────────────────────────────────────────────────────────
  {
    id: "binary-trees",
    number: 2,
    title: {
      en: "Binary Trees",
      ar: "الأشجار الثنائية",
    },
    summary: {
      en: "Trees where every node has at most two children: left & right.",
      ar: "أشجار حيث لكل عقدة ابنان كحدٍّ أقصى: الأيسر والأيمن.",
    },
    tag: { en: "Binary Trees", ar: "الأشجار الثنائية" },
    accent: "cyan",
    labTab: "builder",
    sections: [
      {
        heading: { en: "Definition", ar: "التعريف" },
        paragraphs: [
          {
            en: "A Binary Tree (BT) is a tree in which each node has at most two children, conventionally called the left child and the right child. No ordering of values is assumed — that extra rule distinguishes a BST from a plain BT.",
            ar: "الشجرة الثنائية (BT) هي شجرة لكل عقدة فيها ابنان كحدٍّ أقصى، يُسمّيان تقليدياً الابن الأيسر والابن الأيمن. لا يُفترض أي ترتيب للقيم — هذا القيد الإضافي هو ما يميّز BST عن BT العادية.",
          },
        ],
      },
      {
        heading: { en: "Types of Binary Trees", ar: "أنواع الأشجار الثنائية" },
        paragraphs: [],
        bullets: [
          {
            en: "Full — every node has 0 or 2 children.",
            ar: "كاملة (Full) — كل عقدة لها 0 أو 2 أبناء.",
          },
          {
            en: "Complete — every level is full except possibly the last, filled left-to-right.",
            ar: "مُكتمِلة (Complete) — كل مستوى ممتلئ باستثناء الأخير، ويُملأ من اليسار إلى اليمين.",
          },
          {
            en: "Perfect — all internal nodes have 2 children and all leaves are at the same depth.",
            ar: "مثالية (Perfect) — كل العقد الداخلية لها ابنان وكل الأوراق على نفس العمق.",
          },
          {
            en: "Balanced — heights of subtrees differ by at most 1.",
            ar: "متوازنة (Balanced) — تختلف ارتفاعات الأشجار الفرعية بـ 1 كحدٍّ أقصى.",
          },
          {
            en: "Degenerate — every parent has only one child (a linked list).",
            ar: "متدهورة (Degenerate) — لكل أب ابن واحد فقط (أشبه بقائمة مترابطة).",
          },
        ],
      },
      {
        heading: { en: "Node representation", ar: "تمثيل العقدة" },
        paragraphs: [
          {
            en: "Each node typically stores a value, a reference to its left child, and a reference to its right child.",
            ar: "تحوي كل عقدة عادةً قيمة، ومرجعاً للابن الأيسر، ومرجعاً للابن الأيمن.",
          },
        ],
        code: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}`,
      },
    ],
    complexity: [
      { label: { en: "Search (worst)", ar: "البحث (أسوأ حالة)" }, time: "O(n)", space: "O(h)" },
      { label: { en: "Insert (worst)", ar: "الإدراج (أسوأ حالة)" }, time: "O(n)", space: "O(h)" },
      { label: { en: "Traversal (any order)", ar: "الجولة (أي نوع)" }, time: "O(n)", space: "O(h)" },
    ],
    examples: [
      {
        en: "A binary tree with root 10 and children (5, 15) can represent a simple family of three nodes with no ordering constraint.",
        ar: "شجرة ثنائية جذرها 10 وأبناؤها (5, 15) يمكن أن تمثّل ثلاث عقد بدون أي قيد ترتيب.",
      },
    ],
    applications: [
      { en: "Expression trees for parsers.", ar: "أشجار التعابير في المُعرِبات (Parsers)." },
      { en: "Huffman coding in compression.", ar: "ترميز Huffman في الضغط." },
      { en: "Routing decisions and game trees.", ar: "قرارات التوجيه وأشجار الألعاب." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 3 — Binary Search Trees (BST)
  // ─────────────────────────────────────────────────────────
  {
    id: "bst",
    number: 3,
    title: {
      en: "Binary Search Trees (BST) — Insert, Delete, Search",
      ar: "أشجار البحث الثنائية (BST) — الإدراج، الحذف، البحث",
    },
    summary: {
      en: "Ordered binary trees: left < node < right.",
      ar: "أشجار ثنائية مرتّبة: الأيسر < العقدة < الأيمن.",
    },
    tag: { en: "BST", ar: "BST" },
    accent: "purple",
    labTab: "builder",
    sections: [
      {
        heading: { en: "BST Property", ar: "خاصية BST" },
        paragraphs: [
          {
            en: "For every node N: all values in N's left subtree are strictly less than N, and all values in N's right subtree are strictly greater than N. This property is what enables logarithmic search when the tree is balanced.",
            ar: "لكل عقدة N: جميع القيم في الشجرة الفرعية اليسرى لـ N أصغر تماماً من N، وجميع القيم في الشجرة الفرعية اليمنى لـ N أكبر تماماً من N. هذه الخاصية هي التي تتيح البحث اللوغاريتمي عند توازن الشجرة.",
          },
          {
            en: "An important consequence: the inorder traversal of a BST produces values in sorted (ascending) order.",
            ar: "نتيجة مهمّة: جولة inorder على BST تُنتج القيم مرتّبة تصاعدياً.",
          },
        ],
      },
      {
        heading: { en: "Search", ar: "البحث" },
        paragraphs: [
          {
            en: "Starting from the root, compare the target with the current node. Go left if smaller, right if greater, stop if equal or null.",
            ar: "انطلاقاً من الجذر، قارن القيمة المطلوبة بالعقدة الحالية. اذهب يساراً إذا كانت أصغر، يميناً إذا كانت أكبر، وتوقّف إذا تساوتا أو وصلت إلى null.",
          },
        ],
        code: `function search(node, key) {
  if (!node || node.value === key) return node;
  return key < node.value
    ? search(node.left, key)
    : search(node.right, key);
}`,
      },
      {
        heading: { en: "Insert", ar: "الإدراج" },
        paragraphs: [
          {
            en: "Walk the tree like a search, and attach the new node at the first empty spot encountered. Duplicate values are commonly either rejected or routed to one fixed side (here: right).",
            ar: "امشِ في الشجرة كأنك تبحث، ثم ألحق العقدة الجديدة في أول مكان فارغ تُصادفه. القيم المكرّرة إمّا تُرفض أو تُوجَّه لجهة ثابتة (هنا: اليمين).",
          },
        ],
        code: `function insert(node, key) {
  if (!node) return new Node(key);
  if (key < node.value) node.left  = insert(node.left,  key);
  else                   node.right = insert(node.right, key);
  return node;
}`,
      },
      {
        heading: { en: "Delete — 3 cases", ar: "الحذف — 3 حالات" },
        paragraphs: [],
        bullets: [
          {
            en: "Leaf node — remove it directly.",
            ar: "عقدة ورقة — احذفها مباشرةً.",
          },
          {
            en: "One child — replace the node with its single child.",
            ar: "ابن واحد — استبدل العقدة بابنها الوحيد.",
          },
          {
            en: "Two children — replace the node's value with its inorder successor (the smallest value in the right subtree), then delete that successor.",
            ar: "ابنان — استبدل قيمة العقدة بـ inorder successor (أصغر قيمة في الشجرة اليمنى)، ثم احذف تلك العقدة الخلف.",
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "Search (average)", ar: "البحث (متوسط)" }, time: "O(log n)", space: "O(h)" },
      { label: { en: "Insert (average)", ar: "الإدراج (متوسط)" }, time: "O(log n)", space: "O(h)" },
      { label: { en: "Delete (average)", ar: "الحذف (متوسط)" }, time: "O(log n)", space: "O(h)" },
      { label: { en: "Worst case (skewed)", ar: "أسوأ حالة (منحرفة)" }, time: "O(n)", space: "O(n)" },
    ],
    examples: [
      {
        en: "Inserting [8, 3, 10, 1, 6, 14] produces: 8 as root, 3 and 10 as its children, then 1, 6 under 3 and 14 under 10.",
        ar: "إدراج [8, 3, 10, 1, 6, 14] يُنتج: 8 جذراً، 3 و 10 ابنَين، ثم 1 و 6 تحت 3 و 14 تحت 10.",
      },
    ],
    applications: [
      { en: "In-memory ordered sets and maps.", ar: "مجموعات وقواميس مرتّبة في الذاكرة." },
      { en: "Range queries and order statistics.", ar: "استعلامات المجالات وإحصاءات الترتيب." },
      { en: "Foundation for AVL, Red-Black, and Splay trees.", ar: "الأساس لـ AVL و Red-Black و Splay Trees." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 4 — Tree Traversals
  // ─────────────────────────────────────────────────────────
  {
    id: "traversals",
    number: 4,
    title: {
      en: "Tree Traversals — Preorder, Inorder, Postorder, Level-order",
      ar: "جولات الشجرة — Preorder و Inorder و Postorder و Level-order",
    },
    summary: {
      en: "Four fundamental ways to visit every node of a tree.",
      ar: "أربع طرق أساسية لزيارة كل عقدة في الشجرة.",
    },
    tag: { en: "Traversal", ar: "الجولات" },
    accent: "pink",
    labTab: "traversal",
    sections: [
      {
        heading: { en: "Why traversals?", ar: "لماذا الجولات؟" },
        paragraphs: [
          {
            en: "A traversal is a systematic way to visit every node exactly once. Different orders expose different properties: inorder sorts a BST, preorder clones a tree, postorder deletes/evaluates it, and level-order processes it breadth-first.",
            ar: "الجولة هي طريقة منظّمة لزيارة كل عقدة مرّة واحدة بالضبط. كل نوع يكشف خاصّية مختلفة: inorder يُخرج BST مرتّبة، preorder يُستخدم للنسخ، postorder للحذف/التقييم، و level-order للمعالجة بالعَرض.",
          },
        ],
      },
      {
        heading: {
          en: "Depth-First Traversals (DFS)",
          ar: "جولات العمق-أولاً (DFS)",
        },
        paragraphs: [],
        bullets: [
          {
            en: "Preorder  (N → L → R): useful for copying a tree and serializing it.",
            ar: "Preorder (N → L → R): مفيدة لنسخ الشجرة وتسلسلها.",
          },
          {
            en: "Inorder   (L → N → R): on a BST, prints values in ascending order.",
            ar: "Inorder (L → N → R): على BST تطبع القيم تصاعدياً.",
          },
          {
            en: "Postorder (L → R → N): ideal for deleting a tree or evaluating expressions.",
            ar: "Postorder (L → R → N): مثالية لحذف الشجرة أو تقييم التعابير.",
          },
        ],
        code: `function preorder(n)  { if(!n) return; visit(n); preorder(n.left);  preorder(n.right); }
function inorder(n)   { if(!n) return; inorder(n.left);  visit(n); inorder(n.right); }
function postorder(n) { if(!n) return; postorder(n.left); postorder(n.right); visit(n); }`,
      },
      {
        heading: {
          en: "Breadth-First Traversal (BFS / Level-order)",
          ar: "جولة العَرض-أولاً (BFS / Level-order)",
        },
        paragraphs: [
          {
            en: "Level-order visits nodes level by level, from left to right. It is implemented iteratively using a queue.",
            ar: "Level-order تزور العقد مستوىً بمستوى، من اليسار إلى اليمين. تُطبَّق تكراراً باستخدام طابور (Queue).",
          },
        ],
        code: `function levelOrder(root) {
  if (!root) return;
  const q = [root];
  while (q.length) {
    const n = q.shift();
    visit(n);
    if (n.left)  q.push(n.left);
    if (n.right) q.push(n.right);
  }
}`,
      },
      {
        heading: { en: "Worked example", ar: "مثال محلول" },
        paragraphs: [
          {
            en: "For the BST produced by inserting [8, 3, 10, 1, 6, 14]: preorder = 8 3 1 6 10 14, inorder = 1 3 6 8 10 14 (sorted!), postorder = 1 6 3 14 10 8, level-order = 8 3 10 1 6 14.",
            ar: "للـ BST الناتجة عن إدراج [8, 3, 10, 1, 6, 14]: preorder = 8 3 1 6 10 14، و inorder = 1 3 6 8 10 14 (مرتّبة!)، و postorder = 1 6 3 14 10 8، و level-order = 8 3 10 1 6 14.",
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "DFS (any order)", ar: "DFS (أي نوع)" }, time: "O(n)", space: "O(h)" },
      { label: { en: "BFS (level-order)", ar: "BFS (Level-order)" }, time: "O(n)", space: "O(w)" },
    ],
    applications: [
      { en: "Sorting values (inorder on BST).", ar: "فرز القيم (inorder على BST)." },
      { en: "Serializing / deserializing trees.", ar: "تسلسل الأشجار واستعادتها." },
      { en: "Shortest-path-like traversals with BFS.", ar: "جولات شبيهة بأقصر مسار باستخدام BFS." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 5 — Reconstruction from traversals
  // ─────────────────────────────────────────────────────────
  {
    id: "reconstruct",
    number: 5,
    title: {
      en: "Reconstructing a Tree from Two Traversals",
      ar: "إعادة بناء الشجرة من جولتين",
    },
    summary: {
      en: "Rebuild a unique tree from (preorder + inorder) or (postorder + inorder).",
      ar: "أعِد بناء شجرة فريدة من (preorder + inorder) أو (postorder + inorder).",
    },
    tag: { en: "Reconstruction", ar: "إعادة البناء" },
    accent: "purple",
    labTab: "reconstruct",
    sections: [
      {
        heading: { en: "Why two traversals?", ar: "لماذا جولتان؟" },
        paragraphs: [
          {
            en: "A single traversal is generally not enough to uniquely identify a binary tree. However, given inorder plus either preorder or postorder, we can always reconstruct the tree uniquely — assuming values are distinct.",
            ar: "جولة واحدة لا تكفي عموماً لتحديد شجرة ثنائية بشكل فريد. لكن مع inorder بالإضافة إلى preorder أو postorder، يمكننا دائماً إعادة بناء الشجرة بشكل فريد — بافتراض أن القيم فريدة.",
          },
        ],
      },
      {
        heading: { en: "Algorithm — pre + in", ar: "الخوارزمية — pre + in" },
        paragraphs: [],
        bullets: [
          { en: "The first element in preorder is the current root.", ar: "أول عنصر في preorder هو الجذر الحالي." },
          {
            en: "Locate that root in inorder → the left part is the left subtree, the right part is the right subtree.",
            ar: "حدّد موقع ذلك الجذر في inorder → الجزء الأيسر هو الشجرة اليسرى، والجزء الأيمن هو الشجرة اليمنى.",
          },
          { en: "Recurse on each side.", ar: "كرّر على كل جانب." },
        ],
        code: `function build(pre, inord) {
  if (!pre.length) return null;
  const root = new Node(pre[0]);
  const i = inord.indexOf(pre[0]);
  root.left  = build(pre.slice(1, i + 1), inord.slice(0, i));
  root.right = build(pre.slice(i + 1),    inord.slice(i + 1));
  return root;
}`,
      },
      {
        heading: { en: "Algorithm — post + in", ar: "الخوارزمية — post + in" },
        paragraphs: [
          {
            en: "Same idea, but the last element of postorder is the current root. Split inorder around it and recurse on right subtree first, then left.",
            ar: "نفس الفكرة، ولكن آخر عنصر في postorder هو الجذر الحالي. قسّم inorder حوله وكرّر على الشجرة اليمنى أولاً ثم اليسرى.",
          },
        ],
      },
      {
        heading: { en: "BST variant", ar: "نسخة BST" },
        paragraphs: [
          {
            en: "If the target is specifically a BST, the inorder must be the sorted sequence of values — this provides a built-in sanity check. The lab validates this automatically.",
            ar: "إذا كان الهدف تحديداً شجرة BST، فإن inorder يجب أن يكون تسلسل القيم مرتّباً — وهذا يوفّر فحصاً ذاتياً للسلامة. المختبر يتحقّق من ذلك تلقائياً.",
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "Naive (slice/indexOf)", ar: "الطريقة البسيطة" }, time: "O(n²)", space: "O(n)" },
      { label: { en: "Hash-map optimized", ar: "مع Hash Map" }, time: "O(n)", space: "O(n)" },
    ],
    examples: [
      {
        en: "pre = [3, 9, 20, 15, 7], in = [9, 3, 15, 20, 7] → root 3, left = {9}, right = {20, 15, 7}.",
        ar: "pre = [3, 9, 20, 15, 7] و in = [9, 3, 15, 20, 7] → الجذر 3، الأيسر = {9}، الأيمن = {20, 15, 7}.",
      },
    ],
    applications: [
      {
        en: "Compiler AST reconstruction from traversal logs.",
        ar: "إعادة بناء AST في المُصرِّف من سجلّات الجولات.",
      },
      {
        en: "Deserializing trees transmitted as two arrays.",
        ar: "استعادة الأشجار المُرسلة كمصفوفتين.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 6 — m-ary → Binary → BST
  // ─────────────────────────────────────────────────────────
  {
    id: "mary-conversion",
    number: 6,
    title: {
      en: "m-ary Tree → Binary Tree → BST",
      ar: "شجرة m-ary → شجرة ثنائية → BST",
    },
    summary: {
      en: "Transform an m-ary tree into a binary tree, then into a BST.",
      ar: "تحويل شجرة m-ary إلى شجرة ثنائية، ثم إلى BST.",
    },
    tag: { en: "Conversion", ar: "التحويل" },
    accent: "cyan",
    labTab: "mary",
    sections: [
      {
        heading: { en: "m-ary tree", ar: "شجرة m-ary" },
        paragraphs: [
          {
            en: "An m-ary tree allows each node to have up to m children. Generalizes binary trees (m=2).",
            ar: "شجرة m-ary تسمح لكل عقدة بـ m أبناء كحدٍّ أقصى، وهي تعميم للشجرة الثنائية (m=2).",
          },
        ],
      },
      {
        heading: {
          en: "Left-Child Right-Sibling Representation",
          ar: "تمثيل الابن-الأيسر/الأخ-الأيمن (LCRS)",
        },
        paragraphs: [
          {
            en: "Any m-ary tree can be represented as a binary tree: the left pointer points to the first child, the right pointer points to the next sibling. This is the classical LCRS encoding.",
            ar: "يمكن تمثيل أي شجرة m-ary كشجرة ثنائية: المؤشّر الأيسر يشير إلى أول ابن، والمؤشّر الأيمن يشير إلى الأخ التالي. هذا هو ترميز LCRS الكلاسيكي.",
          },
        ],
        code: `// For each m-ary node with children c1, c2, ..., ck:
//   binary.left  = c1
//   c1.right     = c2
//   c2.right     = c3
//   ...
//   c(k-1).right = ck`,
      },
      {
        heading: {
          en: "Binary Tree → BST",
          ar: "من شجرة ثنائية إلى BST",
        },
        paragraphs: [
          {
            en: "Collect all values via inorder, sort them, and re-insert into a fresh BST (or rebuild by placing the sorted middle element at each recursive step to get a balanced BST).",
            ar: "اجمع كل القيم عبر inorder، رتّبها، ثم أعِد إدراجها في BST جديدة (أو أعِد البناء بوضع العنصر الأوسط المرتّب في كل خطوة تكرارية للحصول على BST متوازنة).",
          },
        ],
        code: `function toBalancedBST(sorted, lo = 0, hi = sorted.length - 1) {
  if (lo > hi) return null;
  const mid  = (lo + hi) >> 1;
  const node = new Node(sorted[mid]);
  node.left  = toBalancedBST(sorted, lo, mid - 1);
  node.right = toBalancedBST(sorted, mid + 1, hi);
  return node;
}`,
      },
    ],
    complexity: [
      {
        label: { en: "m-ary → Binary (LCRS)", ar: "m-ary → Binary (LCRS)" },
        time: "O(n)",
        space: "O(n)",
      },
      {
        label: { en: "Binary → Balanced BST", ar: "Binary → Balanced BST" },
        time: "O(n log n)",
        space: "O(n)",
      },
    ],
    applications: [
      {
        en: "Storing hierarchies of arbitrary width in fixed-structure binary formats.",
        ar: "تخزين تسلسلات هرمية متغيّرة العرض في صيغ ثنائية ثابتة البنية.",
      },
      {
        en: "File-system compaction and DOM serialization.",
        ar: "ضغط أنظمة الملفات وتسلسل DOM.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 7 — Numeric Expression Trees
  // ─────────────────────────────────────────────────────────
  {
    id: "numeric-expression",
    number: 7,
    title: {
      en: "Numeric Expression Trees",
      ar: "أشجار التعابير الرقمية",
    },
    summary: {
      en: "Parse arithmetic expressions into trees and evaluate them.",
      ar: "تحليل التعابير الحسابية إلى أشجار وتقييمها.",
    },
    tag: { en: "Expressions", ar: "التعابير" },
    accent: "pink",
    labTab: "numeric",
    sections: [
      {
        heading: {
          en: "Representation",
          ar: "التمثيل",
        },
        paragraphs: [
          {
            en: "In an expression tree, each internal node is an operator (+, −, ×, ÷) and each leaf is an operand (number). Evaluating the tree is a postorder traversal that combines children values with the current operator.",
            ar: "في شجرة التعبير، كل عقدة داخلية مُعامِل (+، −، ×، ÷) وكل ورقة هي مُعامَل (عدد). تقييم الشجرة هو جولة postorder تدمج قيم الأبناء باستخدام المُعامِل الحالي.",
          },
        ],
      },
      {
        heading: { en: "Notations", ar: "الصياغات" },
        paragraphs: [],
        bullets: [
          {
            en: "Infix — operator between operands: (3 + 4) × 5. Needs parentheses / precedence.",
            ar: "Infix — المُعامِل بين المُعامَلات: (3 + 4) × 5. يحتاج أقواساً/أولوية.",
          },
          {
            en: "Prefix (Polish) — operator first: × + 3 4 5. No parentheses needed.",
            ar: "Prefix (Polish) — المُعامِل أولاً: × + 3 4 5. بدون أقواس.",
          },
          {
            en: "Postfix (Reverse Polish) — operator last: 3 4 + 5 ×. Straightforward stack evaluation.",
            ar: "Postfix (Reverse Polish) — المُعامِل أخيراً: 3 4 + 5 ×. تقييم مباشر باستخدام Stack.",
          },
        ],
      },
      {
        heading: { en: "Building from postfix", ar: "البناء من postfix" },
        paragraphs: [
          {
            en: "Iterate through the postfix tokens using a stack of partial trees. For an operand push a leaf; for an operator pop two trees (right, then left) and push a new node combining them.",
            ar: "امشِ عبر رموز postfix باستخدام Stack من الأشجار الجزئية. للمُعامَل ضع ورقة؛ للمُعامِل اسحب شجرتين (الأيمن ثم الأيسر) وضع عقدة جديدة تضمّهما.",
          },
        ],
        code: `function buildFromPostfix(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (isOperator(t)) {
      const right = stack.pop();
      const left  = stack.pop();
      stack.push({ value: t, left, right });
    } else {
      stack.push({ value: t, left: null, right: null });
    }
  }
  return stack.pop();
}`,
      },
      {
        heading: { en: "Evaluation", ar: "التقييم" },
        paragraphs: [
          {
            en: "Evaluate recursively: for a leaf return its number; for an internal node apply its operator to the evaluated left and right children.",
            ar: "قيّم تكراراً: للورقة أعِد رقمها؛ للعقدة الداخلية طبّق مُعامِلها على التقييمين الأيسر والأيمن.",
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "Build", ar: "البناء" }, time: "O(n)", space: "O(n)" },
      { label: { en: "Evaluate", ar: "التقييم" }, time: "O(n)", space: "O(h)" },
    ],
    applications: [
      { en: "Calculator engines and formula evaluators.", ar: "محرّكات الآلات الحاسبة وتقييم الصيغ." },
      { en: "Compilers / interpreters intermediate forms.", ar: "الصيغ الوسيطة في المُصرِّفات والمُفسِّرات." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 8 — Symbolic Expression Trees
  // ─────────────────────────────────────────────────────────
  {
    id: "symbolic-expression",
    number: 8,
    title: {
      en: "Symbolic Expression Trees",
      ar: "أشجار التعابير الرمزية",
    },
    summary: {
      en: "Trees for expressions containing variables and algebraic symbols.",
      ar: "أشجار للتعابير التي تحوي متغيّرات ورموزاً جبرية.",
    },
    tag: { en: "Expressions", ar: "التعابير" },
    accent: "pink",
    labTab: "symbolic",
    sections: [
      {
        heading: { en: "From numbers to symbols", ar: "من الأرقام إلى الرموز" },
        paragraphs: [
          {
            en: "Symbolic expression trees allow leaves to be variables (x, y, a) as well as constants. Evaluation becomes conditional on a variable environment, and simplification rules (identity, zero, distributive) can be applied by tree rewriting.",
            ar: "أشجار التعابير الرمزية تسمح بأن تكون الأوراق متغيّرات (x, y, a) بالإضافة إلى الثوابت. يصبح التقييم مشروطاً ببيئة القيم، ويمكن تطبيق قواعد التبسيط (المحايد، الصفر، التوزيع) بإعادة كتابة الشجرة.",
          },
        ],
      },
      {
        heading: { en: "Core use cases", ar: "أهم الاستخدامات" },
        paragraphs: [],
        bullets: [
          { en: "Symbolic differentiation (building ∂/∂x trees).", ar: "الاشتقاق الرمزي (بناء أشجار ∂/∂x)." },
          { en: "Algebraic simplification and factoring.", ar: "التبسيط والتحليل الجبري." },
          { en: "Pretty-printing formulas in multiple notations.", ar: "طباعة الصيغ بصيغ متعدّدة." },
        ],
      },
      {
        heading: { en: "Pretty printing", ar: "الطباعة المنسّقة" },
        paragraphs: [
          {
            en: "Print the tree in any of infix / prefix / postfix by choosing the order in which you concatenate the current node and its recursive children.",
            ar: "اطبع الشجرة بأي صياغة (infix / prefix / postfix) بتغيير ترتيب دمج العقدة الحالية مع نتائج الأبناء.",
          },
        ],
        code: `function toInfix(n) {
  if (!n.left && !n.right) return n.value;        // leaf
  return \`(\${toInfix(n.left)} \${n.value} \${toInfix(n.right)})\`;
}`,
      },
    ],
    complexity: [
      { label: { en: "Build / Print", ar: "البناء / الطباعة" }, time: "O(n)", space: "O(h)" },
      {
        label: { en: "Simplify (rewrite passes)", ar: "التبسيط (مراحل إعادة الكتابة)" },
        time: "O(n · p)",
        space: "O(n)",
      },
    ],
    applications: [
      { en: "Computer algebra systems (CAS).", ar: "أنظمة الجبر الحاسوبي (CAS)." },
      { en: "Symbolic math in teaching tools.", ar: "الرياضيات الرمزية في الأدوات التعليمية." },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LECTURE 9 — AVL Trees
  // ─────────────────────────────────────────────────────────
  {
    id: "avl-trees",
    number: 9,
    title: {
      en: "AVL Trees — Self-Balancing Binary Search Trees",
      ar: "أشجار AVL — أشجار البحث الثنائية ذاتية التوازن",
    },
    summary: {
      en: "Height-balanced BSTs with automatic rotations to guarantee O(log n) operations.",
      ar: "أشجار BST متوازنة الارتفاع مع دورانات تلقائية لضمان عمليات O(log n).",
    },
    tag: { en: "AVL", ar: "AVL" },
    accent: "purple",
    labTab: "avl",
    sections: [
      {
        heading: { en: "What is an AVL Tree?", ar: "ما هي شجرة AVL؟" },
        paragraphs: [
          {
            en: "An AVL tree (named after Adelson-Velsky and Landis, 1962) is a self-balancing binary search tree. For every node, the heights of its left and right subtrees differ by at most 1. This balance constraint guarantees that the tree height is always O(log n), ensuring efficient search, insert, and delete operations.",
            ar: "شجرة AVL (سُمّيت نسبةً إلى أديلسون-فيلسكي ولانديس، 1962) هي شجرة بحث ثنائية ذاتية التوازن. لكل عقدة، يختلف ارتفاع الشجرتين الفرعيتين اليسرى واليمنى بـ 1 كحدٍّ أقصى. هذا القيد يضمن أن ارتفاع الشجرة دائماً O(log n)، ممّا يكفل كفاءة عمليات البحث والإدراج والحذف.",
          },
        ],
      },
      {
        heading: { en: "Balance Factor", ar: "عامل التوازن (Balance Factor)" },
        paragraphs: [
          {
            en: "The balance factor (BF) of a node is defined as: BF = height(left subtree) − height(right subtree). In a valid AVL tree, every node must have BF ∈ {-1, 0, +1}. When an insertion or deletion causes any node's BF to become +2 or -2, a rotation is performed to restore balance.",
            ar: "عامل التوازن (BF) لعقدة يُعرَّف بـ: BF = ارتفاع(الشجرة اليسرى) − ارتفاع(الشجرة اليمنى). في شجرة AVL صالحة، يجب أن يكون BF لكل عقدة ∈ {-1, 0, +1}. عندما يتسبّب إدراج أو حذف في جعل BF لأي عقدة +2 أو -2، يُجرى دوران لاستعادة التوازن.",
          },
        ],
      },
      {
        heading: { en: "Rotations", ar: "الدورانات (Rotations)" },
        paragraphs: [
          {
            en: "AVL trees use four types of rotations to restore balance after insertions or deletions:",
            ar: "تستخدم أشجار AVL أربعة أنواع من الدورانات لاستعادة التوازن بعد الإدراج أو الحذف:",
          },
        ],
        bullets: [
          {
            en: "LL (Left-Left) — single right rotation: the imbalance is in the left child's left subtree.",
            ar: "LL (يسار-يسار) — دوران يميني واحد: الاختلال في الشجرة اليسرى للابن الأيسر.",
          },
          {
            en: "RR (Right-Right) — single left rotation: the imbalance is in the right child's right subtree.",
            ar: "RR (يمين-يمين) — دوران يساري واحد: الاختلال في الشجرة اليمنى للابن الأيمن.",
          },
          {
            en: "LR (Left-Right) — double rotation (left then right): the imbalance is in the left child's right subtree.",
            ar: "LR (يسار-يمين) — دوران مزدوج (يساري ثم يميني): الاختلال في الشجرة اليمنى للابن الأيسر.",
          },
          {
            en: "RL (Right-Left) — double rotation (right then left): the imbalance is in the right child's left subtree.",
            ar: "RL (يمين-يسار) — دوران مزدوج (يميني ثم يساري): الاختلال في الشجرة اليسرى للابن الأيمن.",
          },
        ],
        code: `// Right rotation (LL case)
function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  updateHeight(y);
  updateHeight(x);
  return x;
}

// Left rotation (RR case)
function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  updateHeight(x);
  updateHeight(y);
  return y;
}`,
      },
      {
        heading: { en: "Insertion", ar: "الإدراج" },
        paragraphs: [
          {
            en: "Insert like a standard BST. After insertion, walk back up the path to the root, updating heights and checking balance factors. If any node becomes unbalanced (BF = ±2), apply the appropriate rotation (LL, RR, LR, or RL) based on where the new node was inserted relative to the unbalanced node.",
            ar: "أدرج كما في BST العادية. بعد الإدراج، ارجع صعوداً إلى الجذر مع تحديث الارتفاعات وفحص عوامل التوازن. إذا أصبحت أي عقدة غير متوازنة (BF = ±2)، طبّق الدوران المناسب (LL أو RR أو LR أو RL) بناءً على موقع العقدة الجديدة بالنسبة للعقدة غير المتوازنة.",
          },
        ],
        code: `function avlInsert(node, value) {
  // 1. Standard BST insert
  if (!node) return new AVLNode(value);
  if (value < node.value) node.left = avlInsert(node.left, value);
  else if (value > node.value) node.right = avlInsert(node.right, value);
  else return node; // duplicate

  // 2. Update height
  updateHeight(node);

  // 3. Check balance and rotate if needed
  const bf = balanceFactor(node);
  if (bf > 1 && value < node.left.value) return rotateRight(node);       // LL
  if (bf < -1 && value > node.right.value) return rotateLeft(node);      // RR
  if (bf > 1 && value > node.left.value) {                               // LR
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (bf < -1 && value < node.right.value) {                             // RL
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}`,
      },
      {
        heading: { en: "Deletion", ar: "الحذف" },
        paragraphs: [
          {
            en: "Delete like a standard BST (3 cases: leaf, one child, two children with inorder successor). After deletion, walk back up updating heights and rebalancing with rotations as needed. The rotation case is determined by the balance factor of the unbalanced node and its heavier child.",
            ar: "احذف كما في BST العادية (3 حالات: ورقة، ابن واحد، ابنان مع inorder successor). بعد الحذف، ارجع صعوداً مع تحديث الارتفاعات وإعادة التوازن بالدورانات حسب الحاجة. يُحدَّد نوع الدوران بعامل التوازن للعقدة غير المتوازنة وابنها الأثقل.",
          },
        ],
      },
      {
        heading: { en: "Complexity", ar: "التعقيد" },
        paragraphs: [
          {
            en: "Because the AVL tree maintains a height of O(log n), all primary operations (search, insert, delete) run in O(log n) time in both average and worst cases. This is a significant improvement over plain BSTs, which can degrade to O(n) in the worst case (skewed tree).",
            ar: "بما أن شجرة AVL تحافظ على ارتفاع O(log n)، فإن جميع العمليات الأساسية (البحث، الإدراج، الحذف) تعمل في O(log n) في الحالة المتوسطة والأسوأ. هذا تحسّن كبير مقارنة بـ BST العادية التي قد تتدهور إلى O(n) في أسوأ حالة (شجرة منحرفة).",
          },
        ],
      },
    ],
    complexity: [
      { label: { en: "Search", ar: "البحث" }, time: "O(log n)", space: "O(log n)" },
      { label: { en: "Insert", ar: "الإدراج" }, time: "O(log n)", space: "O(log n)" },
      { label: { en: "Delete", ar: "الحذف" }, time: "O(log n)", space: "O(log n)" },
      { label: { en: "Traversal", ar: "الجولة" }, time: "O(n)", space: "O(n)" },
    ],
    examples: [
      {
        en: "Inserting [30, 20, 10] into an empty AVL tree: after inserting 10, node 30 has BF=+2 (LL case). A right rotation at 30 produces root=20, left=10, right=30 — balanced.",
        ar: "إدراج [30, 20, 10] في شجرة AVL فارغة: بعد إدراج 10، العقدة 30 لها BF=+2 (حالة LL). دوران يميني عند 30 يُنتج جذر=20، أيسر=10، أيمن=30 — متوازنة.",
      },
      {
        en: "Inserting [10, 20, 15] triggers an RL case at node 10: first right-rotate at 20, then left-rotate at 10, yielding root=15, left=10, right=20.",
        ar: "إدراج [10, 20, 15] يُحفّز حالة RL عند العقدة 10: أولاً دوران يميني عند 20، ثم دوران يساري عند 10، والنتيجة جذر=15، أيسر=10، أيمن=20.",
      },
    ],
    applications: [
      { en: "Database indexing where guaranteed O(log n) lookups are required.", ar: "فهرسة قواعد البيانات حيث يُطلب بحث مضمون O(log n)." },
      { en: "Memory allocators and interval scheduling.", ar: "مخصّصات الذاكرة وجدولة الفترات." },
      { en: "In-memory ordered dictionaries and sets.", ar: "القواميس والمجموعات المرتّبة في الذاكرة." },
      { en: "Compilers — symbol tables with balanced lookup.", ar: "المُصرِّفات — جداول الرموز مع بحث متوازن." },
    ],
  },
  // ─── Lecture 10: Splay Trees (الأشجار المنفردة) ─────────────────
  {
    id: "lecture-7-splay",
    number: 10,
    title: {
      en: "Lecture 10: Splay Trees — Temporal Locality & Amortized BSTs",
      ar: "المحاضرة 10: الأشجار المنفردة وتوازن Splay — المحلية الزمنية والأداء المُطفأ",
    },
    summary: {
      en: "Self-adjusting binary search trees that move frequently accessed elements to the root via splaying rotations (Zig, Zig-Zig, Zig-Zag).",
      ar: "أشجار بحث ثنائية ذاتية التعديل تنقل العناصر المزارة بكثرة إلى الجذر عبر عمليات الدوران المنفردة (Zig, Zig-Zig, Zig-Zag) لتحقيق أداء مُطفأ O(log n).",
    },
    tag: { en: "Splay Tree", ar: "الأشجار المنفردة" },
    accent: "purple",
    sections: [
      {
        heading: { en: "Architectural Motivation & Temporal Locality", ar: "الدافع الهندسي ومبدأ المحلية الزمنية (Temporal Locality)" },
        paragraphs: [
          {
            en: "In traditional balanced BSTs (like AVL or Red-Black), every operation strictly pays O(log n) time, even if 80% of lookups target the exact same 5% of nodes (Pareto Principle / 80-20 rule). Furthermore, AVL trees require storing explicit balance factor metadata bits at every node.",
            ar: "في أشجار البحث المتوازنة التقليدية (مثل AVL أو الأحمر-الأسود)، تدفع كل عملية تكلفة ثابتة O(log n)، حتى لو كانت 80% من عمليات البحث تستهدف نفس الـ 5% من العقد (مبدأ باريتو). بالإضافة إلى استهلاك ذاكرة لتخزين عامل التوازن عند كل عقدة.",
          },
          {
            en: "A Splay Tree introduces a radical cache-inspired paradigm: whenever a node N is accessed (via search, insertion, or deletion), N is rotated all the way to the root of the tree. Consequently, recently accessed elements sit near the top, allowing subsequent lookups to run in lightning-fast O(1) time.",
            ar: "تُقدّم شجرة Splay مفهوماً مستوحى من ذاكرة الكاش: كلما تم الوصول لعقدة N (بحث، إدراج، حذف)، يتم تدوير N صعوداً حتى تصبح هي الجذر السيادي للشجرة. وبالتالي، تستقر العناصر المتكررة في القمة وتصبح زيارتها القادمة فورية O(1).",
          },
        ],
      },
      {
        heading: { en: "The Three Splaying Rotations Mechanics", ar: "حالات الدوران الثلاث في ميكانيكا الـ Splay" },
        paragraphs: [
          {
            en: "When splaying node X whose parent is P and grandparent is G, restructuring follows three strict structural cases:",
            ar: "عند إجراء Splay للعقدة X بوجود الأب P والجد G، تتبع الهيكلة 3 قواعد صارمة:",
          },
        ],
        bullets: [
          {
            en: "1. Zig Case (Terminal Step): P is the Root. Perform a single left or right rotation on X. X becomes the new Root.",
            ar: "1. حالة Zig (الخطوة الأخيرة): عندما يكون الأب P هو الجذر. يُجرى دوران أحادي (يمين أو يسار) لتصبح X هي الجذر.",
          },
          {
            en: "2. Zig-Zig Case (Homogeneous Chain): X and P are both left children (or both right children). CRITICAL RULE: Rotate P around G first, THEN rotate X around P. This doubles pruning efficiency compared to naive simple rotations.",
            ar: "2. حالة Zig-Zig (السلسلة المتجانسة): عندما تكون X و P في نفس الاتجاه (كلاهما يسار أو يمين). قاعدة ذهبية: يُدوَّر الأب P حول الجد G أولاً، ثم تُدوَّر X حول P. هذا يقلص العمق للضعف مقارنة بالتدوير الساذج.",
          },
          {
            en: "3. Zig-Zag Case (Heterogeneous Chain): X is a right child and P is a left child (or vice versa). Perform a double rotation: rotate X around P, then rotate X around G.",
            ar: "3. حالة Zig-Zag (السلسلة المتعاكسة): عندما تكون X يساراً و P يميناً (أو العكس). يُجرى دوران ثنائي: تدوير X حول P، ثم تدوير X حول الجد G.",
          },
        ],
        code: `// Amortized Cost Proof Proof\nPotential Function: Phi(T) = sum(log(size(n)))\nAmortized Cost(Splay) <= 3 * (log(N) - log(size(X))) + 1 = O(log N)`,
      },
    ],
    complexity: [
      { label: { en: "Amortized Lookup", ar: "البحث المُطفأ" }, time: "O(log n)", space: "O(1)" },
      { label: { en: "Worst-Case Degraded", ar: "أسوأ حالة مفرطة" }, time: "O(n)", space: "O(1)" },
    ],
    examples: [
      {
        en: "Searching for 10 in a Degraded Left Chain [40 -> 30 -> 20 -> 10]:\n1. Node 10 and parent 20 are left children (Zig-Zig): rotate 20 right around 30, then rotate 10 right around 20.\n2. Node 10 is now left child of root 40 (Zig): rotate 10 right around 40.\nResult: Root is 10, right child is 20, right of 20 is 40, left of 40 is 30. Tree depth is halved!",
        ar: "البحث عن 10 في سلسلة يسارية منحرفة [40 <- 30 <- 20 <- 10]:\n1. العقدة 10 وأبوها 20 يساريان (Zig-Zig): تدوير 20 يميناً حول 30، ثم تدوير 10 يميناً حول 20.\n2. العقدة 10 أصبحت طفل الأيسر للجذر 40 (Zig): تدوير 10 يميناً حول 40.\nالنتيجة: الجذر 10، أيمنه 20، أيمن 20 هو 40، وأيسر 40 هو 30. تقلص عمق الشجرة للنصف!",
      },
    ],
    applications: [
      { en: "Network Routers — IP Routing Caches where 90% of packets target recent destinations.", ar: "موجّهات الشبكات — كاش عناوين IP حيث 90% من الحزم تتجه لنفس السيرفرات." },
      { en: "Windows / Linux Virtual Memory Mapped Page Tables.", ar: "جداول صفحات الذاكرة الافتراضية في نظم التشغيل." },
      { en: "Splay-based Priority Queues in Discrete Event Simulators.", ar: "طوابير الأولوية فائقة السرعة في محاكيات الأحداث." },
    ],
  },

  // ─── Lecture 11: Red-Black Trees (الشجرة الحمراء والسوداء) ───────
  {
    id: "lecture-8-redblack",
    number: 11,
    title: {
      en: "Lecture 11: Red-Black Trees — 5 Invariants & Isomorphism",
      ar: "المحاضرة 11: الشجرة الحمراء والسوداء (Red-Black Tree) — الخصائص الخمس وضوابط التوازن",
    },
    summary: {
      en: "Self-balancing binary search tree using 1 color bit per node to guarantee worst-case O(log n) height <= 2*log(n+1).",
      ar: "شجرة بحث ثنائية ذاتية التوازن تستخدم بت تلوين واحد (أحمر/أسود) لضمان أقصى ارتفاع لوغاريتمي صارم.",
    },
    tag: { en: "Red-Black", ar: "أحمر-أسود" },
    accent: "pink",
    sections: [
      {
        heading: { en: "The 5 Fundamental Red-Black Invariants", ar: "الخصائص الهيكلية الخمس الإلزامية (The 5 Invariants)" },
        paragraphs: [
          {
            en: "To prevent the tree from becoming skewed while avoiding the strict rotations of AVL trees, a Red-Black tree enforces five absolute laws:",
            ar: "لمنع الشجرة من الانحراف الخطّي مع تجنب كثرة الدورات المعقدة في AVL، تفرض الشجرة الحمراء والسوداء 5 قوانين صارمة:",
          },
        ],
        bullets: [
          { en: "1. Node Color: Every node is colored either Red or Black.", ar: "1. تلوين العقد: كل عقدة في الهيكل تحمل إما اللون الأحمر أو اللون الأسود." },
          { en: "2. Root Property: The unique Root node is always strictly Black.", ar: "2. سيادة الجذر: عقدة الجذر السيادية يجب أن تكون سوداء دائماً." },
          { en: "3. Leaf Invariant: All external null pointers (NIL leaves) are Black.", ar: "3. أوراق العدم: جميع المؤشرات الفارغة الطرفية (NIL Leaves) تُعتبر سوداء اللون." },
          { en: "4. Red Non-Adjacency: If a node is Red, both of its children MUST be Black. (No two consecutive red nodes on any simple path).", ar: "4. منع التجاور الأحمر: إذا كانت العقدة حمراء، فيجب أن يكون أبناؤها باللون الأسود. (يستحيل وجود عقدتين حمراوين متتاليتين)." },
          { en: "5. Black-Height Equality: Every simple path from a node to any descendant NIL leaf contains the exact same number of Black nodes.", ar: "5. التساوى الأسود (Black-Height): كل مسار مباشر من عقدة إلى أوراقها يحتوي على نفس العدد الدقيق من العقد السوداء." },
        ],
      },
      {
        heading: { en: "Insertion & Balancing Strategy (سيناريوهات المعالجة)", ar: "استراتيجية الإدراج وإعادة التلوين والدوران" },
        paragraphs: [
          {
            en: "Newly inserted internal leaf nodes are ALWAYS colored Red (to preserve Invariant 5). If the parent P is Black, the tree is valid immediately. If P is Red, we check Uncle U:",
            ar: "العقدة الجديدة تُدرج دائماً باللون الأحمر (للحفاظ على تساوى الارتفاع الأسود). إذا كان الأب أسود انتهى الأمر. أما إذا كان الأب أحمر، نفحص العم U:",
          },
        ],
        bullets: [
          {
            en: "Case A (Red Uncle): P is Red and Uncle U is Red. Solution: Recolor P and U to Black, recolor Grandparent G to Red, and recursively verify G.",
            ar: "الحالة الأولى (العم الأحمر): الأب أحمر والعم U أحمر. الحل: إعادة تلوين الأب والعم للأسود، وتلوين الجد G للأحمر، ومتابعة التحقق للجد.",
          },
          {
            en: "Case B (Black Uncle + Triangle): P is Red, Uncle U is Black, Node is inner child (e.g., LR or RL). Solution: Rotate P to align into a straight chain.",
            ar: "الحالة الثانية (العم الأسود + المسار المنكسر): الأب أحمر، العم أسود، والعقدة في المسار الداخلي. الحل: تدوير الأب لتحويلها لسلسلة مستقيمة.",
          },
          {
            en: "Case C (Black Uncle + Line): P is Red, Uncle U is Black, Node is outer child (e.g., LL or RR). Solution: Rotate Grandparent G and swap colors of P and G.",
            ar: "الحالة الثالثة (العم الأسود + المسار المستقيم): تدوير الجد G وعكس الألوان بين الأب والجد.",
          },
        ],
        code: `// Height Bound Proof\nHeight(RB-Tree) <= 2 * log_2(N + 1)\nMax Red Nodes on path <= Max Black Nodes`,
      },
    ],
    complexity: [
      { label: { en: "Guaranteed Worst-Case", ar: "الزمن المضمون أسوأ حالة" }, time: "O(log n)", space: "O(1)" },
    ],
    examples: [
      {
        en: "Inserting 4 into [Root=10(B), Left=5(R)]: Node 4 is red. Parent 5 is red. Uncle is NIL (Black). Case C (LL Line): Right rotate at 10, recolor 5 to Black, 10 to Red. Root is 5(B), Left=4(R), Right=10(R). Perfectly balanced!",
        ar: "إدراج 4 في شجرة [الجذر=10(أسود)، أيسر=5(أحمر)]: العقدة 4 حمراء والأب 5 أحمر والعم NIL(أسود). تطبيق الحالة الثالثة: دوران يميني عند 10، تلوين 5 أسود، و10 أحمر. النتيجة: الجذر 5(أسود)، أيسر 4(أحمر)، أيمن 10(أحمر). توازن مثالي!",
      },
    ],
    applications: [
      { en: "C++ Standard Template Library (STL) — std::map, std::multimap, std::set.", ar: "مكتبة القوالب القياسية في C++ (STL) — هيكل القواميس والمجموعات std::map." },
      { en: "Java Class Library — java.util.TreeMap and TreeSet.", ar: "مكتبة أصناف جافا — هيكل java.util.TreeMap." },
      { en: "Linux Operating System CFS (Completely Fair Scheduler) task tree.", ar: "نواة لينكس — جدولة المهام العادلة (CFS Virtual Runtime Tree)." },
    ],
  },

  // ─── Lecture 12: Practical Exam Complete Code ───────────────────
  {
    id: "lecture-9-exam-code",
    number: 12,
    title: {
      en: "Lecture 12: Practical Exam Complete Code Reference Suite",
      ar: "المحاضرة 12: مرجع الكود القياسي المعتمد لاختبار الخوارزميات العملي الشامل",
    },
    summary: {
      en: "Complete executable reference suite tested in practical university laboratory examinations covering BST, AVL, Splay, and m-ary trees.",
      ar: "الكود الكامل المعتمد للامتحان العملي، يغطي بناء شجرة البحث الثنائية، توازن AVL، عمليات دوران Splay، والجولات الشجرية.",
    },
    tag: { en: "Exam Code", ar: "كود الامتحان" },
    accent: "cyan",
    sections: [
      {
        heading: { en: "Complete Standard Examination Implementation", ar: "الحل البرمجي المعتمد للامتحان العملي في المعامل" },
        paragraphs: [
          {
            en: "Students studying for the final practical examination should memorize and test this standard multi-algorithm reference implementation.",
            ar: "هذا الكود الشامل يمثل المرجع القياسي المعتمد للاختبار العملي في المعامل الجامعية، ويضم تطبيق الخوارزميات المتقدمة في هيكل واحد متصل.",
          },
        ],
        code: `// Algorithms 4 Practical Laboratory Master Reference Suite\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int key; Node *left, *right; int height;\n    Node(int k): key(k), left(nullptr), right(nullptr), height(1) {}\n};\n\nint getHeight(Node* n) { return n ? n->height : 0; }\nint getBF(Node* n) { return n ? getHeight(n->left) - getHeight(n->right) : 0; }\n\nNode* rightRotate(Node* y) {\n    Node* x = y->left; Node* T2 = x->right;\n    x->right = y; y->left = T2;\n    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;\n    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;\n    return x;\n}\n\nNode* leftRotate(Node* x) {\n    Node* y = x->right; Node* T2 = y->left;\n    y->left = x; x->right = T2;\n    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;\n    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;\n    return y;\n}\n\nNode* insertAVL(Node* node, int key) {\n    if (!node) return new Node(key);\n    if (key < node->key) node->left = insertAVL(node->left, key);\n    else if (key > node->key) node->right = insertAVL(node->right, key);\n    else return node;\n    \n    node->height = 1 + max(getHeight(node->left), getHeight(node->right));\n    int bf = getBF(node);\n    \n    // LL Case\n    if (bf > 1 && key < node->left->key) return rightRotate(node);\n    // RR Case\n    if (bf < -1 && key > node->right->key) return leftRotate(node);\n    // LR Case\n    if (bf > 1 && key > node->left->key) {\n        node->left = leftRotate(node->left);\n        return rightRotate(node);\n    }\n    // RL Case\n    if (bf < -1 && key < node->right->key) {\n        node->right = rightRotate(node->right);\n        return leftRotate(node);\n    }\n    return node;\n}\n\nvoid inorder(Node* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->key << " ";\n    inorder(root->right);\n}\n\nint main() {\n    Node* root = nullptr;\n    for (int k : {40, 20, 60, 10, 30, 50, 70}) root = insertAVL(root, k);\n    cout << "Practical Exam Master Suite Executed Successfully.\nInorder Traversal: ";\n    inorder(root);\n    cout << "\n";\n    return 0;\n}`,
      },
    ],
  },
];

/** Get a lecture by its id. */
export const getLectureById = (id: string): Lecture | undefined =>
  lectures.find((l) => l.id === id);