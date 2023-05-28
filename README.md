# Bootstrap Next Typescript

Uses a series of Node scripts to further bootstrap the default Create Next-App Typescript project.

## Quick Start

```
// Ensure you have yarn installed
npm i -g yarn

// Create a new Next Typescript App
yarn create next-app my-app --ts --tailwind --eslint --src-dir --app --import-alias "@/*"

// Follow the prompts, and select the defaults
// ...

// Clone this repository into the newly created project
cd my-app
git clone https://github.com/sh4nnongoh/bootstrap-next-typescript.git

// Run the scripts starting with 'setup.js'
node ./bootstrap-next-typescript/setup.js
...
```
---
## Why not use the Examples template?
NextJs provides a way to load an [Example](https://github.com/vercel/next.js/tree/canary/examples) through a Github URL.

However, the goal of this boostrap project is to simulate a usual workflow of pulling the latest packages and see them work with the latest official starter-project from NextJs. The Examples template requires stating specific versions of your packages in your ```package.json```, which does not reflect the actual developer experience when starting a new project.

The actual steps taken can be clearly seen in each of the Node scripts.

---
## Scripts
### ```setup.js```
Ensures that Airbnb ESLint is setup along with Husky & Lint-Staged to automate the Static Code Analysis process.

The Testing Framework with Jest is also configured in this script. As NextJs is a Full-Stack Web Framework. Different setups are needed for Frontend and Backend components.

### ```prisma-iron-session.js```
Every full-stack project requires dealing with a database of some sort, and Prisma has been the go-to ORM for many projects, due to the ease of Migrations.
However, it has been noted that the database client offered by Prisma is [not efficient](https://www.youtube.com/watch?v=J2j1XwZRi30). Hence, Kysely is introduced to fill in that gap. Kysely is a lightweight and type-safe SQL query builder.

When an application requires authentication, there is a need to handle sessions. Iron-Session provides an easy way to support stateless-sessions that also reduces the complexity of the backend dramatically.