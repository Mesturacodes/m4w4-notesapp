# Notes App

A polished Notes app built with React and TypeScript as part of the Shiera Developers M4W4 assignment.

## Features

* **Create notes** — Add a note with a required title and optional body.
* **Edit notes** — Update the title, body, and label of an existing note.
* **Search** — Search notes by title, body, or label.
* **Labels** — Add an optional label to organize notes.
* **Pin notes** — Pin important notes for quick access.
* **Archive notes** — Move notes out of the main view without deleting them.
* **Delete notes** — Permanently remove notes.
* **All / Pinned / Archived views** — Easily switch between different note collections.
* **Recently updated sorting** — Notes are automatically displayed with the most recently updated notes first.
* **Dark / Light mode** — Switch between dark and light themes.
* **Local storage persistence** — Notes and theme preferences remain available after refreshing the browser.
* **Responsive design** — The interface adapts to smaller screens.

## Technologies Used

* React
* TypeScript
* Vite
* CSS
* Context API
* Custom React Hooks
* Browser Local Storage

## React Concepts Used

### Context API

`ThemeContext` manages the application's dark and light theme without passing theme data through multiple components.

### Custom Hooks

* `useLocalStorage` handles persistent data using browser local storage.
* `useNotes` manages note creation, editing, updating, and deletion.

### State Management

React state and hooks are used to manage:

* Notes
* Search
* Current view
* Theme
* Note editing
* Note creation form visibility

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Project Goal

The project demonstrates how React Context API, custom hooks, TypeScript, and local storage can be combined to build a practical notes application with persistent state and a clean user interface.
