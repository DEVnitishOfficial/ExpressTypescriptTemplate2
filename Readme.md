
# Setting up a Typescript Template Project

## Context before Starting a Typescript Template Project

* Typescript is based upon the javascript and javascript is versatile language which empowers a lot of different-different project and applications.

* Like web-client, mobile-client, servers (using nodejs), desktop applications (Electron framework), mobile apps (react-native) **But**,

* javascript is a loosely typed language, which gives us ease of programming. With ease of programming it gives some headache as well if we are developing a large application.

* Whenever we are writing code in pure js then we have to be vigilant enough so that we can be aware about what type of data is stored in a particular variable, because in js everything is decided on the runtime. To solve this problem strictly typed languages come into picture like C, C++, Java, Typescript.

* These strictly typed languages can identify error for us on runtime itself. Suppose if a variable is intended to store number and if we are storing string then on runtime it will give us compilation error.

* If we can write code in typescript then for us it will be very easy to move to Java, Go, and other strictly typed languages.

* Typescript is a strongly typed language and it's a superset of js, i.e. it has all the features of js and extra is type. Every variable and function have their type attached. With type our code becomes predictable.

* In large code bases when developers are contributing then if they don't have used type then it will become very cumbersome to find out the error. Suppose if a variable is storing number but you provide it string and because we don't have any type checking we also miss it. So later it becomes an error, when other developers are expecting the number but they got the string.

---

# Setting up Project

* Since Node.js is a JavaScript runtime environment and we want to use Typescript in our project, so in order to execute the Typescript we need `ts-node` which will internally convert the Typescript code to JavaScript on the fly, because at the end js code is executed with all type definitions.

> *Just-in-time (JIT) compilation is a method where code is translated into machine code during the execution of a program, rather than before.*----> this happens only when once our code is converted into bytecode.
---

## 1. Creating `package.json`

```bash
npm init -y       # starts a fresh package.json file
npm i express     # install express
```

## i. Dev Dependencies:

Dev dependencies (short for development dependencies) are packages that are only needed during the development and testing phases of a project, but not when the application is running in production. In production we need the js files or bundles, not the Typescript.

* ts-node is a TypeScript execution engine and REPL for Node.js.
* it convert ts code to js on the fly.

```bash
npm install -D ts-node              # installing ts-node as dev dependency
npm install -D @types/express       # provide type definition of express framework
```

* Since express is a JavaScript framework and written in JS, the types enable TypeScript to understand the structure of those libraries — including functions, objects, classes, etc. — and offer type checking, autocomplete, and intellisense.

  * Example: `req: Request`, `res: Response`, `next: NextFunction`, etc.

```bash
npm install -D @types/node          # This provides type definitions for Node.js built-in modules like Buffer, Process, setTimeout, clearInterval.
```

* NodeJS namespace for internal types

```bash
npm install -D nodemon              # Automatically re-start the server when file changes in the directory are detected
```

* Node.js natively supports also `node --watch index.js`

---

## Configuring Typescript

The meaning of configuring the Typescript is that how Typescript should behave and what settings we want to enable. Like if any type issue comes do you want to show them or not while compiling the ts code to js. So whenever Typescript compiler runs it will run using that config file.

```bash
npm install typescript              # Typescript available as a package so we can install it easily
npx tsc --init                      # it will create a tsconfig.json file with all the configuration, which we can modify according to our need or specific requirement
```

* `tsconfig` file will tell the Typescript compiler what options they have to use while compiling the Typescript code to JS.

---

## Edit `tsconfig.json` File

In the `tsconfig` file we have added two extra properties which tell Typescript compiler which files you have to compile or which ones should be excluded.

```json
"include": [
  "./src/**/*" // it says whatever files are present in src compile all those files
],
"exclude": [
  "node_modules" // tsc says don't compile the node_modules because it's an external module and doesn't lie in our business logic
],
"outDir": "./dist" // The outDir option specifies the directory where the compiled JavaScript files (and related .js.map and .d.ts files) will be placed
```

* `npx`: If a package is configured to run directly in terminal then using `npx` we can run that package in terminal.

---

# Setting up Server

Created a file `Server.ts` in `src` folder.

* How to run it:

```bash
cd src
npx ts-node server.ts
```

* When you run this command, the Typescript on the fly converts this Typescript code to JS and executes, and we don't have to manually convert this Typescript code to JavaScript.

* If you run:

```bash
npx tsc
```

* Then it will create a compiled JS file in the `dist` folder, with type checking. And again if you run:

```bash
node dist/Server.js
```

* Then similar to previous one it will start server on port 3000.

---

# ⚙️ Writing the Config Layer

## 📦 Storing Sensitive Configuration with Environment Variables

