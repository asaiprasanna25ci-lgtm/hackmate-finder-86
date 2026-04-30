

## 1. Install Node.js

### Step 1: Download Node

Go to the official website:
👉 Node.js

* Click **LTS (Recommended)**
* Download the `.msi` installer

---

### Step 2: Install

* Open the downloaded file
* Click **Next → Next → Install**
* Keep all default settings
* Make sure **“Add to PATH”** is checked

---

### Step 3: Verify Installation

Open **Command Prompt (cmd)** or **PowerShell**:

```bash
node -v
npm -v
```

If you see versions → installation is successful ✅

---

## 2. Install Next.js App

### Step 1: Create Project

Run:

```bash
npx create-next-app@latest my-app
```

---

### Step 2: Setup Options

It will ask some questions:

* TypeScript? → Yes (recommended)
* ESLint? → Yes
* Tailwind CSS? → Yes (optional but useful)
* App Router? → Yes
* Import alias? → default is fine

---

### Step 3: Go to Project Folder

```bash
cd my-app
```

---

### Step 4: Start Server

```bash
npm run dev
```

---

## 3. Open in Browser

Go to:

```
http://localhost:3000
```

You will see your Next.js app running 🚀

---

## 4. Folder Structure (Basic Understanding)

```bash
my-app/
 ├── app/        → pages & routes
 ├── public/     → images, static files
 ├── package.json
```

---

## 5. Useful Commands

```bash
npm run dev      # start development
npm run build    # production build
npm run start    # run production server
```

---

## Optional (Recommended Tools)

* Install Visual Studio Code
* Install extensions:

  * ES7 React Snippets
  * Tailwind IntelliSense

-