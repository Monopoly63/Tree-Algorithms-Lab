# Tree Algorithms Lab — تقرير المشروع

---

## 1. غلاف المشروع

| | |
|---|---|
| **اسم الطالب** | Abdulmoin Hablas |
| **المادة** | Algorithms 3 |
| **عنوان المشروع** | Tree Algorithms Lab |
| **نوع المشروع** | Single Page Application (Web) |
| **التقنيات** | React 18 + TypeScript + Tailwind CSS + shadcn-ui + SVG |
| **Backend المرفق** | FastAPI (Python) — للتنزيل كـ ZIP |

---

## 2. وصف المشروع بلغتي

شو هو المشروع باختصار:  
المشروع عبارة عن **مختبر تفاعلي (Lab)** لخوارزميات الأشجار اللي أخذناها في مادة Algorithms 3. بدل ما أسلّم كود Python بس وأشرحه كلامياً، قررت أبني موقع كامل يشتغل في المتصفح، أنا وأي حدا يقدر يدخل عليه ويجرب الخوارزميات **live** ويشوف الشجرة ترتسم قدّامه.

الفكرة الأساسية هي إنه:
- أدخل قيم، يبنيلي BT أو BST.
- أرسم شجرة **يدوياً** بالضغط على العقد.
- أحوّل m-ary tree إلى Binary Tree ثم إلى BST وأشوف الـ inorder قبل وبعد.
- أحرّك الـ traversals (Preorder, Inorder, Postorder) بتدرّج بطيء (≈600ms بين كل عقدة).
- أبني Expression Tree لمعادلة رقمية أو رمزية وأقيّمها.

### ليش اخترت هاد التصميم؟

1. **TypeScript + React**: حبيت يكون الكود type-safe ومرتّب في modules. TypeScript جبرني أعرّف الـ `TreeNode` و `MaryNode` بشكل واضح من البداية.
2. **SVG بدل Canvas**: لأن SVG بيخلي كل عقدة DOM element، فصار سهل أني أخلي الرسم **tappable** (إضافة وحذف وتعديل بالضغط على العقدة).
3. **Glass / Blur Theme أسود-رمادي-أبيض**: حبيت شكل احترافي وقريب من المواقع الحديثة، والخلفية السوداء بتبرز الشجرة البيضاء أثناء الـ traversal.
4. **كل الخوارزميات مكتوبة من الصفر** في `src/lib/tree.ts` — ما استخدمت أي مكتبة جاهزة للـ trees. كنت بدي أتعلّم كيف تُكتب فعلياً، مش بس كيف تُستعمل.
5. **Backend FastAPI مُضمَّن كـ ZIP**: عملت واجهة زر تحميل واحد يطلع ZIP فيه كل ملفات الباك-إند، بدون ما أوقف الموقع كله على سيرفر شغال.

---

## 3. الخوارزميات المُنفَّذة

كل الخوارزميات موجودة في ملف `src/lib/tree.ts` إلا ما ذُكر خلاف ذلك.

### 3.1 BST Insertion

- **الملف / الدالة**: `src/lib/tree.ts` → `bstInsert(root, val)` و `buildBST(values)`
- **شو بتعمل**: تبني شجرة بحث ثنائية بإدخال قيم واحدة واحدة. القيمة الأصغر تذهب يساراً، الأكبر يميناً.
- **Input**: `[10, 5, 15, 3, 7]`
- **Output** (مرسومة):

```
        10
       /  \
      5    15
     / \
    3   7
```

```ts
function bstInsert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) return { id: genId(), value: String(val), left: null, right: null };
  if (val < Number(root.value)) root.left = bstInsert(root.left, val);
  else if (val > Number(root.value)) root.right = bstInsert(root.right, val);
  return root;
}
```

### 3.2 Binary Tree Level-by-Level Build

- **الدالة**: `buildBT(values)`
- **شو بتعمل**: تحط القيم level-by-level (BFS) بالترتيب: العنصر `i` ولده الأيسر `2i+1` والأيمن `2i+2`. هاي بتبني شجرة **مش بالضرورة BST** — ترتيب إدخال عادي.
- **Input**: `[A, B, C, D, E]`
- **Output**:

