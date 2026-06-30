## Plan: Update React 19 Presentation Tier

Update the Octofit Tracker frontend to use React Router navigation and environment-aware backend API URLs. Create the requested component views and document the required Vite env variable in frontend documentation.

**Steps**
1. Create a new frontend `src/components` directory and add the requested page components:
   - `Activities.jsx`
   - `Leaderboard.jsx`
   - `Teams.jsx`
   - `Users.jsx`
   - `Workouts.jsx`
   Each component should fetch from the correct API endpoint and handle both array and paginated responses.
2. Add a shared API helper in the frontend, such as `frontend/src/api.js` or `frontend/src/utils/api.js`, that builds the base URL from `import.meta.env.VITE_CODESPACE_NAME` with a safe fallback to `http://localhost:8000`.
3. Update `frontend/src/App.jsx` to use `react-router-dom` for navigation and routing. Include nav links to each page plus a fallback route.
4. Verify `frontend/src/main.jsx` wraps `App` in `BrowserRouter` and preserves the existing React 19/Vite entrypoint semantics.
5. Document the required `VITE_CODESPACE_NAME` configuration in `octofit-tracker/frontend/README.md`, and optionally add a `.env.local.example` file showing the env key.

**Verification**
1. Run `npm install` in `octofit-tracker/frontend` if needed, then `npm run dev` and confirm the app starts on port `5173`.
2. Open each route (`/activities`, `/leaderboard`, `/teams`, `/users`, `/workouts`) and verify the component loads without URL errors.
3. Confirm network requests target `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/` when `VITE_CODESPACE_NAME` is defined, and fall back to `http://localhost:8000/api/[component]/` when unset.
4. Verify each component can render both direct array responses and wrapped paginated responses by parsing `response.data` when present.
5. Confirm the frontend README clearly states `VITE_CODESPACE_NAME` must be set in `.env.local` or equivalent.

**Decisions**
- Use a router-based layout with nav links for the requested views.
- Build the API base URL once in a shared helper to avoid repeated environment fallback logic.
- Prefer documenting the env var in the frontend README rather than committing a real `.env.local` file.

**Further Considerations**
1. If the user wants, create `.env.local.example` in `octofit-tracker/frontend` showing `VITE_CODESPACE_NAME=your-codespace-name`.
2. If backend port or host changes in the future, the helper can be extended to support `VITE_API_BASE_URL` instead of hardcoding Codespaces URL patterns.