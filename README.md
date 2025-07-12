Word Counter App — React + TypeScript + Vite

A blazing-fast and modern Word Counter application built using React, TypeScript, and Vite.
It features real-time text analysis, a clean UI, and a lightweight ESLint setup with type-aware rules and fast refresh support using SWC.

Live Demo:
👉 View Project on GitHub Pages

Tech Stack:
• React 18+
• TypeScript
• Vite
• ESLint with type-checked rules
• (Optional) Tailwind CSS for styling

Getting Started

Clone the repository:

bash
Copy
Edit
git clone https://github.com/razazaheer12/WordCounterApp.git
cd WordCounterApp
Install dependencies:

nginx
Copy
Edit
npm install
Run the development server:

arduino
Copy
Edit
npm run dev
The app will be running at:
http://localhost:5173

ESLint Configuration (Type-Aware Setup)

This project uses @typescript-eslint and eslint-plugin-react with full type-checking support.

Your eslint.config.js should look like this:

ts
Copy
Edit
import react from 'eslint-plugin-react'
import { typescriptEslint as tseslint } from '@typescript-eslint/eslint-plugin'

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
Optional improvements:

Use tseslint.configs.recommendedTypeChecked or strictTypeChecked for production apps

Add ...tseslint.configs.stylisticTypeChecked for formatting rules

Folder Structure

pgsql
Copy
Edit
wordcounterapp/
├── public/                 → Static files
├── src/                    → Source code
│   ├── components/         → Reusable components
│   ├── App.tsx             → Root component
│   └── main.tsx            → Entry point
├── tsconfig.json           → TypeScript configuration
├── vite.config.ts          → Vite configuration
├── eslint.config.js        → ESLint rules
└── README.md               → This file
Planned Features / To-do

• Dark mode toggle
• Export text to PDF
• Local storage history
• Responsive mobile support
• Speech-to-text / Text-to-speech

Author

Made with ❤️ by Raza Zaheer
GitHub: razazaheer12