```
      A
     / \
    B   C
   / \
  D   E
```

### 3.3 Tree Traversals (Preorder / Inorder / Postorder)

- **الدالة**: `traverse(root, type)` — ترجع array من خطوات مع `nodeId` و `value` و `index`، وهاد الـ array هو اللي بستعمله لاحقاً في الـ animation.
- **Preorder**: Root → Left → Right  
- **Inorder**: Left → Root → Right  
- **Postorder**: Left → Right → Root

مثال على شجرة BST للقيم `[10, 5, 15, 3, 7]`:

| Traversal | Output |
|---|---|
| Preorder | `10 → 5 → 3 → 7 → 15` |
| Inorder | `3 → 5 → 7 → 10 → 15` |
| Postorder | `3 → 7 → 5 → 15 → 10` |

```ts
if (type === "preorder") {
  steps.push({ index: steps.length, value: n.value, nodeId: n.id });
  visit(n.left);
  visit(n.right);
} else if (type === "inorder") {
  visit(n.left);
  steps.push(...);
  visit(n.right);
} else {
  visit(n.left);
  visit(n.right);
  steps.push(...);
}
```

### 3.4 m-ary Tree → Binary Tree (Left-Child Right-Sibling)

- **الدالة**: `maryToBT(root)`
- **شو بتعمل**: هاي كانت من أحلى الخوارزميات بالمادة. كل عقدة بشجرة m-ary بتتحول لـ binary node حيث:
  - الـ **Left** = أول ابن (first child).
  - الـ **Right** = الأخ اللي بعده (next sibling).
- **Input**: شجرة m-ary (الجذر A له 3 أبناء: B, C, D — والـ B له E, F).
- **Output**: binary tree حيث `A.left = B`, و `B.right = C`, و `C.right = D`, و `B.left = E`, و `E.right = F`.

```ts
if (mnode.children.length > 0) {
  btnode.left = convert(mnode.children[0]);    // first child = left
  let cur = btnode.left;
  for (let i = 1; i < mnode.children.length; i++) {
    if (cur) { cur.right = convert(mnode.children[i]); cur = cur.right; }
  }
}
```

### 3.5 Binary Tree → BST (by sorting inorder)

- **الدالة**: `btToBST(bt)`
- **شو بتعمل**:
  1. تاخد الـ **inorder** للـ BT.
  2. تعملها Sort (رقمي إذا كل القيم أرقام، وإلا lexicographic).
  3. تبني BST جديدة من القيم المرتّبة.
- **Input inorder**: `[E, B, F, A, C, G, D]`
- **Sorted**: `[A, B, C, D, E, F, G]`
- **Output**: BST متوازنة نسبياً من القيم المرتّبة.

### 3.6 Expression Tree — Shunting-Yard Parser

- **الدوال**: `tokenize(expr)` → `buildExpressionTree(expr)` → `evaluateTree(root)` و `prefixOf` / `postfixOf` / `infixOf`.
- **الخطوات**:
  1. **Tokenize**: تحوّل الـ string لـ tokens (`num`, `sym`, `op`, `lparen`, `rparen`).
  2. **Shunting-Yard**: تحوّل الـ infix لـ postfix مع مراعاة الـ precedence (`+ -` = 1، `* /` = 2، `^` = 3 right-associative).
  3. **Build Tree** من الـ postfix باستخدام stack: لما نلاقي operator، بناخد آخر اثنين من الـ stack ونعملهم left/right.
  4. **Evaluate**: recursive evaluation فقط للمعادلات الرقمية.

- **Input**: `((2+4)*(8-3))/5`
- **Output**:
  - Inorder: `((2+4)*(8-3))/5`
  - Prefix: `/ * + 2 4 - 8 3 5`
  - Postfix: `2 4 + 8 3 - * 5 /`
  - Value: **6**

