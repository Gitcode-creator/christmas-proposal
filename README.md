# WishMagic AI - Christmas Wishes Generator 🎄✨

WishMagic AI is a premium, feature-rich React SPA built to help users craft deeply personalized Christmas wishes, social media updates, and downloadable greeting cards using advanced AI.

---

## 🔐 Environment Security Warning

> [!WARNING]
> This application includes a frontend authentication simulation using browser Local Storage and Session Storage. It is designed for demonstration and classroom prototyping purposes. It is **not** intended for production security. Do not enter real-world production passwords or sensitive credentials.

---

## Features

- **Personalized Wishes**: 15 distinct formats (Main, Emotional, Funny, Santa Message, Quotes, Gift recommendations, Song recommendations, etc.).
- **Card Generator**: Customizable HTML5 canvas card designer featuring ornament toggles and high-resolution PNG exports.
- **Synthesized Music Box**: Native browser Web Audio API music player playing *"We Wish You a Merry Christmas"* without external file dependencies.
- **Partitioned User Storage**: History archives and favorites lists are fully separated per user ID.
- **Failed Login Lockouts**: Failsafe lockouts that freeze login attempts for 60 seconds after 5 failed password attempts.
- **Registration Drafts**: Caches registration entries to prevent losing state on reload.
- **SEO & Dark Theme**: Responsive layouts with metadata configurations and Light/Dark/System theme toggles.

---

## Technical Stack

- **Framework**: React 19 (TypeScript) + Vite 8
- **Styling**: Tailwind CSS v4 + Framer Motion (Transitions)
- **Utilities**: html2canvas, jsPDF, Lucide React
- **Authentication**: Local Storage + Session Storage + React Router 7
