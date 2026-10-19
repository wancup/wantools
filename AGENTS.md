# AGENTS.md

## Project Overview

**wanTooLs** is a collection of utility tools for web application developers.
It provides interactive tools for common development tasks.

## Tech Stack

### Core Framework

- **SolidJS** - Reactive UI framework
- **TanStack Start** - Full-stack web framework for Solid

### UI Libraries

- **Hebium UI** - Component library (`@hebium-ui/solid` and `@hebium-ui/core`)
- **Panda CSS** - CSS-in-JS styling solution
- **Lucide Solid** - Icon library

### Development Tools

- **Vite** - Build tool and dev server
- **TypeScript** - Type checking
- **pnpm** - Package manager

### Utility Libraries

- **ts-pattern** - Pattern matching

## Project Structure

```text
wantools/
├── src/
│   ├── routes/             # File-based routing (TanStack Start)
│   ├── features/           # Feature-based modules
│   ├── components/         # Shared components
│   ├── config/             # Configuration files
│   ├── types/              # TypeScript types
│   ├── styles/             # Global styles
│   ├── assets/             # Static assets
│   ├── router.tsx          # Router configuration
│   └── routeTree.gen.ts    # Auto-generated route tree
├── styled-system/          # Panda CSS output (generated)
├── public/                 # Static files
├── panda.config.ts         # Panda CSS configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration (flat config)
├── dprint.json             # Dprint configuration
└── vitest.config.ts        # Vitest configuration
```

## Development Scripts

- `pnpm run build` - Build for production
- `pnpm run typecheck` - Run TypeScript type checking
- `pnpm run lint:check` - Check linting errors
- `pnpm run lint:fix` - Fix linting errors
- `pnpm run format:check` - Check formatting
- `pnpm run format:fix` - Fix formatting
- `pnpm run test` - Run tests with Vitest

## Coding Conventions

### TypeScript

- **Strict mode enabled**: Full type safety
- **Explicit return types**: Required for functions (can be inferred for expressions)
- **Consistent imports**: Use inline type imports (`import { type Foo }` not separate `import type`)
- **No unchecked indexed access**: Array/object access is type-safe
- **No implicit override**: Must use `override` keyword

### Naming Rule

- **TypeScript**: kebab-case (e.g., `app-shell.tsx`)
- **Tests**: `*.test.ts` suffix
- **Private route components**: Prefix with `-` (e.g., `-qr-code-generator.tsx`)

### Import Aliases

```typescript
import { css } from "$panda/css"; // styled-system/
import { Button } from "@hebium-ui/solid"; // Component library
import { Component } from "~/components"; // src/
```

## Important Files

### Configuration Files

- **`src/config/pages.ts`**: Defines all pages and their metadata
- **`src/config/site.ts`**: Site-wide constants (name, description)
- **`src/routes/__root.tsx`**: Root layout with theme initialization

### Feature Examples

- **`src/features/directory-tree/logic/directory-tree.ts`**: Complex logic with tests
- **`src/features/color-theme/`**: Theme switching with localStorage
- **`src/features/app-shell/`**: App layout structure

## Testing

- **Framework**: Vitest
- **Pattern**: Test files colocated with source (e.g., `directory-tree.test.ts`)

## Notes for AI Agents

1. **SolidJS is NOT React**: Use Solid-specific patterns (signals, createSignal, createEffect)
2. **File-based routing**: New pages require files in `src/routes/`
3. **Style with Panda**: Use Panda CSS utilities for app layouts and custom styles; use Hebium UI's built-in component styles
4. **Type safety**: Always provide explicit types, especially for function returns
5. **Accessibility first**: Follow jsx-a11y rules and use semantic HTML
6. **Feature organization**: Complex features belong in `src/features/` with logic/ui/types subdirectories
7. **Testing**: Add tests for complex logic (see `directory-tree.test.ts` for examples)
8. **Theme support**: Use `data-hui-color-scheme="light"` or `"dark"` on the HTML element; omit the attribute to follow the system preference. Persist the choice under `color-theme` in localStorage
9. **Path aliases**: Use `~/` and `$panda/` for imports; import UI components directly from `@hebium-ui/solid`

## Common Tasks

### Adding a New Tool Page

1. Create route file in `src/routes/[tool-name]/index.tsx`
2. Add page config to `src/config/pages.ts`
3. Implement UI components (can use `-` prefix for sub-components)
4. Add feature logic in `src/features/[tool-name]/` if complex
5. Update README.md features list

### Adding a Common Component

1. Create component in `src/components/[component-name]/`
2. Export from `index.ts`
