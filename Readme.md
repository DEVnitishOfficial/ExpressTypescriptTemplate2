
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

