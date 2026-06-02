# BatFam — Interactive Batman Universe Experience

> An immersive, character-driven web experience exploring the Batman universe. Choose your hero, dive into their world, and uncover the secrets of Gotham.

![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?logo=greensock&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.106.2-3ECF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Characters](#characters)
- [Easter Eggs](#easter-eggs)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**BatFam** is a React single-page application built as an interactive tribute to the Batman universe. Users explore five members of the Bat-Family — each with their own animated transition, detailed lore sections, rogues gallery, and character-specific content. A lore-accurate AI chatbot (Oracle, powered by Groq + LLaMA 3.3-70B) answers Batman universe questions in real time.

The site is designed with cinematic transitions, canvas-based GSAP animations, and deep lore content — aimed at fans who want more than just a wiki.

---

## Features

- **Character Selection** — Choose from 5 Bat-Family members with keyboard and mouse navigation
- **Canvas Transition Animations** — Character-specific entrance sequences built with GSAP and the Canvas API
- **Lore-Rich Character Pages** — Each hero has dedicated sections: origin, arsenal, allies, and villain rogues gallery
- **Oracle AI Chatbot** — Ask Batman lore questions; powered by the Groq API (LLaMA 3.3-70B model)
- **20+ Easter Eggs** — Including the Konami code, secret keyword triggers, console art, and mobile gesture events
- **Review Section** — Leave feedback powered by Supabase
- **Responsive Design** — Custom mobile layouts for every character page
- **Custom Theming** — Cinzel & Raleway fonts, character-specific color palettes, and dark atmospheric styling

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19.2.6 |
| Build Tool | Vite 8.0.12 |
| Animation | GSAP 3.15.0 |
| Backend / DB | Supabase 2.106.2 |
| AI / Chat | Groq API (LLaMA 3.3-70B) |
| Fonts | Google Fonts — Cinzel, Raleway |
| Linting | ESLint 10.3.0 |
| Language | JavaScript (JSX) |

---

## Project Structure

```
client/
├── public/                   # Static assets served as-is
├── src/
│   ├── assets/               # Images, 3D models (.glb), and audio
│   │   ├── Batman/           # Batman images, villains, allies, Batmobiles, audio
│   │   ├── NightWing/        # Nightwing images and villains
│   │   ├── RedHood/          # Red Hood images and villains
│   │   ├── RedRobin/         # Red Robin images and villains
│   │   ├── Robin/            # Damian Wayne images, covers, villains
│   │   └── images.js         # Centralized asset exports
│   ├── components/           # All React components (one per screen/feature)
│   │   ├── Loader.jsx
│   │   ├── CharSelect.jsx
│   │   ├── MainSite.jsx      # Batman page
│   │   ├── NightwingMain.jsx
│   │   ├── RedHoodMain.jsx
│   │   ├── RedRobinMain.jsx
│   │   ├── DamianMain.jsx
│   │   ├── *Transition.jsx   # Canvas-based transition animations
│   │   ├── OracleChat.jsx    # Groq-powered AI chatbot
│   │   ├── ReviewSection.jsx # Supabase-backed review system
│   │   └── EasterEggs.jsx    # All Easter egg triggers and effects
│   ├── lib/
│   │   └── supabase.js       # Supabase client initialization
│   ├── styles/               # 19 CSS modules (one per component/theme)
│   ├── App.jsx               # Root component — state-based routing via History API
│   ├── App.css
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/batman-site.git
cd batman-site/client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the `client/` directory with the following keys:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_public_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL | [supabase.com](https://supabase.com) → Project Settings |
| `VITE_SUPABASE_KEY` | Supabase public anon key | [supabase.com](https://supabase.com) → Project Settings → API |
| `VITE_GROQ_API_KEY` | Groq API key for Oracle chat | [console.groq.com](https://console.groq.com) |

> **Note:** Never commit `.env.local` to version control. It is already in `.gitignore`.

### Running the App

```bash
# Start the development server (http://localhost:5173)
npm run dev
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot module replacement |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run ESLint across the codebase |

---

## Characters

| Character | Alias | Description |
|---|---|---|
| **Bruce Wayne** | Batman | The Dark Knight, protector of Gotham |
| **Dick Grayson** | Nightwing | First Robin, now protector of Blüdhaven |
| **Jason Todd** | Red Hood | The Fallen Robin — anti-hero with a violent edge |
| **Tim Drake** | Red Robin | The Detective Heir — strategist and hacker |
| **Damian Wayne** | Robin | Son of Batman — trained by the League of Assassins |

Each character has:
- An animated canvas transition sequence on enter
- A hero chronicles / origin section
- A character-specific arsenal or toolkit
- A villain rogues gallery
- An allies section

---

## Easter Eggs

The site contains **20+ hidden easter eggs**. A few hints:

- Try the **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A`
- Type certain names while on the character select screen
- Click the bat logo multiple times
- Check the browser console
- Mobile users: try shaking the device or long-pressing

A full guide is accessible from the footer of the site.

---

## Deployment

The app produces a static bundle and can be deployed to any static hosting provider.

```bash
npm run build
# Deploy the contents of dist/ to your host
```

**Recommended platforms:**
- [Vercel](https://vercel.com) — zero-config, connects directly to GitHub
- [Netlify](https://netlify.com) — supports SPA redirect rules out of the box
- [GitHub Pages](https://pages.github.com) — free, set `base` in `vite.config.js` if needed

**Vite build optimizations included:**
- React and GSAP split into separate vendor chunks
- Assets under 4 KB inlined as base64
- Chunk size warning threshold: 600 KB

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a pull request

Please keep PRs focused — one feature or fix per PR.

---

## License

This project is licensed under the **MIT License**.

> Batman, the Bat-Family, and all related characters are trademarks of DC Comics / Warner Bros. This is a fan project with no commercial intent.

---

*"It's not who I am underneath, but what I do that defines me."*
