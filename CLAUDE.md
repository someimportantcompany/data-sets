# Project: @data-sets/repo

## Overview
A monorepo of static, curated data-sets for Node.js. Each package ships a JSON data file, ESM lookup functions, and TypeScript type declarations. Currently includes countries (ISO 3166), currencies (ISO 4217), and Pokémon (Gen 1).

## Stack
- **Runtime:** Node.js >= 18, ESM (`"type": "module"`)
- **Package manager:** pnpm (workspaces via `pnpm-workspace.yaml`)
- **Source:** Plain JavaScript (ESM) with JSDoc type annotations — no TypeScript compilation step
- **Types:** Hand-written `.d.ts` declaration files alongside each `index.js`
- **Test framework:** Vitest 4.x (TypeScript test files, `.test.ts`)
- **Linter:** ESLint 8.x with `airbnb-base`

## Key Commands
- **Install:** `pnpm install`
- **Lint:** `pnpm lint` (eslint)
- **Test (unit only):** `pnpm test:unit` (vitest, `packages/*/index.test.ts`)
- **Test (integration only):** `pnpm test:integration` (vitest, `integration-tests/**/*.test.ts`)
- **Test:** `pnpm test` (runs unit then integration)

## Architecture

```
packages/
  countries/    → @data-sets/countries   (ISO 3166, ~250 records)
  currencies/   → @data-sets/currencies  (ISO 4217, 154 records)
  pokemon/      → @data-sets/pokemon     (Gen 1, 151 records)
integration-tests/
  countries.test.ts
  currencies.test.ts
```

Each package follows an identical structure:

| File           | Purpose                                       |
|----------------|-----------------------------------------------|
| `data.json`    | Static dataset, sorted by primary key         |
| `index.js`     | ESM entry — loads JSON, builds Map indexes, exports `data` + lookup functions |
| `index.d.ts`   | TypeScript type declarations (record type + function signatures + default export) |
| `index.test.ts`| Unit tests (vitest)                           |
| `package.json` | Publishable package config with dual `exports` (types + default) |

### Lookup pattern
JSON is loaded via `createRequire(import.meta.url)` (for sync JSON import in ESM). Lookup Maps are built eagerly at module load for O(1) access. Filter-style lookups (e.g. `findByContinent`, `findByType`) use `Array.filter`.

### Exports pattern
Every package has both named exports (`data`, `findByX`) and a default export object containing all named exports. Tests verify the default export references the same objects.

### Workspace wiring
Root `devDependencies` includes each workspace package (`"@data-sets/countries": "workspace:*"`) so integration tests can import by package name.

## Conventions

### File & naming
- Packages use kebab-case directory names (`packages/countries/`)
- Source files: `index.js`, `index.d.ts`, `index.test.ts`, `data.json`
- Functions use camelCase (`findByCode`, `findByName`)
- Types use PascalCase (`CountryRecord`, `PokemonType`)

### Code style
- ESM throughout — `import`/`export`, no CommonJS except `createRequire` for JSON loading
- JSDoc `@type` annotations on all module-level variables referencing the `.d.ts` types
- JSDoc `@param`/`@returns` on all exported functions
- Max line length 120 chars, no semicolons enforced (eslint `semi: off`), no quote style enforced (`quotes: off`)
- Array bracket spacing: `[ 'a', 'b' ]` (enforced by eslint)
- `require-jsdoc` enabled for function declarations

### Package.json conventions
- Dual `exports` field with `types` condition first, then `default`
- `"files"` array: `["*.js", "*.d.ts", "*.json", "*.md"]`
- `"engines": { "node": ">= 18.0.0" }`
- Keywords array includes `"static"`, `"data"`, `"sets"` plus domain-specific terms

## Testing Patterns
- **Framework:** Vitest 4.x
- **Test files:** `*.test.ts` (TypeScript, though source is plain JS)
- **Assertion style:** `expect()` with vitest matchers (`toBe`, `toBeDefined`, `toBeUndefined`, `toEqual`, `toBeGreaterThan`, `toContain`, `toSatisfy`, `toHaveProperty`)
- **Record validation:** Uses `toSatisfy<RecordType>` with a boolean predicate to validate all fields in a single assertion
- **Structure:** `describe` blocks per export, `it` blocks per behaviour
- **Two tiers:**
  - Unit tests (`packages/*/index.test.ts`) — import from `./index.js`, thorough per-function coverage
  - Integration tests (`integration-tests/*.test.ts`) — import from `@data-sets/<name>`, one `it` per export to verify the published package interface works
- **Ordering:** `pnpm test` runs unit tests first, then integration tests (sequential via `&&`)

## Gotchas
- **No TS compilation:** Source is `.js` with JSDoc; `.d.ts` files are hand-authored, not generated. Don't add a `tsconfig.json` or build step.
- **JSON import via createRequire:** ESM doesn't support `import data from './data.json'` without import assertions. The codebase uses `createRequire(import.meta.url)` as the standard pattern.
- **Pokemon Fairy type:** The PokeAPI data uses modern type assignments, so some Gen 1 Pokémon have the Fairy type (added in Gen 6). The `PokemonType` union includes `'Fairy'` for this reason.
