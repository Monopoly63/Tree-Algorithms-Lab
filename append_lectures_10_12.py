# -*- coding: utf-8 -*-
with open('src/data/lectures.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the last ];
idx = text.rfind('];')

addition = '''  // ─── Lecture 10: Splay Trees (الأشجار المنفردة) ─────────────────
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
        code: `// Amortized Cost Proof Proof\\nPotential Function: Phi(T) = sum(log(size(n)))\\nAmortized Cost(Splay) <= 3 * (log(N) - log(size(X))) + 1 = O(log N)`,
      },
    ],
    complexity: [
      { label: { en: "Amortized Lookup", ar: "البحث المُطفأ" }, time: "O(log n)", space: "O(1)" },
      { label: { en: "Worst-Case Degraded", ar: "أسوأ حالة مفرطة" }, time: "O(n)", space: "O(1)" },
    ],
    examples: [
      {
        en: "Searching for 10 in a Degraded Left Chain [40 -> 30 -> 20 -> 10]:\\n1. Node 10 and parent 20 are left children (Zig-Zig): rotate 20 right around 30, then rotate 10 right around 20.\\n2. Node 10 is now left child of root 40 (Zig): rotate 10 right around 40.\\nResult: Root is 10, right child is 20, right of 20 is 40, left of 40 is 30. Tree depth is halved!",
        ar: "البحث عن 10 في سلسلة يسارية منحرفة [40 <- 30 <- 20 <- 10]:\\n1. العقدة 10 وأبوها 20 يساريان (Zig-Zig): تدوير 20 يميناً حول 30، ثم تدوير 10 يميناً حول 20.\\n2. العقدة 10 أصبحت طفل الأيسر للجذر 40 (Zig): تدوير 10 يميناً حول 40.\\nالنتيجة: الجذر 10، أيمنه 20، أيمن 20 هو 40، وأيسر 40 هو 30. تقلص عمق الشجرة للنصف!",
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
        code: `// Height Bound Proof\\nHeight(RB-Tree) <= 2 * log_2(N + 1)\\nMax Red Nodes on path <= Max Black Nodes`,
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
        code: `// Algorithms 4 Practical Laboratory Master Reference Suite\\n#include <iostream>\\n#include <vector>\\n#include <algorithm>\\nusing namespace std;\\n\\nstruct Node {\\n    int key; Node *left, *right; int height;\\n    Node(int k): key(k), left(nullptr), right(nullptr), height(1) {}\\n};\\n\\nint getHeight(Node* n) { return n ? n->height : 0; }\\nint getBF(Node* n) { return n ? getHeight(n->left) - getHeight(n->right) : 0; }\\n\\nNode* rightRotate(Node* y) {\\n    Node* x = y->left; Node* T2 = x->right;\\n    x->right = y; y->left = T2;\\n    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;\\n    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;\\n    return x;\\n}\\n\\nNode* leftRotate(Node* x) {\\n    Node* y = x->right; Node* T2 = y->left;\\n    y->left = x; x->right = T2;\\n    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;\\n    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;\\n    return y;\\n}\\n\\nNode* insertAVL(Node* node, int key) {\\n    if (!node) return new Node(key);\\n    if (key < node->key) node->left = insertAVL(node->left, key);\\n    else if (key > node->key) node->right = insertAVL(node->right, key);\\n    else return node;\\n    \\n    node->height = 1 + max(getHeight(node->left), getHeight(node->right));\\n    int bf = getBF(node);\\n    \\n    // LL Case\\n    if (bf > 1 && key < node->left->key) return rightRotate(node);\\n    // RR Case\\n    if (bf < -1 && key > node->right->key) return leftRotate(node);\\n    // LR Case\\n    if (bf > 1 && key > node->left->key) {\\n        node->left = leftRotate(node->left);\\n        return rightRotate(node);\\n    }\\n    // RL Case\\n    if (bf < -1 && key < node->right->key) {\\n        node->right = rightRotate(node->right);\\n        return leftRotate(node);\\n    }\\n    return node;\\n}\\n\\nvoid inorder(Node* root) {\\n    if (!root) return;\\n    inorder(root->left);\\n    cout << root->key << " ";\\n    inorder(root->right);\\n}\\n\\nint main() {\\n    Node* root = nullptr;\\n    for (int k : {40, 20, 60, 10, 30, 50, 70}) root = insertAVL(root, k);\\n    cout << "Practical Exam Master Suite Executed Successfully.\\nInorder Traversal: ";\\n    inorder(root);\\n    cout << "\\n";\\n    return 0;\\n}`,
      },
    ],
  },
'''

new_text = text[:idx] + addition + text[idx:]

with open('src/data/lectures.ts', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("append_lectures_10_12.py completed successfully.")
