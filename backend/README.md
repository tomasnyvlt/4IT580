# 4IT580: Backend

## Requirements

- Node.js v12 (or later)
- Yarn (`npm install --global yarn`)

## Setup ENV Variables

Create `.env.local` file (DB user, password, ...)
```
JWT_SECRET= some random hash
REFRESH_SECRET= some random hase
PORT= port of the backend app
FRONTEND_URL= URL of frontend app
MAIL_HOST= some SMTP server
MAIL_USER= user for SMTP server
MAIL_PASSWORD= password for SMTP server
DATABASE_URL= connection string in this format "mysql://USER:PASSWORD@URL:PORT/DATABASE_NAME"
```
Database url should be in format like described here [https://www.connectionstrings.com/mysql/](https://www.connectionstrings.com/mysql/)

For database work it is need to have the same data in `.env` file aswell but for running the app it is not needed.
## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Build Production

```bash
yarn build
```

## Run Production

```bash
yarn start
```
