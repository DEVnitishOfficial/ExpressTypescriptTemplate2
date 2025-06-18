
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

## Setting up Project

* Since Node.js is a JavaScript runtime environment and we want to use Typescript in our project, so in order to execute the Typescript we need `ts-node` which will internally convert the Typescript code to JavaScript on the fly in JIT (Just-In-Time Compilation).

> *Just-in-time (JIT) compilation is a method where code is translated into machine code during the execution of a program, rather than before.*

---

### 1. Creating `package.json`

```bash
npm init -y       # starts a fresh package.json file
npm i express     # install express
```

#### i. Dev Dependencies:

Dev dependencies (short for development dependencies) are packages that are only needed during the development and testing phases of a project, but not when the application is running in production. In production we need the js files or bundles, not the Typescript.

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

Here's your content properly formatted and rewritten in clear, detailed, and professional Markdown format—ideal for a `README.md` file in a backend Node.js project:

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

## 📁 Folder Structure (Suggestion)

```
/project-root
├── .env
├── src/
│   ├── config/
│   │   └── index.ts
│   └── server.ts
```
