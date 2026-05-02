# AVL Tree Module - Development Plan

## Files to Create/Modify
1. `src/lib/avl.ts` — AVL tree algorithms (height, balance factor, rotations, insert, delete)
2. `src/modules/AVLTree.tsx` — AVL Tree interactive module (Tab 07)
3. `src/pages/Index.tsx` — Add Tab 07 (avl) to TAB_KEYS and import AVLTree module
4. `src/data/lectures.ts` — Add Lecture 9 about AVL Trees (Arabic + English)
5. `src/lib/i18n.ts` — Add i18n translations for AVL tab and related texts
6. `src/components/FeatureCards.tsx` — Add AVL feature card

## Development Tasks
- [x] Create `src/lib/avl.ts` with AVL algorithms (AVLNode interface, height, balanceFactor, rotateLeft, rotateRight, rotateLeftRight, rotateRightLeft, avlInsert, avlDelete, avlSearch, inorderAVL)
- [x] Create `src/modules/AVLTree.tsx` with interactive UI (insert values, delete, show BF, visualize rotations, same glass theme)
- [x] Update `src/pages/Index.tsx` to add Tab 07 "avl" with Scale icon, import AVLTree component
- [x] Update `src/data/lectures.ts` to add Lecture 9 about AVL Trees (bilingual)
- [x] Update `src/lib/i18n.ts` to add "avl" tab translations and AVL-related strings
- [x] Update `src/components/FeatureCards.tsx` to add AVL feature card