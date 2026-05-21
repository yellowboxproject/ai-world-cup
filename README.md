# AI Model World Cup

Premium Next.js website for a fictional FIFA-style women’s AI World Cup event.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Local development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Production build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import project in Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output: `.next` (auto-detected).

## Data and assets
- Mock competition data: `lib/data.ts`
- Placeholder model images path: `public/models/*.jpg`
- Missing images gracefully fall back to cinematic placeholder cards.

## Future-ready expansion
- Add real generated portraits to `public/models`
- Add API routes for voting and live rankings
- Add motion-rich intros and AI-generated match posters/videos
