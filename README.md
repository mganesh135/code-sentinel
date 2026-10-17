# Code Sentinel

An Efficient Code Reviewing System.

Code Sentinel is designed to review code automatically. A CLI watches a local repository for commits that haven't been published yet and starts code analysis on them. A gateway service handles authentication and routes requests to an analysis service. A web app lets users sign in, manage their subscription and account, and authorize the CLI.

> **Status: early-stage.** The web UI is a design-driven SPA with stubbed authentication. The CLI and gateway are mostly placeholders, and the analysis ("intelligence") service doesn't exist yet. See [Current state](#current-state).

## Repository layout

| Path | Description |
| --- | --- |
| `services/cli/` | Go CLI built with [Cobra](https://github.com/spf13/cobra). The binary is named `sentinal`. |
| `services/gateway/` | Go API gateway (stub). |
| `web/` | React 18 + Vite 5 + React Router 6 single-page app (plain JSX). |
| `mise.toml` | Pinned tool versions. |
| `.env.sample` | Sample environment variables for the services. |

There is no root build system. Each component is built and run on its own. The two Go services are separate modules with no `go.work`, so run `go` commands from inside the service directory.

> The module paths and binary use the spelling `sentinal`. This is intentional for now, so keep it consistent.

## Prerequisites

| Tool | Version | Needed for |
| --- | --- | --- |
| [Go](https://go.dev/dl/) | 1.26.3 | CLI and gateway |
| [Python](https://www.python.org/) | 3.14.5 | Pinned in `mise.toml`; no Python code in the repo yet |
| [Node.js](https://nodejs.org/) + npm | A current LTS release (Vite 5 needs Node 18+) | Web app |

The recommended way to get the pinned Go and Python versions is [mise](https://mise.jdx.dev/):

```sh
mise install    # reads mise.toml
```

## Setup

### 1. Environment variables

Copy the sample file and adjust as needed. `.env` is gitignored.

```sh
cp .env.sample .env
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `GATE_WAY_PORT` | `3000` | Port for the API gateway |
| `INTELL_PORT` | `3001` | Port for the planned intelligence/analysis service |

The services don't read these yet.

### 2. Install dependencies

```sh
# Web
cd web && npm install

# CLI (downloads Cobra)
cd services/cli && go mod download
```

The gateway has no external dependencies.

For the web smoke test, install the Playwright browser once:

```sh
cd web && npx playwright install chromium
```

## Build and run

### CLI

From `services/cli`:

```sh
go run ./cmd watch               # run a subcommand without building
go build -o sentinal ./cmd       # build the binary
./sentinal watch
```

Available commands:

- `watch`: watch the code for changes. It is currently a stub that prints a message.

Persistent flags: `-v/--version`, `-h/--help`, `-V/--verbose`.

### Gateway

From `services/gateway`:

```sh
go run .
```

The gateway currently only prints a greeting and exits.

### Web app

From `web`:

```sh
npm run dev       # dev server at http://localhost:5173 (port is fixed)
npm run build     # production build to web/dist
npm run preview   # serve the production build locally
```

Routes:

| Route | Access | Purpose |
| --- | --- | --- |
| `/login`, `/register`, `/forgot-password` | Public | Authentication pages |
| `/cli-auth` | Public | Page the CLI login flow uses to authorize the terminal client |
| `/dashboard`, `/subscriptions`, `/account` | Protected | Application pages |

Unknown paths redirect to `/dashboard`.

## Testing

There are no unit tests yet (`go test ./...` in either service passes trivially).

The web app has a Playwright smoke test. It visits every route and fails on a blank `#root`, a runtime error or a console error. It also writes full-page screenshots to `web/screenshots/` (gitignored). Start the dev server first, then run the test from another terminal:

```sh
cd web
npm run dev                # terminal 1
node test-screens.mjs      # terminal 2
```

To test a single route, edit the `ROUTES` array in `web/test-screens.mjs`.

## Current state

- **Auth is stubbed.** `web/src/context/AuthContext.jsx` seeds the user with a hard-coded stub, so all protected routes are open. To exercise the login redirect, set the initial `user` state to `null`. Real session and token validation will replace this once the gateway auth endpoints exist.
- **CLI:** only `watch` is registered. `review`, `report` and `config` are empty placeholders.
- **Gateway:** a stub. `main.go` calls `auth.Run()` in `cmd/auth`.
- **Intelligence service:** planned (`INTELL_PORT`), not yet implemented.
