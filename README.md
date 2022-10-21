![alt text](https://github.com/knowankit/fullstack-monorepo-boilerplate/blob/develop/banner.png)

<p align="center">
  <a href="https://twitter.com/knowankit">
    <img alt="Twitter: Ankit Kumar" src="https://img.shields.io/twitter/follow/knowankit.svg?style=social" target="_blank" />
  </a>
</p>

## Overview

This monorepo is built using [Nx](https://nx.dev/), [NestJS](https://docs.nestjs.com/), [GraphQL](https://graphql.org/), [MongoDB](https://www.mongodb.com/), [ReactJS](https://reactjs.org/) with other libraries like [Formik](https://formik.org/), [MaterialUI](https://mui.com/). 

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)
3. [Nx](https://nx.dev/)

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/knowankit/fullstack-monorepo-boilerplate
```
### 3. **Bootstrap the packages**

From the project root, we can run the following command to bootstrap the packages and install all their dependencies and linking any cross-dependencies:

```sh
npm install
```

### Database 

This app uses mongoDB, so please make sure you have monogoDB server and to access the data you can use MongoDB Compass. Once you have these tools, you should create a database called `todo` (this is what I have given in the grapQL code, you can change it anytime).

### 4. **Start the packages**

From the project root, we can run the following command to start our Node.js packages:

```sh
npm run dev
```

The above command will do the following:

    1. Starts the front-end package on `http://localhost:4200/`
    2. Starts the backend graphQL server on `http://localhost:5000/graphql`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