When building a **scalable backend project**, especially one meant for **production**, we often deal with sensitive and environment-specific configuration information. This includes:

* Server ports
* Database URLs and credentials
* API keys and secrets
* Redis configurations
* Email credentials

Revealing such information publicly can lead to serious **security vulnerabilities**.

To address this, we use **environment variables**, often defined in a `.env` file that is **not committed to version control**.

---

## 🌍 What is an Environment Variable?

Environment variables are **key-value pairs** stored at the **operating system (OS)** level. They are accessible by any process or application running on your machine.

### ✅ Key Characteristics:

* Accessible by all processes during runtime.
* Used to configure application behavior **without changing code**.
* Commonly used to store **secure and configurable data**.
* Can be system-wide or user-specific.

---

## 📌 Viewing Environment Variables

### On Windows (CMD):

```cmd
set
```

### On macOS/Linux:

```bash
env
```

These commands will list all available environment variables in your current shell session.

---

## ✍️ Setting Environment Variables

### On macOS/Linux (temporary):

```bash
export SERVER_NAME="DEV_SERVER"
```

### On Windows CMD (temporary):

```cmd
set SERVER_NAME=DEV_SERVER
```

### 🔴 Problem:

Temporary variables **only persist in the current terminal session**. They are not shared between different terminal tabs or after reboot.

---

## ✅ Persistent Environment Variables

### 🔧 macOS/Linux:

Add the export line to your shell profile file:

* `.bashrc`, `.zshrc`, `.bash_profile`, etc.

Example:

```bash
export SERVER_NAME="DEV_SERVER"
```

### 🪟 Windows:

Use `setx` for permanent environment variables:

```cmd
setx SERVER_NAME "DEV_SERVER"
```

> Note: You need to **restart CMD** to see the updated variable.

Alternatively, use the **System Properties GUI**:

1. Search: *"Edit the system environment variables"*
2. Go to **Environment Variables**
3. Add new **User** or **System** variable

---

## 🚫 Why Not Use System-Level Env Vars in Production?

Managing environment variables manually across multiple servers or containers in microservices architecture is:

* ❌ Error-prone
* ❌ Time-consuming
* ❌ Not scalable

---

## ✅ Solution: Use `dotenv` in Node.js

