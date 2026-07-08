# MailFlow AI — Brand Design System

This document defines the visual identity, assets, colors, typography, and usage guidelines for MailFlow AI.

---

## Logo Concept

**Envelope + AI Spark**

The MailFlow AI logo combines a clean, geometric envelope silhouette with a 4-pointed generative AI "spark" centered at the intersection of the envelope flaps. The envelope represents email, the spark represents AI intelligence.

- **Envelope**: Drawn with `#0A0F24` (brand primary dark) — rounded-corner rectangle with two angled flap strokes converging toward center.
- **AI Spark**: 4-pointed star shape filled with a gradient from `#6366F1` to `#4F46E5` (brand accent indigo).
- **Text**: "MailFlow" in `font-black` weight (900) with an "AI" badge tag using the accent color.

---

## Branding Assets

All SVG assets are stored under `/public/branding/`:

| Asset | File | Usage |
|-------|------|-------|
| **Primary Logo** | [logo-primary.svg](/branding/logo-primary.svg) | Navbars, headers, marketing pages |
| **Icon-Only Logo** | [logo-icon.svg](/branding/logo-icon.svg) | Favicon, collapsed sidebar, loading screens, avatars |
| **Compact Badge** | [logo-compact.svg](/branding/logo-compact.svg) | Circle-bounded avatar, profile cards, social sharing |

The root `/public/logo.svg` is a copy of `logo-icon.svg` used as the primary browser favicon.

---

## Brand Colors

| Token | Hex | CSS Variable | Purpose |
|-------|-----|-------------|---------|
| **Primary** | `#0A0F24` | `--color-brand-primary` | Headers, text, sidebar, dark backgrounds |
| **Primary Hover** | `#060917` | `--color-brand-primary-hover` | Button hover states |
| **Accent** | `#6366F1` | `--color-brand-accent` | CTA buttons, links, AI spark, focus rings |
| **Accent Hover** | `#4F46E5` | `--color-brand-accent-hover` | Button hover states |
| **Accent Light** | `#EEF2FF` | `--color-brand-accent-light` | Selected/highlight backgrounds |
| **Background Light** | `#F1F5F9` | `--color-brand-bg-light` | Auth page backgrounds |
| **Background Slate** | `#F8FAFC` | `--color-brand-bg-slate` | Main viewport background |

---

## Typography

| Element | Font Stack | Weight | Size |
|---------|-----------|--------|------|
| **Logo text** | System sans-serif | 900 (Black) | `text-xl` (20px) |
| **Hero titles** | System sans-serif | 800 (Extrabold) | `text-5xl` → `text-7xl` |
| **Section titles** | System sans-serif | 800 (Extrabold) | `text-4xl` → `text-5xl` |
| **Page titles** | System sans-serif | 700 (Bold) | `text-3xl` → `text-4xl` |
| **Card titles** | System sans-serif | 700 (Bold) | `text-xl` → `text-2xl` |
| **Body text** | System sans-serif | 500 (Medium) | `text-sm` (14px) |
| **UI labels** | System sans-serif | 600–700 | `text-xs` (12px) |

---

## Logo Usage by Context

| Context | Component | Variant |
|---------|-----------|---------|
| Landing Navbar | `<Logo />` | Full logo with AI badge |
| Landing Footer | `<Logo />` | Full logo with AI badge |
| Dashboard Sidebar (expanded) | `<Logo />` | Full logo with AI badge |
| Dashboard Sidebar (collapsed) | `<LogoIcon className="w-7 h-7" />` | Icon only |
| Mobile Sidebar | `<Logo />` | Full logo with AI badge |
| Initial Page Loader | Inline SVG in `<FullPageLoader />` | Icon + "MAILFLOW" label |
| Browser Tab | `/logo.svg` via `<link rel="icon">` | SVG icon |

---

## Component Classes (Design System)

Defined in `/src/index.css`:

- **Buttons**: `.btn-primary`, `.btn-accent`, `.btn-secondary` + sizes `.btn-lg`, `.btn-md`, `.btn-sm`
- **Inputs**: `.input-primary`, `.input-accent`, `.input-accent-icon`, `.textarea-accent`
- **Selects**: `.select-accent`, `.select-accent-icon`
- **Cards**: `.card-standard`, `.card-flat`, `.card-large`
- **Badges**: `.badge-tone`, `.badge-status-sent`, `.badge-status-draft`
- **Typography**: `.title-hero`, `.title-section`, `.title-page`, `.title-card`, `.text-muted`
