# AVL Fixer Feature - Development Tasks

## Design
- Theme: Same dark glass style as existing AVL tab
- Animation: CSS transitions on node positions + highlight colors for imbalanced nodes
- Controls: Play (auto-step), Next Step, Reset buttons
- Layout: Mode toggle (Builder / Fixer) at top of AVL tab

## Development Tasks
- [ ] Add `bstInsert` (plain BST insert without balancing) and `avlFixStep` (find first imbalanced node bottom-up, apply one rotation, return new root + step info) to `src/lib/avl.ts`
- [ ] Create `src/modules/AVLFixer.tsx` component with: input field, Build Unbalanced BST button, animated step-by-step fix with Play/Next/Reset controls, rotation info display
- [ ] Update `src/modules/AVLTree.tsx` to add a mode toggle (Builder | Fixer) switching between existing content and new AVLFixer
- [ ] Update `src/lib/i18n.ts` with translations for fixer UI strings (en + ar)
- [ ] Run lint and build checks