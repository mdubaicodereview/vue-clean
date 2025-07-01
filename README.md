# Vue Clean Todo App

A clean, well-structured Vue 3 Todo application built with best practices. This application demonstrates proper component structure, state management with Pinia, and responsive design for both mobile and desktop.

## Features

- ✅ Vue 3 with Composition API
- 🗄️ State management with Pinia
- 🧩 Reusable components with proper prop validation
- 🌓 Light and dark mode support
- 📱 Responsive design for mobile and desktop
- 💾 Local storage persistence
- 🔍 Filter and sort todos
- 📊 Todo statistics and summary

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── stores/         # Pinia stores
├── views/          # Page components
├── composables/    # Reusable composition functions
├── App.vue         # Root component
└── main.js         # Application entry point
```

## Components

- **TodoItem**: Individual todo item with toggle, edit, and delete functionality
- **TodoForm**: Form for adding new todos with priority and due date
- **TodoFilters**: Filter and sort controls
- **TodoStats**: Display statistics about todos
- **TodoSummary**: Additional information about high priority and due tasks
- **TodoEditModal**: Modal for editing existing todos
- **ThemeToggle**: Toggle between light and dark mode

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
