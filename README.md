# Restaurant Reservations

Vue 3 + TypeScript app scaffolded with Vite.

## Project structure

```
src/
  api/          # HTTP client and API modules (add endpoints here)
  types/        # Shared TypeScript types
  App.vue
  main.ts
```

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |

## API layer

Configure the backend URL in `.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

Use `apiRequest` from `@/api` for typed fetch calls:

```ts
import { apiRequest } from '@/api'

const data = await apiRequest<MyType>('/reservations')
```