```ts
// من الـ Shunting-Yard:
while (opStack.length > 0) {
  const top = opStack[opStack.length - 1];
  if (top.type === "op" &&
      (precedence(top.value) > precedence(t.value) ||
       (precedence(top.value) === precedence(t.value) && !isRightAssoc(t.value)))) {
    output.push(opStack.pop()!);
    continue;
  }
  break;
}
opStack.push(t);
```

### 3.7 Symbolic Expression Parser

نفس `buildExpressionTree` بتشتغل بدون تعديل مع متغيّرات زي `a, b, c` — لأن الـ tokenizer عندي يدعم النوع `sym` (symbol) وليس فقط `num`. الفرق إني في الـ evaluator بـ throw خطأ لمّا تكون في symbols، لأنه ما عندي قيم لها.

- **Input**: `(a+b)*(c-d)`
- **Output**: 
  - Prefix: `* + a b - c d`
  - Postfix: `a b + c d - *`

### 3.8 Tree Layout (الخوارزمية الخاصة بالرسم)

- **الملف**: `src/lib/layout.ts`
- **الدالتين**: `layoutBinaryTree(root)` و `layoutMaryTree(root)`
- **الفكرة** (بسيطة وفعّالة):
  - للـ **Binary**: استخدمت **inorder x-indexing**. يعني بعمل inorder traversal ومع كل عقدة بوضعها على عمود `x` متزايد. هيك بضمن إنه لا يوجد تقاطع بين العقد الأخوات (siblings).
  - للـ **m-ary**: كل ورقة (leaf) تاخد `x` متسلسل، وكل أب يُوضع في **منتصف أبنائه** (`min(child.x) + max(child.x)) / 2`).
- **النتيجة**: شجرة مرسومة بدون تقاطعات، مع padding مناسب.

```ts
const assign = (n: TreeNode | null, depth: number) => {
  if (!n) return;
  assign(n.left, depth + 1);
  const px = x * NODE_SPACING + 40;   // inorder-style x
  const py = depth * LEVEL_HEIGHT + 40;
  positions.set(n.id, { x: px, y: py });
  x += 1;
  assign(n.right, depth + 1);
};
```

---

## 4. هيكل المشروع (File Structure)

```
app/frontend/
├── src/
│   ├── lib/
│   │   ├── tree.ts              ← كل الخوارزميات (BST, Traversals, m-ary, Expression)
│   │   ├── layout.ts            ← حساب إحداثيات الرسم
│   │   └── backendFiles.ts      ← نصوص ملفات الباك-إند كـ strings (للـ ZIP)
│   ├── components/
│   │   ├── TreeCanvas.tsx       ← مكوّن SVG الرسام (يدعم click على العقد)
│   │   └── DownloadBackend.tsx  ← زر تحميل الباك-إند كـ ZIP (بدون مكتبة، ZIP مكتوب بنفسي)
│   ├── modules/
│   │   ├── TreeBuilder.tsx
│   │   ├── MAryConverter.tsx
│   │   ├── TraversalVisualizer.tsx
│   │   ├── NumericExpressionTree.tsx
│   │   └── SymbolicExpressionTree.tsx
│   ├── pages/
│   │   └── Index.tsx            ← الصفحة الرئيسية (Header + Tabs + Footer)
│   └── index.css                ← ثيم الزجاج الأسود (glass / blur)
├── PROJECT_REPORT.md            ← هاد الملف
└── package.json
```

| الملف | الدور |
|---|---|
| `tree.ts` | عقل المشروع — كل الخوارزميات (BST, BT, Traversals, m-ary conversion, Expression tree + evaluator) |
| `layout.ts` | تحسب لكل عقدة إحداثيات `(x, y)` عشان الـ SVG |
| `TreeCanvas.tsx` | يرسم الشجرة بـ SVG، فيه highlight للعقدة أثناء الـ traversal + click handler للـ manual editing |
| `TreeBuilder.tsx` | Tab 1 — build شجرة BT/BST من قائمة أو بالرسم اليدوي |
| `MAryConverter.tsx` | Tab 2 — رسم m-ary يدوياً (أو JSON) + تحويل لـ BT → BST + عرض الـ inorder قبل وبعد |
| `TraversalVisualizer.tsx` | Tab 3 — تحريك الـ traversals بـ 600ms بين كل خطوة |
| `NumericExpressionTree.tsx` | Tab 4 — parsing + evaluation لتعابير رقمية |
| `SymbolicExpressionTree.tsx` | Tab 5 — نفس الشي بس بمتغيّرات |
| `DownloadBackend.tsx` | زر يبني ZIP في المتصفح وينزّل الباك-إند FastAPI |
| `index.css` | ثيم Glass الأسود + animations |

