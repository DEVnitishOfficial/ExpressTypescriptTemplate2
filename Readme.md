
# Setting up a Typescript Template Project
* understand typescript from here : https://howtodoinjava.com/typescript/difference-between-interface-and-class/

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

---

# 🔄 Serialization and Deserialization in Express.js

When we build APIs, data can be sent from the **client (frontend or Postman)** to the **server (backend)** in different ways. In Express, we usually handle data in three main forms:

---

## 📬 1. Sending Data to the Backend

### i. **Query Parameters and URL Parameters**

Example:

```
http://localhost:3000/users/456/orders/B-99?status=completed&limit=10
```

* **URL Parameters:** `456` and `B-99`
* **Query Parameters:** `status=completed` and `limit=10`

| Parameter Type | Example                          | Description                                   |
| -------------- | -------------------------------- | --------------------------------------------- |
| URL Params     | `/users/:userId/orders/:orderId` | Used to identify a specific resource          |
| Query Params   | `?status=completed&limit=10`     | Used for filtering, sorting, pagination, etc. |

---

### ii. **Request Body (req.body)**

The body is commonly used in **POST**, **PUT**, and **PATCH** requests to send structured data such as JSON, form data, etc.

Example:

```json
{
  "items_updated": 2,
  "total_cost": 45.50,
  "shipping_address": {
    "street": "123 Dev Lane",
    "city": "Codeville"
  }
}
```

---

## 💡 How to Receive Client Data in Express

Let’s say we send this request from Postman to:

```
POST http://localhost:3015/api/v1/ping/
```

Body:

```json
{
  "name": "nitish",
  "company": "google"
}
```

Handler:

```ts
import { Request, Response } from "express";

export const pingHandler = (req: Request, res: Response) => {
  console.log('my request body:', req.body);
  res.send("Pong");
};
```

If you see the console output as:

```
my request body: undefined
```

---

## ❓ Why is `req.body` Undefined?

By default, Express **does not automatically know how to parse incoming request bodies**.
The body can arrive in different formats — JSON, plain text, form-data, XML, etc.
Unlike query params (which are always strings), `req.body` can have **different content types**, so Express doesn’t assume one by default.

### 🧩 Why Express Doesn’t Parse Automatically

Because Express is designed to be:

> “**Fast, unopinionated, minimalist web framework for Node.js**”

Here, **unopinionated** means Express doesn’t force you to use a specific way of handling data.
You decide how to parse the incoming data using appropriate middleware.

---

## 🧠 The Solution — Tell Express How to Parse Data

You need to **register middleware** that tells Express what type of incoming data to expect and how to parse it.

### For JSON data:

```ts
app.use(express.json());
```

This parses incoming requests with `Content-Type: application/json`.

### For URL-encoded data (like HTML form submissions):

```ts
app.use(express.urlencoded({ extended: true }));
```

---

## 🔍 What Happens Behind the Scenes (Serialization & Deserialization)

When data travels from the client to the server:

1. It’s converted into **bytes** (serialized) to send over the network.
2. On the server side, those bytes are **converted back into JavaScript objects** (deserialized).

This process of encoding (serialization) and decoding (deserialization) is handled internally by Express (through the middlewares like `express.json()`).

In other languages like **Go**, you often need to perform this process manually.

---

## 🧾 How Express Detects Data Format

Express determines how to parse the incoming body based on the **HTTP headers**, specifically the `Content-Type` header.

Example (from Postman):

```
Content-Type: application/json
```

When Express sees this header, it knows to parse the body using the JSON parser.

---

## 🔡 What is URL Encoding?

The browser’s address bar doesn’t support all characters directly (for example: spaces, slashes, or special symbols).
So, when such characters appear in URLs, they are automatically **encoded**.

Example of a URL from Flipkart:

```
https://www.flipkart.com/...&fm=productRecommendation%2FcrossSelling&iid=R%3Ac%3Bp%3AMOB...
```

Here, some characters are URL-encoded:

| Symbol | Encoded |
| ------ | ------- |
| `+`    | `%2B`   |
| `/`    | `%2F`   |
| `:`    | `%3A`   |
| `-`    | `%2D`   |
| `,`    | `%2C`   |

To parse these kinds of encoded values, we use:

```ts
app.use(express.urlencoded({ extended: true }));
```

This ensures Express decodes URL-encoded data back into readable key–value pairs.

---

## 🧭 Reading URL and Query Parameters in Express

### 1️⃣ URL Parameters

To tell Express which part of the URL is dynamic, you define a route like:

```ts
pingRouter.get('/:id', pingHandler);
```

