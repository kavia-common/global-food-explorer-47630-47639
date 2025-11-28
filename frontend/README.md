# Food Explore Frontend

A React-based web interface for browsing, searching, and discovering foods, cuisines, and dishes. Built with minimal dependencies, modern Ocean Professional theme, and accessible UI.

## Quick Start

- Node.js 18+
- Install dependencies:
  npm install
- Run dev server:
  npm start
- Run tests:
  npm test
- Build:
  npm run build

The app runs at http://localhost:3000

## Environment Variables

Copy .env.example to .env and adjust:

- REACT_APP_API_BASE: Preferred API base URL (highest priority)
- REACT_APP_BACKEND_URL: Fallback API base URL
- REACT_APP_WS_URL: Optional WebSocket URL placeholder
- REACT_APP_LOG_LEVEL: silent | error | warn | info | debug
- REACT_APP_FEATURE_FLAGS: JSON or CSV, e.g. {"trends_panel":true} or trends_panel
- REACT_APP_EXPERIMENTS_ENABLED: JSON array or CSV of experiments
- REACT_APP_ENABLE_SOURCE_MAPS: true/false
- REACT_APP_HEALTHCHECK_PATH: optional path to health endpoint

## Architecture

- Routing: react-router-dom, centralized at src/router/Routes.jsx
- Layout: NavBar (brand, links, SearchBar, theme toggle), Footer (optional healthcheck)
- Theme: CSS variables at src/styles/theme.css (Ocean Professional palette)
- Components: SearchBar (debounced), Card (image/title/tags)
- Pages: Home, Browse, SearchResults, CuisineDetail, DishDetail
- State: Redux Toolkit (uiSlice, foodsSlice) at src/state
- Services: API client wrapper at src/services/apiClient.js with endpoints at src/services/endpoints.js
- Feature Flags: src/hooks/useFeatureFlag.js

## API Client

Base URL resolution order:
REACT_APP_API_BASE || REACT_APP_BACKEND_URL || '/api'

Implements:
- getCuisines(params)
- getDishes(params)
- searchAll(q)
- getCuisineById(id)
- getDishById(id)

## Testing

- Framework: Jest + React Testing Library
- Tests cover routing, SearchBar debounce/submit, Browse filters/pagination, and apiClient success/error paths.

```bash
npm test
```

## Styling

Ocean Professional theme:
- primary #2563EB, secondary #F59E0B, background #f9fafb, surface #ffffff, text #111827
- Rounded corners, subtle gradients, accessible focus rings, smooth transitions.
