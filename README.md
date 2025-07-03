# Godaddy Repositories Viewer

This is a small React application built for a test assignment.  
It fetches repositories from [GoDaddy’s GitHub](https://github.com/godaddy) public API and displays:
- A list of repositories with title and description.
- Details for each repository with more info: description, main language, forks, open issues, watchers, and a link to GitHub.

---

## **Stack**

- **Vite + React + TypeScript** — modern and fast setup for React apps.
- **react-router-dom** — for routing between list and details pages.
- **Vitest + Testing Library** — for unit and integration testing.
- **CSS Modules** — for simple and scoped styling.

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
- Shows a list of all repositories in the GoDaddy organization.
- Click on a repo to see its details on a separate page.
- Handles loading and error states.
- Includes unit tests for:
    - API fetch functions
    - Components: list & details (happy paths and error states)

---

## **Styling**
Basic styling is done using CSS Modules.
It includes hover states, spacing, and clear link styles.
No extra frameworks like Tailwind were used to keep it minimal and focused.

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
- Show multiple languages per repo if available.
- Use environment variables for base API URL.

---

## **Project structure**

    ```bash
    /src
    ├── /assets
    │ └── react.svg
    ├── /components
    │ ├── /RepoList
    │ │ ├── RepoList.tsx
    │ │ ├── RepoList.module.css
    │ │ ├── RepoList.test.tsx
    │ ├── /RepoDetails
    │ │ ├── RepoDetails.tsx
    │ │ ├── RepoDetails.module.css
    │ │ ├── RepoDetails.test.tsx
    ├── /services
    │ ├── api.ts
    │ ├── api.test.ts
    ├── App.tsx
    ├── App.css
    ├── main.tsx
    ├── index.css
    ├── setupTests.ts
    ├── vite-env.d.ts

---

## **Thank you!**
Thank you for reviewing this project — I hope it clearly demonstrates my thought process, clean code, and ability to balance simple structure with testability.