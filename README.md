# Movie Explorer

A React and TypeScript movie browser powered by the OMDb API. Users can search for movies, browse a randomized selection on the Home page, and save movies as favourites in Firebase Realtime Database.

## Features

- Randomized movie selection on the Home page
- Movie search through the header search form
- Movie cards with poster, title, year, type, and favourite state
- Favourite movies stored using Firebase Realtime Database
- Favourites page with remove support
- Firebase Authentication service and global auth context foundation
- TypeScript, ESLint, and Vite development workflow

Authentication UI and route protection are not enabled yet.

## Requirements

- Node.js
- npm
- An OMDb API key
- A Firebase web app with Realtime Database enabled

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
copy .env.example .env
```

Add the OMDb key to `.env`:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
```

Fill in the Firebase values in `.env` using the configuration from your Firebase web app. Never commit `.env` or real API keys.

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Environment Variables

The application uses Vite environment variables. Required Firebase variables are listed in `.env.example`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.region.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Also add:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
```

Firebase Realtime Database rules must allow the operations required by the current application configuration.

## Project Structure

```text
src/
  components/       Shared UI components, including Header and MovieCard
  context/          Global application contexts, including authentication
  pages/
    Auth/           Authentication model, view model, and view foundation
    Favourites/     Favourite movie model, view model, and view
    Home/           Movie loading, search, and home view
  services/         OMDb, Firebase, and authentication integrations
  types/            Shared TypeScript types
```

The project follows a lightweight MVVM structure for page-specific logic:

- **Model:** API and service-facing operations
- **View model:** React state and user actions
- **View:** Presentational React components

## Data Services

- `omdbMovieService.ts` communicates with the OMDb API.
- `firebaseService.ts` initializes Firebase Auth, Cloud Firestore, and Realtime Database. Favourite data currently uses Realtime Database.
- `authService.ts` contains Firebase Authentication operations.