Now, if you hit:

```
GET http://localhost:3015/api/v1/ping/30?name=nitish
```

You can log the parameters:

```ts
console.log('url params', req.params);
```

Output:

```
url params [Object: null prototype] { id: '30' }
```

---

### 2️⃣ Query Parameters

If you send a request like:

```
GET http://localhost:3015/api/v1/ping?age=22&city=noida
```

You can log them using:

```ts
console.log('query params', req.query);
```

Output:

```
query params [Object: null prototype] { age: '22', city: 'noida' }
```

---

### 💬 Why Query Params Work Without Any Extra Setup

Query parameters always come as **strings** (plain text) in the URL itself.
Express can easily parse them from the URL because it knows they’ll always follow the pattern:

```
?key=value&key=value
```

So even without a middleware, Express can automatically extract and parse them for you.

---

## 🏁 Summary

| Data Type        | Example                | Middleware Needed        | Notes                        |
| ---------------- | ---------------------- | ------------------------ | ---------------------------- |
| **Query Params** | `/ping?age=22`         | ❌ No                     | Always string type           |
| **URL Params**   | `/ping/:id`            | ❌ No                     | Extracted using `req.params` |
| **JSON Body**    | `{ "name": "Nitish" }` | ✅ `express.json()`       | Parses JSON payloads         |
| **URL Encoded**  | `name=Nitish&age=22`   | ✅ `express.urlencoded()` | Parses form data             |

---

### 🧠 In Short:

* **Serialization** → Converting data (object) into bytes for network transfer.
* **Deserialization** → Converting bytes back into usable JavaScript objects.
* Express handles both automatically when you use the correct body-parsing middleware.
* The format of data is identified via the **`Content-Type` header**.
* Query params and URL params are always strings and parsed automatically.

---

# Problems of rest api
* rest is a architectural pattern and restful is the implementation of that architecture.

* The main problem of restful api is the json because in the json there is no type safety, there is no inherent way to be type safe.

* in json we can send any data types suppose if backend expect name of user like({ "name":"nitish"}) so here if i send 1234 instead of nitish or false it's all ok there is no problem at all for the json but it's concerning because the backend exprect string but we are sending then number or boolean.

* since here there is no type so we can't enfore any contract.

* to solve this problem we have to write an middleware which will parse and validate the incoming request from the client.

## Manual request validation 

* suppose we have to manully valide the coming request then how we will validte, in the following we ay we will validate it, suppose i want the request body must be the string but the coming reqest is number the we should invalidate it.

```ts
 function checkHandler(req:express.Request,res:express.Response,next:express.NextFunction):void {
    if(typeof req.body.name !== 'string'){
       res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
    next()
    }
 pingRouter.get('/', checkHandler, pingHandler)
```
* currently i am doing the manual validation but it will become cumersome when there will the nested object coming in the response, that's where comes into the picture of request validation liberary, and these liberary is made in a way that it fit's into the middleware arctitecture and it can check the complex incoming request body.

* one of the famous liberary that is used with typescript is zod liberary it can also implemented with the javascript as well but it's made for typescript first.

---

# ✅ Integrating Zod for Request Validation in Express + TypeScript

---

## 🧩 1. Installation

Install Zod via npm or yarn:

```bash
npm i zod
```

Zod helps you **validate and type-safe your data** in both runtime and compile time.

---

## 🧠 2. What is Zod?

Zod works on the concept of **schemas** — these schemas define the **expected shape and type** of data (for example, a request body, query parameters, or any other object).

It’s not limited to Express or request validation — Zod can validate **any JavaScript object**.

In simple words:

> Zod lets you describe what you expect your data to look like, and then checks whether the actual data matches those expectations.

If it matches → ✅ passes
If not → ❌ throws a `ZodError` with detailed information about what went wrong.

---

## 📘 3. Example – Defining a Schema

```ts
import { z } from "zod";

// Define a schema for a user object
const userSchema = z.object({
  id: z.string().uuid(), // String representing a UUID
  name: z.string().min(2).max(50), // String with min & max length
  email: z.string().email(), // Must be a valid email
  age: z.number().int().positive().optional(), // Optional positive integer
  roles: z.array(z.enum(["admin", "editor", "viewer"])), // Array of allowed strings
  createdAt: z.date(), // Must be a valid Date object
});

// Infer the TypeScript type from the schema
type User = z.infer<typeof userSchema>;
```

Here:

* The schema acts as the **blueprint** for your expected data.
* The inferred type (`User`) automatically syncs with your validation rules.

---

## ⚡ 4. Quick Demo of Zod Validation

