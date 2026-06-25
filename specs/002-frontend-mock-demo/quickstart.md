# Quickstart: Frontend Mock Demo

**Date**: 2026-06-23
**Feature**: Frontend Mock Demo (specs/002-frontend-mock-demo)

## Prerequisites

- Node.js 20+
- npm 9+
- No backend required (fully offline)

## Setup

```bash
# Enter web directory
cd web

# Install dependencies (includes shadcn-vue, Tailwind, radix-vue)
npm install

# Initialize shadcn-vue (if not already configured)
npx shadcn-vue@latest init
# → Select: TypeScript: yes, Framework: Vite, Style: Default, CSS variables: yes, CSS file: src/style.css, Alias: @

# Add required shadcn components
npx shadcn-vue@latest add button card input badge table progress dialog sheet separator skeleton tabs

# Start dev server
npm run dev
# → Opens at http://localhost:5173
```

## Quick Validation

### 1. Home → Scan Flow

1. Open `http://localhost:5173`
2. Type any URL (e.g., `https://exemplo.gov.br`) and click "Analisar"
3. Verify: Progress screen appears with animated bar
4. Wait ~4 seconds
5. Verify: Automatically redirects to full report
6. Check: Score gauge shows 65.5, risk badge shows "Risco Medio"

### 2. Report Data Completeness

1. On the report page, verify all sections render:
   - Score gauge (circular, animated)
   - Risk badge
   - 7 category summary bars
   - Findings cards with status badges (found/partial/absent)
   - Recommendations with priority labels
   - Cookie table (6-8 rows)
   - Form cards (2 forms with field lists)
   - Legal disclaimer at top and bottom

### 3. Glossary

1. Navigate to Glossário via header
2. Verify: 15 terms listed alphabetically
3. Type "consentimento" in search
4. Verify: Results filter with ~300ms simulated delay + fade-in animation
5. Clear search → all terms reappear

### 4. History

1. Navigate to Histórico via header
2. Verify: Table with 10 rows of mock scans
3. Check: Different scores, risk levels, dates
4. Click "Ver relatório" on a completed scan → opens report

### 5. Theme Toggle

1. Click theme toggle button in header (sun/moon icon)
2. Verify: Interface transitions to dark theme in ~300ms
3. Reload page (Ctrl+R / Cmd+R)
4. Verify: Dark theme persists
5. Toggle back to light → persists on reload

### 6. Responsive Layout

1. Open DevTools responsive mode
2. Test at 375px width:
   - Header stacks vertically
   - Cards full-width
   - Table scrolls horizontally
3. Test at 1920px:
   - Max-width container (960px) centered
   - Multi-column info cards on home

### 7. Animations

1. Navigate between pages → fade transition between views
2. Reload report page → finding cards appear with staggered fade-in-up
3. Hover over cards and table rows → smooth background transition
4. Progress bar during scan → smooth width animation with easing

## Expected Outcomes

| Test Case | Expected Behavior |
|-----------|-------------------|
| Submit URL on home | Progress screen, auto-redirect to report in ~4s |
| Report page loads | All 7 categories, 33 findings, cookies, forms visible |
| Glossary search "lgpd" | 1 result after ~300ms with fade-in |
| History page loads | 10 scan rows with varied data |
| Theme toggle click | Smooth dark/light transition |
| Page reload after theme change | Theme preference preserved |
| Resize to mobile (375px) | Layout functional, no horizontal scroll on cards |
| Tab through interface | Focus ring visible on all interactive elements |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tailwind classes not working | Ensure `tailwind.config.ts` has `content: ["./src/**/*.{vue,ts}"]` |
| shadcn components not styled | Verify `src/style.css` has `@tailwind base/components/utilities` and CSS variables |
| Theme not persisting | Check browser console for localStorage errors (private mode fallback works silently) |
| Build errors about missing shadcn components | Run `npx shadcn-vue@latest add <component>` for each missing one |
