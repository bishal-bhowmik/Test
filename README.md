# HubSpot Theme Local Development Setup

This project utilizes a modern, component-based workflow for HubSpot development. Instead of manually editing large JSON files, we use **@resultify/hubspot-fields-js** to write modular, reusable JavaScript (`fields.js`) which is automatically compiled into standard HubSpot `fields.json`.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development:**
    ```bash
    npm run dev
    ```
    This single command runs two processes concurrently:
    * **Fields Watcher (`fields-watcher.js`):** Listens for changes in any `fields.js` file and instantly recompiles **only that specific file** into JSON.
    * **HubSpot Watcher (`hs watch`):** Watches for the generated `fields.json` (and other files) and uploads them to your HubSpot portal.

---

## ⚙️ How It Works

### 1. The Smart Watcher (`fields-watcher.js`)
   *  The script uses `fs.watch` to monitor the `modules/` folder recursively.* 
   *  It filters out all events *except* changes to files named `fields.js`.* 
   *  When a change is detected, it virtually `cd`'s into that module's directory.* 
   *  It executes `node fields.js` in that specific context.* **
   *  This ensures imports (like `../../partials/button.js`) resolve correctly and `fields.json` is saved in the right place.* 

### 2. The `.hsignore` File
This file is **critical** for this workflow. It tells the HubSpot CLI which files to strictly ignore during upload.

**Your `.hsignore` must contain:**
```text
**/fields.js

```

## 📦 Using Reusable Macros

With this setup, you can import shared fields (like buttons or style groups) into multiple modules.

**1. Define the Macro (`partials/button.js`)**

```javascript
import { group, moduleFields as fi } from "@resultify/hubspot-fields-js";

export function buttonField(label = "Button", name = "button", options = {}) {
  // Returns a group containing text and link fields
  return group(label, name, options, [
    fi.text("Button Text", "text", { default: "Click Me" }),
    fi.link("Link", "link")
  ]);
}

```

**2. Use the Macro (`modules/hero.module/fields.js`)**

```javascript
import { init } from "@resultify/hubspot-fields-js";
import { buttonField } from "../../partials/button.js";

init(
  // Reuse the button twice with different labels/names
  buttonField("Primary CTA", "cta_primary"),
  buttonField("Secondary CTA", "cta_secondary")
);

```

---

## 🔧 Troubleshooting

**"My fields aren't updating in HubSpot"**

1. Check your terminal. Did `fields-watcher.js` log `✅ Re-compiled: fields.js`?
2. Did `hs watch` log `Uploaded fields.json`?
3. Ensure `fields.json` is **NOT** in your `.hsignore` file.

**"Import Error / Syntax Error"**
Ensure your `package.json` includes `"type": "module"` to support ES6 imports.

**"Watcher not triggering"**
The watcher looks for the `modules` folder at the project root. If your structure is `theme/modules`, you must update the path in `fields-watcher.js`.
