# 🎬 Movie Explorer

A modern **movie and TV show discovery app** built with **React + TypeScript + Vite** and powered by **Redux Toolkit**.  
Discover trending movies, upcoming releases, and popular shows — all in a sleek, responsive interface.

---

## ✨ View

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/e993d69a-2a68-4e09-ba23-39dc3e53b23a" />


## 🚀 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React 18, TypeScript, Vite |
| **State Management** | Redux Toolkit, React-Redux |
| **Styling** | Tailwind CSS |
| **Data Source** | TMDB API (The Movie Database) |
| **Build Tools** | Vite + SWC |
| **Linting / Formatting** | ESLint, Prettier |

---

## ✨ Features

- 🎥 Browse **Now Playing**, **Popular**, **Trending**, and **Upcoming** movies  
- 📺 Explore **Popular** and **Trending TV Shows**  
- 🔍 Search movies or TV shows by name  
- 💡 See release years, ratings, and genres  
- 🧩 Fully responsive design (mobile → desktop)  
- ⚡️ Super-fast HMR with Vite  
- 🧠 Global state management with Redux Toolkit  
- 💅 Beautiful UI with TailwindCSS animations and gradients  

---

## 📂 Project Structure



## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
