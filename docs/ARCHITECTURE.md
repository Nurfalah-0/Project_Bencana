# AquaSentinel Architecture

## Overview

AquaSentinel is a Vue 3 application built with Vite, Pinia, and TailwindCSS (or Vanilla CSS with modern practices). It provides real-time flood risk detection and emergency guidance for the Java Timur region.

## Core Principles

1. **Safety First**: Accurate GPS tracking and clear emergency instructions.
2. **Performance**: Optimized for mobile devices with smooth animations and lazy-loaded components.
3. **Resilience**: Robust error handling for network issues and GPS failures.

## Project Structure

- `src/components`: UI components, organized by domain (e.g., `hero/`, `modals/`, `results/`).
- `src/stores`: Pinia stores for state management (`locationStore.js`, `uiStore.js`).
- `src/composables`: Reusable logic for GPS, mapping, and external integrations.
- `src/utils`: Helper functions and static configuration/constants.
- `src/views`: Page-level components associated with routes.

## Design System

The app uses a "Dark Cinematic Luxury" aesthetic with:

- Glassmorphism effects (`backdrop-filter: blur`).
- Custom color tokens for risk levels (Low, Medium, High).
- Dynamic animations for a premium feel.

## Future Plans (Roadmap)

- [ ] Integration with real BMKG API for weather data.
- [ ] Offline support via Service Workers.
- [ ] Push notifications for early warnings.
