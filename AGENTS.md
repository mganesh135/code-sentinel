# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Overview

Code Sentinel ("An Efficient Code Reviewing System") is an early-stage monorepo. Most of it is scaffolding: the web UI is a design-driven SPA with stubbed auth, and the Go services are mostly placeholders. Tool versions (Go 1.26.3, Python 3.14.5) are pinned in `mise.toml`.

There is no root build system, no Makefile, and no linter or unit-test setup. Each component is built on its own.

## Layout

- `services/cli/` — Go CLI (Cobra). Its own Go module: `github.com/mganesh135/code-sentinal/services/cli` (note the "sentinal" spelling in module paths and the binary name; keep it consistent).
- `services/gateway/` — Go module for the API gateway. Currently a stub (`main.go` calls `auth.Run()` in `cmd/auth`). `.env.sample` defines `GATE_WAY_PORT=3000` and `INTELL_PORT=3001` (an intelligence/analysis service that does not exist yet).
- `web/` — React 18 + Vite 5 + React Router 6 SPA (plain JSX, no TypeScript).

Each Go service is a separate module with no `go.work`, so run `go` commands from inside the service directory.

## Commands

CLI (from `services/cli`):
```
go run ./cmd watch      # run a subcommand
go build -o sentinal ./cmd
go test ./...           # no tests yet
```

Gateway (from `services/gateway`): `go run .`

Web (from `web`):
```
npm run dev       # Vite dev server on :5173 (port is fixed in vite.config.js)
npm run build     # outputs to web/dist (gitignored)
node test-screens.mjs   # Playwright smoke test; needs `npm run dev` already running
```

`test-screens.mjs` visits every route at `http://localhost:5173`. It fails on a blank `#root`, a runtime error or a console error, and writes full-page screenshots to `web/screenshots/` (gitignored). To test a single route, edit the `ROUTES` array in that file.

## Architecture

**CLI.** `cmd/main.go` only calls `commands.Execute()`. `commands/root.go` holds the root `sentinal` command. Subcommands are exposed as constructor functions such as `Watch()` and registered in `addCommands()`. To add a subcommand, define its `cobra.Command` and constructor in a new file, then add it to `addCommands()`. `review.go`, `report.go` and `config.go` are empty placeholders and are not registered. The `version`, `help` and `verbose` persistent flags are declared in both `init()` functions, on the root and on `watch`.

**Web.**
- `src/main.jsx` mounts `App.jsx`, which declares all routes. Public routes: `/login`, `/register`, `/forgot-password`, `/cli-auth`. Protected routes sit under `AuthGuard`: `/dashboard`, `/subscriptions`, `/account`. Unknown paths redirect to `/dashboard`.
- `/cli-auth` is the page the CLI login flow will use to authorize the terminal client. It is public so it can be opened from the CLI.
- Auth is **stubbed**. `context/AuthContext.jsx` seeds `user` with a hard-coded `STUB_USER`, so every protected route is open by default. Set the initial state to `null` to exercise the login redirect. Real session and token validation is meant to replace this once the gateway auth endpoints exist.
- `AuthGuard.jsx` uses the global `location` rather than `useLocation()` when it records `state.from`. Switch to `useLocation()` if you rely on the redirect-back behaviour.
- Shared layout lives in `components/AuthShell.jsx` (auth pages) and `components/AppShell.jsx` (app pages). Styling is a single global `src/styles.css`. The UI was ported from a Codex design canvas export, so its structure follows those mockups.