### ✅ When the data **matches** the schema:

```ts
import { z } from "zod";

const obj = {
  name: "nitish",
  age: 22,
};

const objSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
});

console.log(objSchema.parse(obj));
```

**Output:**

```bash
{ name: 'nitish', age: 22 }
```

---

### ❌ When the data **does not match** the schema:

```ts
const obj = { name: "nitish", age: -22 };
objSchema.parse(obj);
```

**Error:**

```json
[
  {
    "code": "too_small",
    "minimum": 0,
    "inclusive": false,
    "path": ["age"],
    "message": "Number must be greater than 0"
  }
]
```

Zod provides a very descriptive error, making debugging easy.

---

## 🧰 5. Using Zod for API Request Validation

In a real Express application, each endpoint may have different request shapes — e.g.:

* `createUserSchema`
* `updateUserSchema`
* `createPostSchema`
* etc.

We can use **middleware** to validate these automatically before hitting the controller logic.

---

### 🧱 Step 1: Create a Middleware

```ts
import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

// Generic middleware that validates req.body
export const validateRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body); // asynchronous validation
      next(); // only continue if validation passed
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid request schema",
        error: error,
      });
    }
  };
};
```

### ✅ Explanation

| Concept        | Meaning                                                                         |
| -------------- | ------------------------------------------------------------------------------- |
| `AnyZodObject` | Ensures the function only accepts a Zod schema object.                          |
| `parseAsync()` | Validates the data asynchronously and throws an error if invalid.               |
| Middleware     | Runs before the route handler — if validation fails, the handler won’t execute. |

---

### 🧱 Step 2: Define a Schema for a Route

```ts
// pingSchema.ts
import { z } from "zod";

export const pingSchema = z.object({
  message: z.string().min(1),
});
```

---

### 🧱 Step 3: Use the Middleware in Your Route

```ts
// ping.routes.ts
import express from "express";
import { pingSchema } from "./pingSchema";
import { validateRequestBody } from "../middlewares/validateRequestBody";
import { pingHandler } from "../controllers/pingController";

const pingRouter = express.Router();

pingRouter.post("/", validateRequestBody(pingSchema), pingHandler);

export default pingRouter;
```

---

### 🧩 Controller Example

```ts
import { Request, Response } from "express";

export const pingHandler = (req: Request, res: Response) => {
  console.log("Validated request body:", req.body);
  res.status(200).send("Pong!");
};
```

---

## 🧠 6. Why Use Middleware for Validation?

✅ **Centralized logic** – no need to repeat `schema.parse()` in every controller.
✅ **Scalable** – each route can have its own schema.
✅ **Clean separation of concerns** – validation handled before business logic.
✅ **Strong TypeScript support** – helps prevent type mismatch bugs.

---

## ⚙️ 7. Optional Improvements

* **Validate query params or URL params**:
  You can extend your middleware to also parse `req.query` or `req.params`.

  Example:

  ```ts
  await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
  ```

* **Global error formatting**:
  Instead of sending raw ZodError, you can use `error.errors` to return a cleaner response.

* **Combine schemas**:

  ```ts
  const fullSchema = z.object({
    body: pingSchema,
    query: z.object({ limit: z.number().optional() }),
  });
  ```

---

## ✅ Summary

| Concept                            | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| **Schema**                         | Defines structure and validation rules for data.        |
| **parse / parseAsync**             | Validates data and throws error if invalid.             |
| **validateRequestBody middleware** | Reusable function to validate incoming `req.body`.      |
| **Error handling**                 | Returns meaningful error message when validation fails. |
| **Type inference**                 | Automatically generates TypeScript types from schema.   |

---

### 🧩 TL;DR

> Zod provides a **type-safe validation layer** that ensures your Express API only processes valid data.
> With a simple reusable middleware and modular schemas, you can keep your controllers clean, predictable, and safe.

---

* whenever you write any middleware like 
```ts 
pingRouter.get('/',validateRequestBody(pingSchema), pingHandler)
```
* make sure you don't use the return keyword before response, because in typescript express expect that for any particualr routes if you are using any kind of middleware that must be return void but we are returning res using the return keyword that's why we are getting an error:
```ts
 export const validateRequestBody = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=> { 
        try{
            await schema.parseAsync(req.body)
        }catch(error){
            return res.status(400).json({  // don't use return
            success:false,
            message: "invalid schema",
            error:error
           })
        }
        next();
    }
}
```
* actually there may be multiple middleware function which will update the res object so we don't have to return just update the res object.



# 🧠 Error Handling in Express (with TypeScript)

