# Running and Sharing a React Project with Ngrok

This documentation explains how to set up a React project locally and share it with others using **ngrok**. It is intended for developers who are new to both React and ngrok.

---

## 1. Prerequisites

Before you begin, ensure the following are installed on your system:

* **Node.js** (includes npm)
* **npm or yarn** (comes with Node.js)

Verify the installation:

```bash
node -v
npm -v
```

If not installed, download and install Node.js from the [official website](https://nodejs.org/).

---

## 2. Create a React Project

If you do not have an existing React project, create one using Create React App:

```bash
npx create-react-app my-app
cd my-app
```

This will generate a basic React project inside a folder named `my-app`.

---

## 3. Start the Development Server

Run the React project locally:

```bash
npm start
```

By default, the application will be available at:

```
http://localhost:3000
```

---

## 4. Install Ngrok

Install ngrok globally using npm:

```bash
npm install -g ngrok
```

Verify the installation:

```bash
ngrok -v
```

---

## 5. Expose the Local Server with Ngrok

To share the local React application, run:

```bash
ngrok http 3000
```

If your application is running on a different port, replace `3000` with the correct port number.

---

## 6. Access the Public URL

After running the above command, ngrok will generate a public URL similar to:

```
Forwarding    https://abcd-12-34-xyz.ngrok-free.app -> http://localhost:3000
```

Use the generated `https` link to share your running React application with others.

---

## 7. Stop Ngrok

To stop sharing, terminate the ngrok process by pressing:

```
CTRL + C
```

---

## Notes

* Each time you restart ngrok, a new public URL will be generated unless you use a reserved domain (available in ngrok’s paid plans).
* Keep the terminal session running as long as you want the application to remain accessible publicly.
* This setup is recommended only for **development and testing purposes**, not for production deployment.
