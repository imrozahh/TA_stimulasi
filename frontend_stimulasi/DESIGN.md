---
name: Academic Growth System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#424753'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#727784'
  outline-variant: '#c2c6d5'
  surface-tint: '#005bbf'
  primary: '#0059ba'
  on-primary: '#ffffff'
  primary-container: '#2c72d9'
  on-primary-container: '#fefcff'
  inverse-primary: '#acc7ff'
  secondary: '#006c50'
  on-secondary: '#ffffff'
  secondary-container: '#8bf7cd'
  on-secondary-container: '#007255'
  tertiary: '#755700'
  on-tertiary: '#ffffff'
  tertiary-container: '#936f00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004492'
  secondary-fixed: '#8bf7cd'
  secondary-fixed-dim: '#6fdab2'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#ffdf9c'
  tertiary-fixed-dim: '#f1c048'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for an Early Childhood Development (ECD) platform that balances clinical precision with educational warmth. The brand personality is **Professional, Nurturing, and Insightful**. It targets educators and parents who require high-density data presented with clarity and empathy.

The visual style follows a **Modern Minimalist** approach with subtle **Glassmorphic** influences. It leverages heavy whitespace and a sophisticated layering system to prevent cognitive overload. By combining the structured logic of Material Design 3 with the refined aesthetic of high-end productivity tools, the system evokes a sense of "Quiet Authority"—it is reliable enough for academic assessment while remaining approachable for daily childcare management.

## Colors
This palette uses functional color-coding to guide the user through predictive data.
- **Primary (Trust Blue):** Used for primary actions, navigation, and structural elements.
- **Secondary (Growth Mint):** Reserved for "Meeting Expectations" statuses and health-related positive indicators.
- **Tertiary (Attention Yellow):** Applied to "Needs Attention" warnings and developmental milestones requiring observation.
- **Neutral (Deep Slate):** Used for text and icons to ensure high legibility against the light background.
- **Surface:** The background is a cool-toned white (#F8FAFC) to reduce eye strain during long assessment sessions.

## Typography
The typography utilizes **Be Vietnam Pro** (selected as a high-fidelity alternative to Poppins) to maintain a modern, geometric, and friendly tone. 

- **Headlines:** Use tight letter-spacing and semi-bold weights to create a strong visual hierarchy.
- **Body Text:** Generous line heights are maintained for readability in long-form child observation notes.
- **Labels:** Set in medium weight with slight tracking for use in tables, metadata, and status badges.
- **Scaling:** On mobile devices, display and large headlines scale down by approximately 25% to ensure content remains above the fold.

## Layout & Spacing
The layout follows a **Fluid Grid** system based on an 8px square baseline. 
- **Desktop:** 12-column grid with a 24px gutter. Content is centered with a max-width of 1440px for dashboard views.
- **Tablet:** 8-column grid with 16px gutters. Sidebars transition to a collapsed or overlay state.
- **Mobile:** 4-column grid with 16px margins. 

Spacing is intentionally generous to evoke a premium feel. Use `lg` (24px) or `xl` (32px) padding within cards to ensure data-heavy sections do not feel cramped.

## Elevation & Depth
Elevation is expressed through **Ambient Shadows** and **Tonal Layering**, moving away from harsh black shadows to soft, tinted blurs.

- **Level 0 (Base):** #F8FAFC background.
- **Level 1 (Cards/Sidebar):** White surface with a 1px border (#E2E8F0) and a very soft shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Dropdowns/Modals):** White surface with a more pronounced, diffused shadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`.

Use "Glass" effects for floating headers or navigation bars by applying a `backdrop-filter: blur(12px)` and 80% opacity to white surfaces.

## Shapes
The shape language is defined by significant corner rounding to communicate safety and friendliness.
- **Small Elements (Inputs, Buttons):** 8px (rounded-md) for a modern, approachable feel.
- **Medium Elements (Cards, Modals):** 16px (rounded-xl) to create the signature "premium" dashboard look.
- **Large Elements (Sidebar, Hero Containers):** 24px (rounded-2xl) to define major structural areas.
- **Charts:** All bar charts must feature rounded top caps (radius: 4px+), and line charts should use smooth interpolation (monotone cubic).

## Components
- **Buttons:** Primary buttons use a solid #0059ba fill with white text. Secondary buttons use a subtle "Ghost" style with a 1px border. All buttons have a height of 40px or 48px to remain "touch-friendly."
- **Status Badges:** Use "Pill" shapes (rounded-full). "Meeting Expectations" uses light green backgrounds with dark green text. "Needs Attention" uses light yellow/coral backgrounds.
- **Sidebar:** Collapsible design. Active states use a "Side-indicator" (a 4px vertical line of Primary Blue) and a soft blue tint for the background of the active row.
- **Data Tables:** Borderless rows with 1px horizontal dividers. The header should be subtly tinted (#F1F5F9) with uppercase labels.
- **Input Fields:** Use the "Outlined" Material 3 style with a 1px stroke. Focus states should use a 2px Primary Blue border with a soft glow.
- **Cards:** The primary container for the "Academic Growth System." They should always include a `title-lg` header and use `xl` padding.