> 📚 Official docs: [Express Error Handling Guide](https://expressjs.com/en/guide/error-handling.html)

---

## 🔹 Overview

Express provides a **default error handler**, so for most synchronous errors, you don’t need to write custom logic to get started.
However, when dealing with **asynchronous operations** (like file system calls or database queries), you must handle errors properly to prevent your server from crashing.

---

## ⚙️ 1. Synchronous Error Handling

For synchronous code (code that runs top to bottom), Express automatically catches thrown errors.

### Example:

```ts
export const pingHandler = (req: Request, res: Response) => {
  throw new Error("This is a synchronous error");
};
```

🧩 **Result in Postman (HTML formatted error page):**

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Error</title></head>
<body>
  <pre>Error: This is a synchronous error handler<br> ...stack trace...</pre>
</body>
</html>
```

✅ Express’s **default error handler** catches this and keeps your server running.

---

## ⚙️ 2. Asynchronous Error Handling

If you throw errors inside asynchronous functions (like `fs.readFile()`), Express **will not** catch them automatically.

### Example (❌ Server will crash):

```ts
import { Request, Response } from "express";
import fs from "fs";

export const pingHandler = (req: Request, res: Response) => {
  fs.readFile("sample", (err, data) => {
    if (err) {
      throw new Error("Error while reading the file"); // ❌ Not caught by Express
    }
    console.log("File read successfully");
  });
};
```

➡️ The above code crashes the server because Express does not handle asynchronous `throw` statements.

---

### ❌ Try-Catch also won’t work here

```ts
export const pingHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    fs.readFile("sample", (err, data) => {
      if (err) {
        throw new Error("Got error while reading the file"); // ❌ Still async
      }
    });
  } catch (error) {
    // This block will never run
    res.status(500).json({ success: false, message: "Unable to read sample file" });
  }
};
```

Try-catch doesn’t work for async callbacks because the error happens **after** the function has already returned.

Your intuition is **correct**. The main reason the `throw new Error()` inside the `fs.readFile` callback doesn't get caught by the **outer** `try...catch` block is exactly that: the `pingHandler` function has finished executing and has been **removed from the call stack** long before the callback is invoked.

---

## 🧐 Why the `throw new Error()` is Missed

Detailed breakdown, emphasizing the **asynchronous nature** of the operation and the **call stack**:

### 1. The Call Stack during Initial Execution
When an HTTP request hits the endpoint, the `pingHandler` function starts executing:

1.  The Node.js **Call Stack** receives the `pingHandler` execution context.
2.  Execution enters the `try` block.
3.  `fs.readFile()` is called. This is an **asynchronous I/O operation**. It immediately delegates the file reading task to the Node.js C++ core and the underlying operating system.
4.  `fs.readFile()` then **registers the callback function** `(err, data) => { ... }` to be run *later* when the file operation completes (or fails).
5.  **Crucially**, `fs.readFile()` returns **immediately** (it doesn't wait).
6.  The `try` block finishes without any **synchronous** error.
7.  The entire `pingHandler` function completes. Its execution context is **popped off the Call Stack**.

### 2. The Error Happens Later (Async Context)
Sometime later (milliseconds or seconds), the file operation fails:

1.  The registered callback function `(err, data) => { ... }` is moved from the **Event Queue** to the **Call Stack** to be executed. **This is a new, separate execution context.**
2.  Inside this **new execution context**, the condition `if (err)` is true.
3.  The line `throw new Error("Got error while reading the file");` is executed.
4.  The JavaScript engine looks up the Call Stack for a surrounding `try...catch` block that can handle this error.

### 3. The Catch Block is Gone
* The original `try...catch` block in `pingHandler` only exists within the **original execution context** of `pingHandler`.
* Since the `pingHandler` context is long gone (popped off the stack), the throw finds **no handler** on the current Call Stack.
* This results in an **unhandled exception** (or unhandled rejection if it were a Promise), which will typically crash the Node.js process unless a global error handler is in place (like a domain or an `uncaughtException` listener).

**In short:** A `try...catch` block can only catch errors that happen **synchronously** within its own execution context. It cannot "reach out" into the future to catch errors thrown in a completely separate, asynchronous callback execution.

---

## ✅ Correct Way: Using `next(err)`

Express provides a special function `next()` to pass errors to its built-in error handler.

```ts
export const pingHandler = (req: Request, res: Response, next: NextFunction) => {
  fs.readFile("sample", (err, data) => {
    if (err) {
      next(err); // ✅ Pass error to Express default error middleware
    }
    console.log("File read successfully");
  });
};
```

Now, your server won’t crash, and Express will display a formatted HTML error page again.

---

## 🧩 Understanding the Middleware Chain

Express middleware runs **in sequence** like this:

```
middleware1 → middleware2 → ... → routeHandler → defaultErrorHandler
```

If any middleware calls `next(err)`, Express **skips all remaining middleware** and forwards the error to the error-handling middleware (either your custom one or Express’s default one).

---

## ⚙️ 3. Custom JSON Error Handling

In production, you don’t want to send HTML error pages — instead, you send clean JSON responses.

### Example with async/await and try-catch:

```ts
import fs from "fs/promises";

