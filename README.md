# ContentHub React (JavaScript)

A React dashboard that provides a personalized feed with drag-and-drop, infinite scrolling, debounced search, favorites, trending, dark mode, Redux Toolkit + Persist, Tailwind, and Framer Motion.

## Features
- Drag-and-drop card reordering (React DnD)
- Infinite scrolling (react-infinite-scroll-component)
- Debounced search (custom hook)
- Favorites & Trending sections
- Dark mode toggle
- Smooth animations (Framer Motion)
- Global state via Redux Toolkit
- Persistence via redux-persist
- Tailwind CSS styling

## Getting Started

```bash
# 1) Extract the ZIP
# 2) Install dependencies
npm install

# 3) (Optional) Add News API key for real articles
#    Create a .env file at the project root:
#    REACT_APP_NEWS_API_KEY=your_key_here
#
#    Without a key, the app will load mock content.

# 4) Start the dev server
npm start
```

Open http://localhost:3000 in your browser.

## Tech Stack
- React 18, JavaScript
- Redux Toolkit, redux-persist
- Tailwind CSS, @tailwindcss/forms
- React DnD, Framer Motion
- Axios
- CRA (react-scripts)
