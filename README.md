# 🎵 iTunes Music App

A production-ready **Next.js 14 + TypeScript** music search application powered by the iTunes Search API.

This project demonstrates scalable frontend architecture, async state management using Redux Toolkit, infinite scroll pagination, server-side API proxying, and comprehensive testing.

---

## 📚 Table of Contents

- Overview
- Features
- Tech Stack
- Installation
- Environment Setup
- Running the App
- Production Build
- Testing
- Project Structure
- Architecture
- API Documentation
- State Management
- Infinite Scroll
- Performance
- Error Handling
- Future Improvements
- License
- Author

---

## 🎯 Overview

This application allows users to:

- Search for artists, albums, and songs
- Browse results in a responsive grid layout
- Automatically load more results on scroll
- View album artwork and track information
- Experience smooth loading and error states

Built to demonstrate production-level frontend engineering practices.

---

## ✨ Features

- 🔍 Music search (artists, albums, tracks)
- ♾ Infinite scroll pagination (offset-based)
- 🧠 Redux Toolkit async state management
- 🛡 Server-side API proxy (no CORS issues)
- ⚡ Optimized performance
- 📱 Fully responsive UI
- 🧪 80%+ test coverage
- 🎯 Production-ready structure

---

## 🛠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript (strict mode)
- Tailwind CSS

### State Management
- Redux Toolkit
- createAsyncThunk

### Backend Layer
- Next.js API Routes
- Server-side proxy to iTunes API

### Testing
- Jest
- React Testing Library
- Redux slice testing
- API route testing

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/chtabish12/itunes-music-app-next.git
cd itunes-music-app-next
```

### Install Dependencies

```bash
npm install
```

---

## ⚙ Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## ▶ Running the App (Development)

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🏗 Production Build

```bash
npm run build
npm start
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Coverage

```bash
npm test -- --coverage
```

---

## 📂 Project Structure

```
app/
  api/
    search/
      route.ts
  layout.tsx
  page.tsx

components/
  SearchForm.tsx
  ResultsList.tsx
  ResultCard.tsx
  LoadingSpinner.tsx
  InfiniteScrollLoader.tsx
  ErrorMessage.tsx
  EmptyState.tsx

lib/
  redux/
    store.ts
    searchSlice.ts
    hooks.ts

types/
  index.ts

__tests__/
  components/
  redux/
  api/
```

---

## 🏗 Architecture

```
React Components
        ↓
Redux Toolkit (Async Thunks)
        ↓
Next.js API Route (/api/search)
        ↓
iTunes Search API
```

---

## 🔌 API Documentation

### GET `/api/search`

#### Query Parameters

| Parameter | Type   | Required | Default |
|-----------|--------|----------|---------|
| term      | string | Yes      | —       |
| limit     | number | No       | 10      |
| offset    | number | No       | 0       |

### Example

```
/api/search?term=taylor&limit=10&offset=0
```

### Success Response

```json
{
  "results": [],
  "resultCount": 50
}
```

### Error Codes

- 400 – Missing search term
- 500 – iTunes API failure

---

## 🧠 Redux State Structure

```ts
{
  results: [],
  loading: false,
  error: null,
  query: '',
  offset: 0,
  hasMore: false,
  totalResults: 0
}
```

---

## ♾ Infinite Scroll

1. Initial request loads 10 results
2. IntersectionObserver detects bottom
3. Dispatches `fetchMoreResults`
4. Appends results to Redux state
5. Stops when `hasMore` becomes false

---

## 📊 Performance Optimizations

- Tailwind CSS tree-shaking
- Optimized production build
- Memoized selectors
- Efficient Redux updates
- IntersectionObserver for scroll detection

---

## 🛡 Error Handling

- API validation for missing term
- Graceful 500 handling
- UI error feedback component
- Loading indicators for async calls
- Empty state when no results found

---

## 🔮 Future Improvements

- Debounced search
- Search filters
- Search history
- Skeleton loaders
- API caching
- E2E testing (Playwright / Cypress)
- SSR prefetching

---

## 📄 License

MIT License

---

## 👤 Author

Muhammad Tabish Nadeem  
Senior Frontend Engineer  
React • Next.js • TypeScript • Scalable Architecture