export const pingHandler = async (req: Request, res: Response) => {
  try {
    await fs.readFile("sample");
    res.status(200).json({ success: true, message: "File read successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to read file" });
  }
};
```

🧾 **Postman Output:**

```json
{
  "success": false,
  "message": "Unable to read file"
}
```
**How this works**
* The await keyword does not block the entire Node.js process. It only pauses the execution of the specific async function that it is inside, and then allows the Node.js event loop to continue running other tasks. 

Let's break down the process:

* await encounters a promise: When the JavaScript engine reaches a line with await, it sees that the function on the right side of the keyword returns a Promise.

* The function is suspended: The execution of the current async function is paused. The JavaScript engine doesn't idle; it hands control back to the Node.js event loop.

* The event loop works on other tasks: With the original async function temporarily out of the way, the event loop is free to handle other incoming requests, process other timers, or respond to other events in your application. This is what makes Node.js non-blocking.

* The promise resolves: Once the asynchronous operation (like reading the file) is complete, the associated Promise is resolved or rejected. The event loop is notified of this completion.

* The function resumes: The async function is then placed back on the execution queue to resume from where it was paused. The code execution continues from the line right after await.
---

## 🚀 Express 5.x Update

> Starting with Express v5, any **async route handler or middleware** that returns a rejected Promise will **automatically call `next(err)`**.

So even if you **don’t call `next(error)` manually**, Express will handle it.

---

## ⚙️ 4. Centralized Error Handler (Recommended)

You can define a **global error-handling middleware** that overrides Express’s default HTML handler.

### 📄 `middlewares/error.middleware.ts`

```ts
import { NextFunction, Request, Response } from "express";

export const genericErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error from generic handler:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};
```

### 📄 `server.ts`

```ts
const app: Express = express();

app.use(express.json());
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// ✅ Register generic error handler at the end
app.use(genericErrorHandler);
```

### Example Route:

```ts
export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fs.readFile("sample");
    res.status(200).json({ success: true, message: "File read successfully" });
  } catch (error) {
    next(error); // ✅ Send error to global handler
  }
};
```

Now, errors are shown in JSON format instead of HTML.

---

## ⚙️ 5. Custom Error Classes (for Clean Error Management)

For production systems, define **custom error types** for better clarity.

### 📄 `utils/errors/app.error.ts`

```ts
export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string) {
    this.statusCode = 500;
    this.name = "InternalServerError";
    this.message = message;
  }
}

