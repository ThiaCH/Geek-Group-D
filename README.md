# MERN

## Setup

1. Create `vite` project -> `npm create vite`
   1. Answer the questions -> `mern` folder
2. `cd mern` && `npm install`

## Git setup

1. `git init`
2. Add on the `.gitignore` from <https://www.toptal.com/developers/gitignore/api/windows,osx,node,visualstudiocode>
3. `git add .` && `git commit -m ...`

Goto `github.com` and create a new EMPTY repo

```bash
 git remote add origin git@git.generalassemb.ly:simonlau/mern-50.git
  git branch -M main
  git push -u origin main
```

## Optional lint-staged + git-hooks + prettier

`npm install -D prettier`
`npx mrm@2 lint-staged`

`husky` -> git hook manager
`lint-staged`

install into `package.json` in devDepencies

new `lint-staged` in `package.json`
new `.husky`

- `pre-commit` -> `npx lint-staged`

## Edit for CommonJS

Inside `.eslintrc.cjs` change to

`env: { browser: true, es2020: true, node: true },`

Inside `package.json`

Remove `type: "module"`

## Adaptation for vite dist instead of CRA build

Inside `server.js`

```js
app.use(favicon(path.join(__dirname, "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "dist")));
```

## Setup nodemon

`npm install -D nodemon`

in `package.json` add to "scripts":

```js
    "dev:react": "vite",
    "dev:express": "node --watch server.js",
    "dev:express-win": "nodemon server.js",
```

## Clean up

`main.js` -> remove CSS

Unused files

```bash
rm src/*.css
rm -r src/assets
```

## React convention

Folder -> name is same as the actual Component

split into `pages` and stand-alone `components` folders

## dotenv pitfall

dotenv-safe -> `.env.example`

changing `.env` -> does not restart express

## debug in express

In server.js -> `const debug = require("debug")("mern:server");`
In `config/database.js` -> `const debug = require("debug")("mern:config:database");`

In package.json change to

`"dev:express": "DEBUG=mern:* node --watch server.js",`

## debug in react

in `App.js` as well as every other file you want to log

```js
import debug from "debug";

const log = debug("mern-50:pages:App:App");
```

in `main.jsx` -> write once -> `localStorage.debug = "mern-50:*";`

## Structure

React -> src -> pages / components etc
Express -> server.js, models, controllers etc

Project
--> React
--> Express

## Proxy setup

In `vite.config.js`, change to

```js
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

## Deploy -> Vercel

## Routing

React -> React Router -> /movies
Express -> ALL should be /api/movies
