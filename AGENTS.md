# The Wheel — Agent Guide

## Purpose and sources of truth

The Wheel is a portrait Expo / React Native app for browsing and playing the
Grateful Dead's 1965–1995 archive.org live-recording collection.

- Read `CONTEXT.md` before domain or data-model changes. It is the authoritative
  glossary and records the intentional edge-case decisions; do not duplicate its
  definitions here or create competing terminology.
- `README.md` is the short human setup reference. Keep it limited to getting the
  app running.
- `docs/` is git-ignored scratch space, never an authority.

## Code map

- `App.tsx`: app bootstrap, font loading, theme and native player setup.
- `src/navigation.tsx`: two-screen stack (`Home`, `ShowDetails`) and the global
  `PlayerProvider` / player bar.
- `src/screens/` and `src/components/`: UI. Use Tamagui tokens and the shared
  `Touchable` component for pressable UI.
- `src/context/PlayerContext.tsx`: the sole coordinator for queueing, playback,
  retries, restore, and persisted position. Keep native player state changes in
  this layer rather than adding another owner.
- `src/services/`: archive data lookup, URL construction, persistence, and
  small domain utilities. `*-bones.tsx` files are checked-in archive snapshots;
  avoid incidental edits or formatting churn in them.
- `patches/`: required `patch-package` fixes, applied by `postinstall`.

## Guardrails that preserve behavior

- A `Show` is a date-grouped user-facing performance; a `Recording` is one
  archive item that can play. Use the glossary's terms exactly.
- Use `normalizeShowDate` for grouping/comparing performances, `showYear` for
  archive-year lookup, and `isPlayableShow` before queueing audio. Do not
  reimplement these checks at call sites.
- Keep the preferred-recording rule consistent: first playable recording, then
  first recording. Respect raw dates where favorites and recording restoration
  require them.
- Build audio paths with `archiveTrackUrl`; it handles path encoding and
  data-node routing. Prefetch with `prefetchItemLocation` when a recording is
  shown before playback.
- Persist app data only through `src/services/storage.ts`. It is synchronous by
  design because backgrounding can interrupt async writes.
- Playback loads are intentionally serialized and token-protected. Preserve that
  newest-user-action-wins behavior when changing `PlayerContext`.

## Project conventions

- TypeScript is strict. Prefer precise types and existing helpers over `any`;
  follow the surrounding formatting and comments, especially where comments
  explain archive or native-player failure modes.
- Use the configured imports: `@components`, `@screens`, and `@services`.
- This repo has no automated test script. For TypeScript-only changes, run
  `npx tsc --noEmit`. For UI or native playback changes, also exercise the
  affected flow in an Expo development build when the environment permits.
- Use `npm install`; `postinstall` applies patches. Run `RCT_NEW_ARCH_ENABLED=1
  pod install` from `ios/` after native dependency changes. `app.json` or Expo
  config plugin changes require `npx expo prebuild` before native projects match.
- Do not alter `ios/`, `android/`, dependency lockfiles, or generated native
  config for a JavaScript-only change. Preserve unrelated working-tree edits.

## Before handing off

- Inspect `git status` and keep the diff scoped to the request.
- State what you verified and any validation that could not be run.
- When changing a domain invariant or established convention, update
  `CONTEXT.md`; when changing how agents work in this repository, update this
  file instead.