export class NotFoundError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string) {
    this.statusCode = 404;
    this.name = "NotFoundError";
    this.message = message;
  }
}
```

### Usage:

```ts
import fs from "fs/promises";
import { NotFoundError } from "../utils/errors/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fs.readFile("sample");
    res.status(200).json({ success: true, message: "File read successfully" });
  } catch (error) {
    throw new NotFoundError("File not found!");
  }
};
```

### Postman Output:

```json
{
  "success": false,
  "message": "File not found!",
  "stack": "NotFoundError: File not found! ..."
}
```

---

## ✅ Summary

| Type                              | Example                 | Handling Method                                        |
| --------------------------------- | ----------------------- | ------------------------------------------------------ |
| **Synchronous error**             | `throw new Error()`     | Express handles automatically                          |
| **Asynchronous error (callback)** | `fs.readFile()`         | Use `next(err)`                                        |
| **Async/Await**                   | `await fs.readFile()`   | Use `try/catch` or let Express v5 handle automatically |
| **Production-grade**              | Custom error middleware | JSON error responses                                   |
| **Custom Errors**                 | Extend `Error` class    | Return cleaner messages & status codes                 |

---

## 💡 Best Practices

1. Always place your **error-handling middleware last**.
2. Use **custom error classes** for readability.
3. Never let the server crash — always handle async errors.
4. Use Express v5+ for **built-in async error catching**.
5. Hide stack traces in production (don’t leak internals).

---


# 🧩 Understanding Inheritance & Polymorphism While Defining Custom Error Classes in TypeScript

When defining custom `Error` classes in **TypeScript**, it’s important to understand **inheritance**, **interfaces**, and **polymorphism**, because these OOP principles directly impact how reusable, extendable, and type-safe your code will be.

---

## 1. ⚙️ Why We Don’t Use `type` for OOP

In TypeScript, the `type` keyword is used to define the **shape of data** (objects, primitives, unions, intersections), but **it doesn’t support inheritance or object-oriented programming (OOP)** features like `extends` or `implements`.

So, while you can do:

```ts
type AppError = {
  message: string;
  statusCode: number;
};
```

You **cannot** extend this `type` from another class or interface. Hence, `type` is great for structural typing, but not for OOP.

---

## 2. 🧠 Using `interface` for OOP in TypeScript

Unlike `type`, **interfaces** can:

* Define the **shape** of an object (like `type`)
* **Extend** other interfaces or **implement** them in classes
* Act as a **contract** that enforces consistency across implementations

Example:

```ts
interface AppError extends Error {
  statusCode: number;
}
```

Here, `AppError` extends the built-in `Error` interface and adds one more property — `statusCode`.
Now, any class implementing this interface must include `statusCode`.

---

## 3. 🌟 Benefits of Using Interfaces

1. **Type safety:** Ensures every implementing class follows a specific structure.
2. **Reusability:** Multiple classes can implement the same interface.
3. **Extensibility:** Interfaces can extend one another.
4. **Contract enforcement:** Guarantees that required methods and properties exist.
5. **Polymorphism:** Enables writing flexible functions that accept many class types with the same interface.

---

## 4. 🐶 Interface Example with Inheritance

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

✅ The above works fine with interfaces — but **not possible with `type`** since `type` can’t use `extends`.

---

## 5. 🧾 Interface as a Contract

An interface can act as a **contract** that a class must follow.

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(h: number, m: number) {}

  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

If `Clock` didn’t define `currentTime` or `setTime`, TypeScript would throw a compile-time error.
That’s what “contract enforcement” means.

---

## 6. 💳 Polymorphism Example with Interfaces

**Polymorphism** means one interface or function can operate on multiple implementations.
For example:

```ts
interface CreditCard {
  pay(): void;
}

class VisaCard implements CreditCard {
  pay() {
    console.log("Payment made via Visa");
  }
}

class RupayCard implements CreditCard {
  pay() {
    console.log("Payment made via Rupay");
  }
}

class MasterCard implements CreditCard {
  pay() {
    console.log("Payment made via MasterCard");
  }
}

function processPayment(card: CreditCard) {
  card.pay();
}

processPayment(new VisaCard());
processPayment(new RupayCard());
processPayment(new MasterCard());
```

🔹 Even though each card class behaves differently, the function `processPayment()` can handle them all — that’s polymorphism.

---

## 7. 🧭 Same Example Using Classes and Inheritance

```ts
class PaymentGateway {
  processPayment(amount: number) {
    console.log("Processing payment...");
  }
}

class Paytm extends PaymentGateway {
  processPayment(amount: number) {
    console.log(`Processing ₹${amount} with Paytm`);
  }
}

class Razorpay extends PaymentGateway {
  processPayment(amount: number) {
    console.log(`Processing ₹${amount} with Razorpay`);
  }
}

function makePayment(gateway: PaymentGateway, amount: number) {
  gateway.processPayment(amount);
}

makePayment(new Paytm(), 500);
makePayment(new Razorpay(), 1000);
```

Here, `Paytm` and `Razorpay` both **inherit** from the base class `PaymentGateway`.
At runtime, the right method is called — another example of polymorphism.

---

## 8. ⚠️ Why Not Use Classes for Everything?

In OOP, we often want to **model real-world entities**.
But classes like `CreditCard` or `PaymentGateway` don’t exist as standalone things in reality — there are always specific types (Visa, Rupay, Razorpay, etc.).

If we use:

```ts
class CreditCard {}
const c = new CreditCard(); // ❌ Doesn't make sense
```

We’re creating something meaningless — “a credit card” without a provider.

➡️ **Interfaces solve this** by acting as abstract contracts — you can’t “instantiate” an interface, only “implement” it in specific, real classes.

---

## 9. 💡 Multiple Inheritance Problem

TypeScript (like JavaScript) **does not support multiple inheritance** — a class can only `extend` **one** other class.

Example:

```ts
class UpiEnabledCC {
  payViaUpi() {}
}

class IntlPaymentCC {
  payViaIntl() {}
}