The [`dotenv`](https://www.npmjs.com/package/dotenv) package allows you to load environment variables from a `.env` file into `process.env`.

### 🛠 Steps to Use:

1. **Install dotenv**:

```bash
npm install dotenv
```

2. **Create `.env` file in the project root**:

```env
PORT=3002
REDIS_HOST=localhost
REDIS_PORT=6379
MAIL_USER=myemail@example.com
MAIL_PASS=securepassword
```

3. **Create `config/index.ts` file**:

```ts
import dotenv from "dotenv";

dotenv.config();

export const serverConfig = {
    PORT: Number(process.env.PORT) || 3002,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    MAIL_USER: process.env.MAIL_USER || '',
    MAIL_PASS: process.env.MAIL_PASS || ''
};
```

4. **Use in your code**:

```ts
import { serverConfig } from "./config";

const redisConfig = {
    host: serverConfig.REDIS_HOST,
    port: serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null, 
};
```

✅ Now you can access environment variables in a **structured and readable** way using `serverConfig`.

---

## 🔐 Extra Security with Azure Key Vault (Optional)

For production-grade applications, you can use **Azure Key Vault** or similar secret management tools (e.g., AWS Secrets Manager, HashiCorp Vault).

### 🔑 What is Azure Key Vault?

Azure Key Vault is a **cloud service** for securely storing and accessing:

* API keys
* Passwords
* Certificates
* Cryptographic keys

It offers:

* Centralized secret management
* Role-based access control
* Improved compliance and auditability

---

## ✅ Summary

| Method                                 | Scope             | Persistent | Recommended For       |
| -------------------------------------- | ----------------- | ---------- | --------------------- |
| `set` / `export`                       | Terminal Session  | ❌ No       | Quick local testing   |
| `.zshrc`, `.bashrc`                    | Shell Session     | ✅ Yes      | Developer environment |
| `setx`                                 | Windows Permanent | ✅ Yes      | Local machine setup   |
| `.env` with `dotenv`                   | App-specific      | ✅ Yes      | Node.js projects      |
| Secret Manager (e.g., Azure Key Vault) | Production        | ✅ Yes      | Enterprise/Cloud apps |

---

## 📁 Folder Structure Till Now.

```
/project-root
├── .env
├── src/
│   ├── config/
│   │   └── index.ts
│   └── server.ts
```
---

# 🧠 Separation of Concerns in Express.js

Modern server-side applications benefit greatly from clean code organization. One of the key principles to achieve this is **Separation of Concerns (SoC)**—where each part of your application has a clear, dedicated responsibility.

---

## 📁 1. Separating Controller Logic from `server.ts`

### ❌ Problem: Controller code inside `server.ts`

```ts
app.get('/', (req, res) => {
    res.send("Hi, I am the home page");
});
```

* This inline handler directly inside the server setup violates SOC(seperation of concern).
* It mixes routing,controller, business logic, and response handling all in one place.

---

### ✅ Solution: Move logic to a controller

Create a dedicated file: `controllers/ping.controller.ts`

```ts
import { Request, Response } from "express";

export const pingHandler = (req: Request, res: Response) => {
    res.send("Hi, I am the home page");
};
```

> **Why define types explicitly?**
> Since this is now a **standalone function**, TypeScript cannot infer `req` and `res` types like it does inside `app.get(...)`. Hence, we import and declare their types explicitly from `express`.

---

## 📁 2. Separating Router Logic from `server.ts`

### ❌ Problem: Routing handled directly inside `server.ts`

```ts
import { pingHandler } from './controllers/ping.controller';
app.get('/', pingHandler);
```

This ties the routing logic directly to the main application file.

---

### ✅ Solution 1: Basic Router Factory (Not Recommended for Scale)

```ts
// server.ts
import { createPingRouter } from './routers/ping.router';
createPingRouter(app);
```

```ts
// routers/ping.router.ts
import { Express } from "express";
import { pingHandler } from "../controllers/ping.controller";

export function createPingRouter(app: Express) {
    app.get('/', pingHandler);
}
```

While this works, it has serious **drawbacks**:

---

### ⚠️ Problems with This Approach

#### 1. **Global Side Effects**

* **Definition:** Function modifies the global `app` object.
* **Example:**

  ```ts
  createPingRouter(app);  // adds GET '/'
  createAnotherRouter(app);  // also adds GET '/'
  ```
* **Issue:** Any router can unintentionally override or duplicate routes.

---

#### 2. **Route Conflicts**

* **Definition:** Multiple routers may register the same path (`'/'`), leading to unpredictable behavior.
* **Example:**

  ```ts
  app.get('/', handlerA);  // from ping.router
  app.get('/', handlerB);  // from home.router
  ```
* **Issue:** Only the last route wins; earlier ones are ignored.

---

#### 3. **Tight Coupling**

* **Definition:** Route logic is tightly bound to the `app` instance.
* **Issue:** Hard to test routes in isolation.

  ```ts
  // Can't do this:
  test(pingRouter); // ❌ Not possible
  ```

---

#### 4. **Scalability Issues**

* **Definition:** As the app grows, registering all routes directly on `app` leads to poor maintainability.
* **Example:**

  ```ts
  // 20+ routers modifying app directly
  // Hard to track or debug
  ```

---

## 📁 3. ✅ Recommended: Using `express.Router()` for Clean Routing

### ✨ Modular Router Setup

```ts
// server.ts
import pingRouter from './routers/ping.router';
app.use('/ping', pingRouter);  // Mounts pingRouter at '/ping'
```

```ts
// routers/ping.router.ts
import express from 'express';
import { pingHandler } from '../controllers/ping.controller';

const pingRouter = express.Router();
pingRouter.get('/', pingHandler);  // Handles GET '/ping'

export default pingRouter;
```

---

### ✅ Advantages of This Approach

#### 1. **Modularity**

* Routers are self-contained units.
* Easy to understand, maintain, and scale.
* 📁 Example: `pingRouter` handles only `/ping`-related logic.

---

#### 2. **Avoids Global Side Effects**

* Routes don’t modify the `app` directly.
* Promotes safer, predictable behavior in teams or large codebases.

---

#### 3. **Better Route Organization**

* Group routes by domain (e.g., `authRouter`, `todoRouter`, etc.).
* Example:

  ```ts
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/ping', pingRouter);
  ```

---

#### 4. **Scalable and Testable**

* Routers can be tested independently without booting the entire app.

  ```ts
  test(pingRouter); // ✅ Possible now
  ```

---

## ✅ Summary: Best Practices

| Concern            | Poor Practice                        | Best Practice                      |
| ------------------ | ------------------------------------ | ---------------------------------- |
| Controller Logic   | Inline in `server.ts`                | Move to `controllers/`             |
| Routing Logic      | Direct `app.get(...)` in `server.ts` | Use `express.Router()`             |
| Route Registration | Modify `app` directly                | Use `app.use('/base', router)`     |
| Testing            | Hard to test                         | Routers are testable independently |
| Scaling            | Not maintainable                     | Clean modular structure            |


---

# 🧩 Setting Up Middleware in Express (with TypeScript)

### 📖 Reference:

Read more from the official Express documentation:
👉 [Using Middleware – Express Docs](https://expressjs.com/en/guide/using-middleware.html)

---

## ⚙️ What is Middleware?

**Express** is a routing and middleware-based web framework. It provides minimal functionality out of the box — the power comes from chaining multiple **middleware functions** together.

A **middleware function** in Express is simply a function that has access to:

* the **request object (`req`)**
* the **response object (`res`)**
* the **next middleware function (`next`)** in the request–response cycle.

### Middleware Functions Can:

* Execute any kind of logic or code.
* Modify the `req` or `res` objects.
* End the request–response cycle (by sending a response).
* Or, pass control to the next middleware using `next()`.

👉 **Important:**
If the current middleware doesn’t send a response or end the cycle, it **must call `next()`** — otherwise, the request will hang forever.

---

## 🧱 Types of Middleware in Express

1. **Application-level middleware** – bound to an instance of the `app` object.
2. **Router-level middleware** – bound to an instance of `express.Router()`.
3. **Error-handling middleware** – defined with four parameters `(err, req, res, next)`.
4. **Built-in middleware** – provided by Express itself (like `express.json()` or `express.static()`).
5. **Third-party middleware** – community packages like `cors`, `helmet`, or `morgan`.

---

## 💡 Use Case of Middleware

Middleware is often used for **Separation of Concerns (SoC)** — each middleware focuses on a single responsibility.

Example use case flow:

```
request 
   ↓
validateRequestBody
   ↓
validateAuthentication
   ↓
validateAuthorization
   ↓
operationController
```

### Example Scenario:

* 🧾 **Validate Request Body:** ensure the incoming data is clean and in the correct format.
* 🔐 **Authenticate User:** check whether the request contains a valid JWT token.
* 🧭 **Authorize User:** verify whether the authenticated user has permission to access a specific resource.
* ⚙️ **Call Controller:** once all checks pass, control moves to the route handler (controller) to perform the actual operation.

---

## 🔗 How Express Implements Middleware Internally

The middleware system in Express is inspired by the **“Chain of Responsibility”** design pattern.

This pattern allows a request to pass through a series of handlers (middleware functions).
Each middleware decides either to:

* Handle the request completely, or
* Pass it along to the next function in the chain by calling `next()`.

This pattern makes Express flexible, modular, and easy to extend — because each piece of functionality can be separated into its own middleware layer.

---

## 🧰 The `app.use()` Middleware

`app.use()` is used to **mount middleware** functions at the application level.

It applies to **all routes** that come **after it** in the middleware stack.

### Example:

```ts
import express, { Express } from 'express';
import { genericErrorHandler, attachCorrelationIdMiddleware } from './middlewares';

const app: Express = express();

// Parse JSON body for all incoming requests
app.use(express.json());

// Attach a unique ID to each request for tracing
app.use(attachCorrelationIdMiddleware);

// Handle errors globally
app.use(genericErrorHandler);
```

So whenever any request comes in, it first passes through these global middlewares before reaching any specific route.

---

## 🧭 API Versioning in Express

**API Versioning** allows you to maintain multiple versions of your API (for example `/api/v1` and `/api/v2`) without breaking old clients when introducing new features or changes.

You can implement versioning easily using `app.use()`:

```ts
import express, { Express } from 'express';
import v1Router from './routes/v1';
import v2Router from './routes/v2';

const app: Express = express();

// Versioned routing
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

---

### 📦 Inside the `v1` Router

You can create a router for version 1 using `express.Router()`:

```ts
import express from 'express';
import { pingHandler } from '../../controllers/pingController';

const pingRouter = express.Router();

// Define route
pingRouter.get('/', pingHandler);

export default pingRouter;
```

---

### 🧠 The Route Handler (Controller)

A simple route handler (controller) might look like this:

```ts
import { Request, Response } from 'express';

export const pingHandler = (req: Request, res: Response) => {
  res.send("Hi, I am the home page!");
};
```

This function gets executed once all preceding middlewares (like authentication, validation, etc.) have successfully passed control using `next()`.

---

## 🏁 Summary

| Concept                 | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| **Middleware**          | Functions that process requests before reaching the controller |
| **`next()`**            | Passes control to the next middleware in the chain             |
| **`app.use()`**         | Mounts global middleware or routes                             |
| **API Versioning**      | Organizes routes by version (v1, v2, etc.)                     |
| **Design Pattern Used** | Chain of Responsibility                                        |

---


## Hot reloading by using the nodemon(like the react ones)
### add script and run from the root directory then it will load the .env variable otherwise you will get undefined wherever you are loading env variable
```js
"start": "ts-node src/server.ts",
"dev": "nodemon src/server.ts",
```