---

## 5. شرح الوحدات الخمس (Modules)

### Tab 1 — Tree Builder

**شو بتعمل**: تبني شجرة BT أو BST بأي من طريقتين:
- **Auto**: تكتب قيم مفصولة بفواصل (مثل `10,5,15,3,7`) وتختار BT أو BST.
- **Manual**: تبدأ بجذر، ثم تضغط على أي عقدة لتصير `selected`، وبعدها تقدر تضيف `Left` أو `Right` أو تعدّل القيمة (Rename) أو تحذف الشجرة الفرعية.

**كيف اشتغلت عليها**: صعب جزء كان الـ immutable updates بالـ React state — كان لازم أعمل `cloneTree` قبل التعديل، لأن React ما بتعمل re-render إذا الـ reference بقي نفسه. بنيت دالة recursive اسمها `findAndAct` بتدور على العقدة بالـ id وتطبّق عليها action.

### Tab 2 — m-ary → BT → BST

**شو بتعمل**: يا إما:
- **Draw**: ترسم m-ary tree يدوياً. تبدأ بجذر، وكل عقدة تضغط عليها وتضيفلها أبناء (بأي عدد).
- **JSON**: تلصق JSON للشجرة.

ثم تضغط `Run Conversion`:
1. يحوّل الـ m-ary لـ BT باستخدام LCRS.
2. ياخد inorder للـ BT.
3. يرتّبه ويبني BST جديدة.
4. يعرض **الأشجار الثلاث جنب بعض** + الـ inorder قبل وبعد.

في step indicator في الأعلى (Design → Convert → Sort) يمشي مع التقدّم.

**كيف اشتغلت عليها**: أصعب جزء كان الـ `assignIds` — لمّا المستخدم يلصق JSON ما بيكون فيه `id` لكل عقدة، فكان لازم أدور recursively وأعطي كل عقدة id فريد قبل ما تنحط في state.

### Tab 3 — Traversal Visualizer

**شو بتعمل**: تاخد الشجرة اللي بنيتها في Tab 1، وتضغط Preorder / Inorder / Postorder — العقد تضيء بالأبيض واحدة واحدة بفاصل 600ms، مع عرض الـ sequence تحت.

**كيف اشتغلت عليها**: استخدمت `setTimeout` مع `useRef` لحفظ الـ timeouts عشان أقدر ألغيها عند الـ Reset أو عند الـ unmount — هاد منع الـ memory leaks.

```ts
steps.forEach((step, i) => {
  const t = window.setTimeout(() => {
    setCurrentId(step.nodeId);
    setVisited(prev => [...prev, step]);
  }, i * 600);
  timeoutsRef.current.push(t);
});
```

### Tab 4 — Numeric Expression Tree

**شو بتعمل**: تدخل معادلة زي `((2+4)*(8-3))/5`، المشروع بياخدها ويعطيك:
- شجرة التعبير مرسومة (Operators بتمييز أغمق، Operands أفتح).
- Inorder, Prefix, Postfix.
- القيمة الفعلية (Evaluation) = **6**.

**كيف اشتغلت عليها**: الـ parser اشتغلت عليه من الصفر. أول ما كتبت `tokenize` بسيطة، بعدين نفّذت Shunting-Yard algorithm مع precedence و associativity. الأصعب كان case الـ `^` (exponent) لأنه right-associative عكس باقي المشغّلات.

### Tab 5 — Symbolic Expression Tree

**شو بتعمل**: نفس Tab 4 بس بتعابير رمزية زي `(a+b)*(c-d)`. نفس الـ parser بيشتغل، بس ما فيه evaluation (لأن ما في قيم للمتغيّرات).

