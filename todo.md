# Tree Algorithms Lab - Todo

## Student
- Abdulmoin Hablas | Algorithms 3

## Design
- Theme: Dark (slate-900 / slate-800)
- Colors: Default #3B82F6, Highlighted #22C55E, Operator #F97316, Operand #14B8A6
- Typography: Inter via Tailwind default
- Layout: Header with app name + student, 5 tabs, card-based layout

## Development Tasks
- [x] Write frontend tree algorithms (TS, runs fully in browser)
- [x] Write SVG TreeCanvas with layout algorithm
- [x] Write TreeBuilder module
- [x] Write TraversalVisualizer module (animated ~600ms)
- [x] Write MAryConverter module
- [x] Write NumericExpressionTree module
- [x] Write SymbolicExpressionTree module
- [x] Add Download Backend ZIP button (native ZIP builder, no deps)
- [x] Embed backend files (FastAPI) as strings for ZIP
- [x] Replace Index.tsx with main app with tabs + header
- [x] Run lint & build
- [x] CheckUI
- [x] v2: Full blur/glass black-gray-white theme
- [x] v2: Manual tree drawing in TreeBuilder (Auto/Manual modes)
- [x] v2: Manual m-ary drawing in MAryConverter (Draw/JSON modes)
- [x] v2: Step indicator flow in m-ary converter
- [x] v2: Professional numbered step tabs with icons

## Files
- src/lib/tree.ts - core tree types + algorithms
- src/lib/layout.ts - tree layout
- src/lib/backendFiles.ts - strings of backend files for ZIP
- src/components/TreeCanvas.tsx - SVG renderer
- src/components/DownloadBackend.tsx - ZIP button
- src/modules/TreeBuilder.tsx
- src/modules/TraversalVisualizer.tsx
- src/modules/MAryConverter.tsx
- src/modules/NumericExpressionTree.tsx
- src/modules/SymbolicExpressionTree.tsx
- src/pages/Index.tsx - main page with tabs