// ❌ Not allowed:
class Visa extends UpiEnabledCC, IntlPaymentCC {}
```

But in real life, Visa might support both **UPI** and **International** transactions.
How do we solve this?

---

## 10. ✅ Solution — Using Interfaces for Multiple Behavior Types

```ts
interface UPICC {
  payViaUpi(): void;
}

interface IntlCC {
  payViaIntl(): void;
}

interface EMICC {
  payViaEmi(): void;
}

class Visa implements UPICC, IntlCC {
  payViaUpi() {
    console.log("Paid using UPI through Visa");
  }

  payViaIntl() {
    console.log("Paid internationally using Visa");
  }
}

class Rupay implements UPICC, EMICC {
  payViaUpi() {
    console.log("Paid via UPI using Rupay");
  }

  payViaEmi() {
    console.log("Paid via EMI using Rupay");
  }
}
```

✅ Here, Visa implements **two** interfaces, and Rupay implements **two others** —
**achieving multiple-type behavior** (which inheritance alone can’t provide).

This is the power of **polymorphism through interfaces**.

---

## 11. 🧩 Final Takeaway — Why Interface Is Better in Complex Scenarios

| Feature                                  | Class            | Interface              |
| ---------------------------------------- | ---------------- | ---------------------- |
| Can define shape (structure)             | ✅                | ✅                      |
| Supports inheritance (`extends`)         | ✅ (single)       | ✅ (multiple)           |
| Multiple behavior support                | ❌                | ✅                      |
| Can instantiate directly                 | ✅                | ❌ (conceptually)       |
| Enforces a contract                      | ⚙️ Implicit      | ✅ Explicit             |
| Good for complex, multi-behavior systems | ⚠️ Hard to scale | 🟢 Highly maintainable |

---

## 12. 💥 Applying This to Custom Error Classes

In your project, you might define an interface like this:

```ts
interface AppError extends Error {
  statusCode: number;
}
```

And implement it using a class:

```ts
export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string) {
    this.statusCode = 500;
    this.name = "InternalServerError";
    this.message = message;
  }
}
```

Later, if you want to create more specific error types (e.g., `NotFoundError`, `BadRequestError`),
you can simply **extend** this base error class — following both **inheritance** and **polymorphism** principles cleanly.

---

## 🧾 Summary

* Use **`type`** for simple object shapes.
* Use **`interface`** when defining contracts or multiple behavior types.
* Use **`class`** for concrete implementations and when inheritance is enough.
* For flexible, scalable systems — combine both:
  **Interfaces define the contract**, **classes implement them**.

---

# 🧾 Logging Implementation Guide (Node.js + Winston)

This guide explains **why logging is important**, how to **configure Winston**, and how to **implement correlation IDs** for tracing individual requests — including **async context tracking** using `AsyncLocalStorage`.

---

## 🧠 Why Do We Need Logs?

Logs play a **critical role** in understanding what happened inside your application during any given request. They act as a record of system events and help engineers debug issues in production.

### Example Scenario

Imagine you’re building an **Airbnb-like system**.
A user’s payment is deducted, but their booking doesn’t appear in the dashboard.
When this issue is reported to your engineering team, they can trace what happened **across the entire request lifecycle** by checking the logs — from login to payment confirmation.

---

### 🧑‍💻 How Logs Help in Real Systems

* In production-grade systems, logs help identify issues quickly when users raise tickets.
* Many companies have an **on-call rotation** — where one engineer is responsible for resolving production issues by analyzing logs.
* Without persistent logs, debugging production incidents becomes impossible.

---

### ❌ Why Not Just Use `console.log()`?

* `console.log()` only prints messages to the **current terminal session**.
* Once the terminal closes, all logs are **lost**.
* It provides **no log levels**, **no timestamps**, and **no persistence**.
* Hence, we need **structured, persistent, and level-based logging**.

---

## 🧩 Log Levels

Different situations require different log levels. Common ones include:

| Level   | Meaning                              | Example                                |
| ------- | ------------------------------------ | -------------------------------------- |
| `fatal` | System-crashing error                | Database connection failed permanently |
| `error` | Operation failed                     | Payment gateway rejected transaction   |
| `warn`  | Something unexpected but recoverable | Disk space running low                 |
| `info`  | Normal operation messages            | User login successful                  |
| `debug` | Detailed developer logs              | Function input/output values           |

You can retain different logs for different durations (e.g. `error` logs for 7 days, `warn` for 3 days, `info` for 1 day, etc.).

---

## ⚙️ Configuring Winston

### Step 1: Install Winston

```bash
npm install winston
```

### Step 2: Create a Logger Configuration File

Create a new file:
`config/logger.ts`

```ts
import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM:DD:YYYY HH:MM:SS" }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...data }) => {
      const output = { level, message, timestamp, data };
      return JSON.stringify(output);
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;
```

### Explanation

* **`format`** – Defines how logs are structured.
* **`transports`** – Specifies where logs are stored (e.g. console, file, database, etc.).
* **`timestamp`** – Adds the current time to each log.
* **`printf`** – Allows us to define a custom format for logs.

---

## 🧭 The Importance of Correlation ID

### The Problem

In a live system, **many users** send **simultaneous requests**.
If you look at raw logs, they’re all interleaved — making it **hard to tell which log belongs to which user/request**.

### The Solution — Correlation ID

A **correlation ID** is a **unique identifier** assigned to each incoming request.
Every log generated while processing that request includes this same ID, allowing engineers to trace the **entire request lifecycle** easily.

---

### 🧱 Steps to Implement Correlation ID

#### 1. Create a Unique ID Generator Middleware

```ts
// middleware/correlation.middleware.ts
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();
  req.headers["x-correlation-id"] = correlationId;
  next();
};
```

#### 2. Register the Middleware

In your `server.ts` or `app.ts` file:

```ts
app.use(attachCorrelationIdMiddleware);
```

#### 3. Use It in Your Logs

```ts
logger.info("Validating request body", {
  correlationId: req.headers["x-correlation-id"]
});
```

#### Example Log Output

```json
{"level":"info","message":"Validating request body","timestamp":"10:30:2025 13:10:03","data":{"correlationId":"324ea730-73a6-4080-8a31-84da91a6e450"}}
{"level":"info","message":"Request body validated successfully","timestamp":"10:30:2025 13:10:03","data":{"correlationId":"324ea730-73a6-4080-8a31-84da91a6e450"}}
```

---

## ⚙️ Problem — Async Tasks Don’t Have Request Objects

Background jobs like **cron jobs**, **message consumers**, or **queue processors** don’t have access to the `req` object — hence, **no correlation ID**.

To fix this, we use **asynchronous context tracking** with Node.js’s `AsyncLocalStorage`.

---

## 🔁 Implementing `AsyncLocalStorage`

```ts
// correlation.middleware.ts
import { AsyncLocalStorage } from "async_hooks";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export const asyncLocalStorage = new AsyncLocalStorage<{ correlationId: string }>();

