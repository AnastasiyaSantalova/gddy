# Godaddy Repositories Viewer

A simple React application built for a test assignment.  
It fetches repositories from [GoDaddy’s GitHub](https://github.com/godaddy) public API and displays:
- A list of repositories with title and description.
- A details page for each repository with main info: description, language, forks, open issues, watchers, and link to GitHub.

---

## **Stack**

- **Vite + React + TypeScript** — modern and fast dev setup.
- **react-router-dom** — for client-side routing.
- **Vitest + Testing Library** — for unit and integration tests.
- **CSS Modules** — for scoped styling with global design tokens (colors, fonts).
- **ESLint (Flat config)** — for code quality.

---

## **How to run**

1. **Install dependencies:**

   ```bash
   npm install

2. **Start development server:**

    ```bash
    npm run dev

The app will be available at http://localhost:5173

3. **Run tests:**

    ```bash
    npm run test

---

## **Features**

- Fetches data from the GitHub REST API.
- Displays all GoDaddy repos in a clean list.
- Click a repo to see its details on a separate page.
- Handles loading and error states gracefully.
- Uses Layout with header, logo link, and footer.
- The logo links back to home — and is disabled on the homepage for UX.
- Includes a go back link on the details page (using useNavigate).
- Uses semantic HTML (<main>, <header>, <footer>).
- UI colors and fonts are stored as CSS variables for easy theming.
- Includes tests for:
    - API services (fetchRepos, fetchRepoDetails)
    - Components (RepoList, RepoDetails)
    - Routes (AppRoutes) to ensure correct rendering.

---

## **Styling**
- Basic styling with CSS Modules.
- Shared colors, fonts, and spacing are stored as CSS custom properties in :root.
- Global typography uses the Inter font (from Google Fonts) for a clean, modern look.
- Container width and responsive spacing to keep UI readable.

---

## **Why Vite?**
I chose Vite instead of Create React App because it starts faster, is simpler to configure, and is more up-to-date for modern React projects.
For a small test project, this speeds up development and improves the developer experience.

---

## **Potential Improvements**
Given more time, I would:

- Add pagination or infinite scroll for large orgs.
- Cache API responses to reduce requests.
- Add more UI/UX polish and responsive design.
- Improve responsive design for mobile.
- Show multiple languages per repo if available.
- Use environment variables for base API URL.

---

## **Project structure**

    /src
    ├── /components
    │   ├── /RepoList
    │   │   ├── RepoList.tsx
    │   │   ├── RepoList.module.css
    │   │   ├── RepoList.test.tsx
    │   ├── /RepoDetails
    │   │   ├── RepoDetails.tsx
    │   │   ├── RepoDetails.module.css
    │   │   ├── RepoDetails.test.tsx
    ├── /routes
    │   ├── AppRoutes.tsx
    │   ├── AppRoutes.test.tsx
    ├── /services
    │   ├── api.ts
    │   ├── api.test.ts
    ├── /constants
    │   ├── strings.ts
    ├── Layout.tsx
    ├── Layout.module.css
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── setupTests.ts
    ├── vite-env.d.ts

---

## **Thank you!**