**كيف اشتغلت عليها**: ما احتجت أكتب parser جديد — فقط غيّرت الـ UI لإخفاء خلية الـ Value، وخليت نفس الدوال من `tree.ts` تتعامل مع الحالتين. هاد أظهر قوة الـ abstraction اللي بنيتها من البداية.

---

## 6. أصعب جزء في المشروع

بصراحة أصعب تحدّيين كانوا:

### 🔥 التحدي الأول: Shunting-Yard مع الـ right-associative operator

الـ `^` كان مشكلة. أول ما جرّبت `2^3^2`، كانت النتيجة تطلع `(2^3)^2 = 64` بدل `2^(3^2) = 512`. اكتشفت إنه لازم أعدّل الشرط داخل الـ while loop:

> "إذا الـ operator الجديد نفسه الأولوية بس **right-associative**، ما ننزّل اللي فوق."

```ts
if (precedence(top.value) > precedence(t.value) ||
    (precedence(top.value) === precedence(t.value) && !isRightAssoc(t.value))) {
  output.push(opStack.pop()!);
}
```

الشرط `!isRightAssoc(t.value)` هو اللي حل المشكلة — بدونه الـ `^` يتعامل كأنه left-associative.

### 🔥 التحدي الثاني: Tree Layout بدون تقاطعات

أول محاولة كانت بسيطة: لكل عقدة `x = level_index`. النتيجة كانت كارثة، العقد كانت تتقاطع وتنحط فوق بعض. قرأت عن **Reingold–Tilford**، لكنه معقّد. في النهاية اكتشفت إنه لو عملت **inorder assignment** للـ x coordinate، كل عقدة تاخد `x` حسب ترتيب ظهورها في الـ inorder — هاد تلقائياً بيمنع التقاطع في الأشجار الثنائية:

```ts
const assign = (n, depth) => {
  if (!n) return;
  assign(n.left, depth + 1);       // أول شي نزور اليسار
  positions.set(n.id, {x: counter++, y: depth});
  assign(n.right, depth + 1);      // بعدين اليمين
};
```

بسيط لكن فعّال — لا تقاطعات، الشجرة تبان طبيعية، والكود ما تعدى 20 سطر.

### تحدي صغير: Manual Tree Editing مع Immutable State

في React، لما بدي أعدّل عقدة في شجرة محفوظة في state، ما أقدر أغيّرها في مكانها لأن React بيقارن بالـ reference. اضطررت أعمل `cloneTree` deep clone قبل أي تعديل. تعلّمت من هاد إنه دائماً في الـ React، الـ state يجب أن يُعامل كـ immutable.

---

## 7. كيف تشغّل المشروع

### المتطلبات
- Node.js ≥ 18
- npm أو pnpm

### خطوات التشغيل

```bash
# 1. الدخول لمجلد الواجهة
cd app/frontend

# 2. تثبيت المكتبات
npm install
# أو
pnpm install

# 3. تشغيل وضع التطوير
npm run dev
# أو
pnpm run dev

# 4. افتح المتصفح على
http://localhost:5173
```

### بناء نسخة Production

```bash
npm run build
npm run preview
```

### تحميل الباك-إند FastAPI

من داخل الموقع، اضغط زر **"Download Backend (ZIP)"** في الهيدر. ملف ZIP سيتنزّل فيه كل ملفات الـ FastAPI. بعدها:

```bash
unzip tree-algorithms-lab-backend.zip
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## الخاتمة

المشروع علّمني كتير: كيف أطبّق الخوارزميات فعلياً (مش بس نظرياً)، كيف أحل مشاكل الـ parsing، كيف أرسم بيانات هرمية بدون تقاطع، وكيف أبني واجهة تفاعلية تخلّي الخوارزميات "تتحرّك" قدّام المستخدم.

كل الكود مكتوب من الصفر، ما فيه مكتبة جاهزة للـ trees أو للـ expression parsing أو حتى للـ ZIP building.

شكراً للأستاذ على المادة 🌳  
**Abdulmoin Hablas**  
_Algorithms 3_