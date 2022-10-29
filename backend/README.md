# 4IT580: Backend

## Requirements

- Node.js v12 (or later)
- Yarn (`npm install --global yarn`)

## Setup ENV Variables

Create `.env.local` file (DB user, password, ...)
```
PORT=
JWT_SECRET=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

DATABASE_URL=
```
Database url should be in format like described here [https://www.connectionstrings.com/mysql/](https://www.connectionstrings.com/mysql/)
## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

### Build Production and Watch for Changes

```bash
yarn build:watch
```
