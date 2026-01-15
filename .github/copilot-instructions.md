# Copilot Instructions for Softday Frontend

## Architecture Overview

This is a React single-page application (SPA) built with Vite, focused on mobile-first stress management. Key components include onboarding flows, user authentication, community features, chatbot integration, and statistics tracking.

- **Routing**: Uses React Router with nested routes. Main navigation via `BottomNav` component for tabs: home, community, chatbot, statistics (folder icon), profile.
- **State Management**: Global state in `App.jsx` (userName, signupData, hasCheckedIn). Local/session storage for auth tokens.
- **API Integration**: Centralized in `src/api/axiosConfig.js` with axios interceptors for automatic token refresh on 401 errors.
- **Component Structure**: Each screen is a component in `src/components/`, with dedicated CSS in `src/styles/` subfolders (e.g., `home/home.css`).

## Key Patterns

- **Component Naming**: PascalCase files (e.g., `Home.jsx`), kebab-case CSS classes.
- **API Calls**: Use exported API objects like `boardApi.getPostList()` or `userApi.withdraw()`. All requests include Bearer tokens automatically.
- **Navigation**: Pass `onNavigate` props to components for routing. Use `navigate("/path")` from React Router hooks.
- **Styling**: Custom CSS with Tailwind-inspired colors (e.g., `#FD9800` for orange). Mobile-responsive with fixed bottom nav.
- **Assets**: Images and icons in `src/assets/`, imported directly (e.g., `import logo from "./assets/logo.png"`).

## Developer Workflows

- **Development**: `npm run dev` starts Vite dev server.
- **Build**: `npm run build` creates production bundle in `dist/`.
- **Linting**: `npm run lint` runs ESLint with React hooks and refresh plugins.
- **Preview**: `npm run preview` serves built app locally.

## Conventions

- **Commits/Branches**: Follow Korean Git conventions (e.g., `feat/users: 회원 가입 기능 추가`). Always link PRs to Issues with `closes #issue`.
- **Error Handling**: API errors redirect to `/login` on auth failure. Use try/catch for user-facing errors.
- **File Imports**: Relative paths for styles (`../styles/...`), absolute for components (`./components/...`).
- **Responsive Design**: Assume mobile-first; bottom nav overlays content, so add padding-bottom to scroll areas.

## Examples

- Adding a new route: Update `App.jsx` Routes, wrap in `MainLayout` if main tab.
- API usage: `import { boardApi } from "../api/axiosConfig"; const posts = await boardApi.getPostList();`
- Styling: Add classes to `src/styles/component/component.css`, import in component.</content>
  <parameter name="filePath">c:/softday/softdayFront/.github/copilot-instructions.md
