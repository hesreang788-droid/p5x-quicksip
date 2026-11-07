# Persona 5 Animated Menu Overlay

Architectural blueprint for integrating a high-octane, full-screen Persona 5 inspired menu overlay with skewed polygon tabs, snappy diagonal slice transitions, synthesized Web Audio sound effects, and kinetic comic particle bursts into the Quick Sip × Holy Sip storefront.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your selections in Turn 1, the following core features are confirmed:
> - **Display Mode**: Full-screen animated overlay menu with skewed polygon tabs.
> - **Visual Aesthetics**: Slanted high-contrast cards (Crimson Red `#E60012`, Deep Black `#000000`, Crisp White `#FFFFFF`), halftone comic screen textures, and sharp slice transitions.
> - **Interactive Polish**: Synthesized zero-latency Web Audio sound effects (whoosh, click, slice) with an audio mute toggle, plus kinetic comic star and shard particle bursts on click.

---

## 1. Overview & Core Concept

- **What It Does**: Introduces a high-energy, full-screen Persona 5 inspired interactive navigation overlay accessible from a stylized header trigger or hotkey (`M` / `Esc`). The menu features skewed polygon cards with dynamic comic hover states, character cut-in silhouette styling, sound effects synthesized via the Web Audio API, and kinetic shard explosions that seamlessly route users to products, the Holy Sip collaboration, the flavour quiz, the bundle builder, and the cart.
- **Target Persona**: Gamers, anime/gaming enthusiasts, and drink collectors who love Persona 5's iconic stylish typography, rebellious energy, and comic-book motion language.
- **Key Value**: Delivers an unforgettable, interactive brand experience while keeping full e-commerce navigation functional and accessible.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Triggering the Menu**: The user clicks the stylized "MENU // TAKE YOUR HEART" button in the navbar (or presses `M` on desktop).
2. **Snappy Slice Transition**: High-contrast diagonal comic slash curtains (`transform: skewX(-14deg)`) wipe across the screen in red and black, accompanied by an audio slice swoosh.
3. **Exploring the Skewed Tabs**:
   - Skewed, staggered polygon tabs animate in from alternating sides:
     - `01 // QUICK SIP SHOP` (Energy, Iced Tea, Hydration, Starter Sets)
     - `02 // HOLY SIP COLLAB` (Limited-edition collaborative menu showcase)
     - `03 // FLAVOUR MATCH` (Interactive quiz modal launch)
     - `04 // TRIO BUNDLE BUILDER` (Mix & match 3-tub creator)
     - `05 // SQUAD CART` (Item count and cart drawer trigger)
     - `06 // CAMBODIA DISPATCH` (Free shipping & express courier guide)
     - `07 // TALK TO SAMBATH` (Support chat simulation modal)
4. **Hover & Selection**:
   - Hovering over a tab tilts the card with dynamic black-and-white color inversion, revealing a Phantom Thief-inspired typographic banner and halftone background pattern.
   - Selecting a tab triggers a kinetic star/comic-shard particle explosion and an authentic menu-select sound chime before executing the route and closing the overlay smoothly.
5. **Sound Control**: A discreet audio toggle (Sound ON / OFF) allows users to silence or enjoy Web Audio effects freely.

### Visual Identity & Theme
- **Color Palette**:
  - Crimson Red: `#E60012`
  - Phantom Black: `#0B0B0E` / `#000000`
  - Starch White: `#FFFFFF`
  - Accent Yellow: `#FFE600` (highlight dots & stars)
- **Typography**: Bold slanted sans-serif display type with heavy letterforms (`font-black italic uppercase -skew-x-12`) layered over halftone dot grids.
- **Motion & Physics**: Snappy ease-out bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) with 120ms–240ms duration for authentic arcade-level responsiveness.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Screen Overlay vs Permanent Website Restyle**
  - *Chosen Approach*: Full-screen animated overlay menu with dedicated toggle, leaving the main store layout polished, legible, and easy to shop.
  - *Why*: Gives users the explosive, theatrical Persona 5 experience whenever opened without compromising product readability, cart checkout simplicity, or e-commerce conversion rates.
  - *Alternatives Considered*: Re-skinning the entire website permanently would interfere with readability for normal product shopping and checkout.

- **Decision 2: Synthesized Web Audio API vs External MP3 Assets**
  - *Chosen Approach*: Synthesize audio cues (UI slice swoosh, crisp card click, tab confirmation chime) directly using the browser's built-in `AudioContext`.
  - *Why*: Zero external network dependencies, 0ms load latency, zero chance of broken audio links or CORS blocking, and lightweight footprint.
  - *Alternatives Considered*: External audio files often fail in hermetic sandboxes or trigger browser autoplay policy rejections.

- **Decision 3: Canvas Kinetic Particle Engine**
  - *Chosen Approach*: Lightweight 2D canvas overlay for emitting starbursts, comic shards, and dynamic slice rays on click.
  - *Why*: High performance (60 FPS GPU-accelerated compositing) without DOM element thrashing.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Navbar.tsx                                │
│       [Brand Wordmark] ── [Nav Links] ── [P5 Menu Trigger] ── [Cart]   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ toggles isP5MenuOpen
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Persona5MenuOverlay.tsx                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 1. Diagonal Slice Curtains (Motion skewed Red & Black panels)    │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ 2. Skewed Polygon Navigation Tabs:                               │  │
│  │    • 01 // ALL BEVERAGES      • 04 // CUSTOM TRIO STACK          │  │
│  │    • 02 // HOLY SIP COLLAB    • 05 // SQUAD CART DRAWER          │  │
│  │    • 03 // FLAVOUR MATCH QUIZ • 06 // SAMBATH SUPPORT            │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ 3. Halftone Comic Screen Texture & Phantom Calling Card Motif    │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ 4. Kinetic Particle Canvas (Stars & Comic Shard Bursts)          │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ 5. Sound FX Engine (Web Audio API Synthesizer + Mute Toggle)     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ routes onSelect
                                     ▼
                  [App.tsx State & Modals Triggered]
```

### Component Breakdown
1. **`src/components/Persona5MenuOverlay.tsx`**:
   - Full-screen animated modal powered by `motion/react` (`AnimatePresence`).
   - Dynamic skew transforms (`-skew-x-12`), high-contrast card inversion on hover, and active category routing.
   - Built-in canvas particle burst engine rendering comic stars and geometric triangular shards.
   - Built-in Web Audio API synthesizer generating click, whoosh, and confirmation audio tones.
   - Keyboard event listener for quick `Escape` or `M` key dismissal.
2. **`src/components/Navbar.tsx`**:
   - Integration of the styled "P5 MENU // TAKE YOUR HEART" badge trigger next to search and cart.
3. **`src/App.tsx`**:
   - State wiring for `isP5MenuOpen` and handler dispatching to product catalog scrolling, category filters, quiz modal, bundle modal, cart drawer, and support modal.

---

## 5. Implementation Status
- [x] Full-screen `Persona5MenuOverlay.tsx` created with diagonal slice curtains and skewed polygon tabs (`-skew-x-12`).
- [x] Built-in Web Audio API sound synthesis engine for slice whoosh, card hover blips, and chord selection chimes with SFX ON / MUTED toggle.
- [x] Interactive 2D canvas kinetic particle engine with 4-pointed stars, comic shards, and speed slashes on tab click.
- [x] Header trigger button added to `Navbar.tsx` (`P5 MENU [M]`) and mobile drawer.
- [x] Global keyboard shortcut (`M` to toggle, `Escape` to close, `Arrow keys` / `Enter` to navigate) in `App.tsx`.
- [x] Clean compilation and linting verified with 0 errors.