export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();
  req.headers["x-correlation-id"] = correlationId;

  asyncLocalStorage.run({ correlationId }, () => {
    next();
  });
};

// helper
export const getCorrelationId = () => {
  const store = asyncLocalStorage.getStore();
  return store?.correlationId || "Unknown-error-while-creating-correlation-id";
};
```

### Update Logger to Use Async Context

```ts
winston.format.printf(({ timestamp, level, message, ...data }) => {
  const output = {
    level,
    message,
    timestamp,
    correlationId: getCorrelationId(),
    data
  };
  return JSON.stringify(output);
});
```

---

### Example Usage

```ts
logger.info("Validating request body");
await schema.parseAsync(req.body);
logger.info("Request body validated successfully");
```

### Example Output

```json
{"level":"info","message":"Validating request body","timestamp":"10:30:2025 15:10:17","correlationId":"b1ffa770-8df2-435a-b9d1-c052e7a2d5d3"}
{"level":"info","message":"Request body validated successfully","timestamp":"10:30:2025 15:10:18","correlationId":"b1ffa770-8df2-435a-b9d1-c052e7a2d5d3"}
```

Now all logs related to the same request (or async task) share the same **correlation ID**.

---

## 📁 Log File Rotation & Persistence

As of now, logs only appear in the console.
Let’s configure **file-based logging** with daily rotation and auto-cleanup.

### Install Dependency

```bash
npm install winston-daily-rotate-file
```

### Configure Daily Rotate File Transport

```ts
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM:DD:YYYY HH:MM:SS" }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...data }) => {
      const output = { level, message, timestamp, data };
      return JSON.stringify(output);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/application-%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d" // keep logs for 30 days
    })
  ]
});
```

### Benefits

✅ Each day gets its **own log file**.
✅ Files automatically **rotate** after 20 MB.
✅ Old logs (older than 30 days) are **deleted automatically**.

---

## ✅ Summary

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Winston Logger**    | Structured, level-based logging system               |
| **Correlation ID**    | Tracks logs for a single request                     |
| **AsyncLocalStorage** | Maintains correlation ID across async operations     |
| **Daily Rotate File** | Creates daily logs with auto-cleanup                 |
| **Persistent Logs**   | Survive restarts and useful for production debugging |

---

