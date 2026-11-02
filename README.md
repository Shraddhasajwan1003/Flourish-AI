# Flourish AI 🌸

> **Nourish Your Menstrual Flow. Balance Your Body. Feel Your Best.**

**Flourish AI** is an integrated AI-powered women's wellness, menstrual flow nourishment, and metabolic nutrition platform. It bridges menstrual-cycle tracking, PCOS/PCOD-conscious dietary intelligence, computational gastronomy (RecipeDB, FlavorDB, CocktailDB), flavor-based craving substitutions, cycle-synced yoga and movement, and evidence-grounded AI guidance into a cohesive ecosystem.

---

## Table of Contents

- [What "Flourish AI" Means](#what-flourish-ai-means)
- [Key Features](#key-features)
- [How to Get Your Gemini API Key](#how-to-get-your-gemini-api-key)
- [How to Get Your App URL](#how-to-get-your-app-url)
- [Installation & How to Run Perfectly](#installation--how-to-run-perfectly)
- [Project Architecture & File Tree](#project-architecture--file-tree)
- [Custom Machine Learning Training Pipeline](#custom-machine-learning-training-pipeline)
- [Environment Variables Guide](#environment-variables-guide)
- [Troubleshooting & FAQ](#troubleshooting--faq)

---

## What "Flourish AI" Means

**Flourish** = **Nourish your menstrual flow**.
Rather than treating the menstrual cycle as an inconvenience or tracking it in isolation, Flourish AI connects each phase of your flow with targeted nutrients, anti-inflammatory meals, gentle movement, and flavor-matched substitutions to help you thrive throughout the entire month.

---

## Key Features

1. **Animated Menstrual-Droplet Intro**: Soft blush backdrop, liquid droplet impact, expanding concentric ripples, and elegant typography reveal (with instant skip and session memory).
2. **First-Entry Conversational Intake (Doctor-Style Consultation)**:
   - Starts with **Age First** (applying youth privacy safeguards for minors under 18).
   - One-question-at-a-time adaptive questionnaire: location, regional food culture (North, South, East, West Indian & Global), primary goals, cycle status, PCOS/PCOD context, symptoms, private cervical fluid & reproductive notes, cravings, diet, and lifestyle.
   - Profile summary review with confirmation and 1-click **Use Demo Profile** for instant testing.
3. **"Today's Wellness" Personalized Dashboard**:
   - Dynamic greeting (`Good Morning, [Name]!`).
   - Circular cycle progress wheel showing cycle day, active phase, and days until predicted period.
   - Quick 1-minute daily check-in (mood, energy 1–5, flow, discharge, cravings, 8-glass water tracker).
   - Time-of-day meal recommendations (Breakfast, Lunch, Evening Snack, Dinner) with macros and PCOS-Fit Score badges.
   - Cycle-synced movement card and shortcuts to Craving Swap and Grocery Planner.
4. **Foodoscope RecipeDB Explorer**:
   - Hundreds of regional Indian and world recipes with full macronutrients, glycemic index ratings, key micronutrients (Inositol, Magnesium, Iron, Zinc, Folate), and step-by-step instructions.
5. **PCOS/PCOD Nutrition Hub & PCOS-Fit Score Engine**:
   - Transparent, explainable **0–100 PCOS-Fit Score** breaking down protein adequacy, estrogen-binding fiber, low-GI carb sources, added sugar penalties, and inositol bonuses.
   - **Active Seed Cycling Scheduler**: Automatically alternates between Follicular (Days 1–14: Flax + Pumpkin seeds) and Luteal (Days 15–28+: Sunflower + Sesame seeds).
6. **Craving Swap Engine (Flagship Innovation)**:
   - FlavorDB cosine similarity on volatile aroma compounds (85–95% match).
   - Side-by-side comparison of conventional cravings vs healthy functional swaps, complete with macro differentials (sugar saved, fiber gained) and biological explanations.
7. **"Move With Your Cycle" Movement Hub**:
   - Phase-synced yoga, pilates, and strength routines with an interactive pose timer, contraindications, and gentle modifications.
   - Built-in Python Machine Learning training script generator (`train_exercise_model.py`) for custom datasets.
8. **CocktailDB Verified Mocktails**:
   - Strictly 100% non-alcoholic, hormone-balancing herbal infusions and mocktails (0.0% ABV, safe for all ages).
9. **Flourish Market Grocery & Shopping Planner**:
   - Auto-generated grocery list categorized by Produce, Grains, Legumes, Dairy/Plant Mylk, and Spices, with INR (₹) budget estimation and clipboard export.
10. **"Ask Flourish AI" Wellness Assistant**:
    - Powered by Google Gemini via `@google/genai` (v2.4.0) with an intelligent evidence-grounded fallback.
11. **Cycle & Symptom Biomarker Analytics**:
    - Interactive Recharts graphs for cycle length consistency, symptom clusters by phase, and macronutrient ratios.
12. **Settings & Data Privacy**:
    - Edit profile parameters, configure external API keys, export all wellness logs as JSON, or clear and reset data.

---

## How to Get Your Gemini API Key

The "Ask Flourish AI" Assistant uses the Google Gemini API to deliver cycle-informed nutritional guidance:

1. Open your browser and visit **[Google AI Studio](https://aistudio.google.com/)**.
2. Sign in with your Google account.
3. Click the **"Get API key"** button on the left sidebar (or navigate to [API Keys](https://aistudio.google.com/app/apikey)).
4. Click **"Create API key"** and select or create a Google Cloud project.
5. Copy your generated key (e.g., `AIzaSy...`).
6. Add it to your project in either of two ways:
   - **Option A (Environment Variable)**: Open your `.env` file in the project root and set:
     ```bash
     GEMINI_API_KEY="AIzaSyYourActualKeyHere"
     ```
   - **Option B (Directly in the App)**: Navigate to **Settings** (`/settings`) in the running Flourish AI app, scroll to **External API Integrations**, paste your key into the **Google Gemini API Key** input, and click **Save Changes**. The app encrypts and saves it locally.

> *Note*: If no API key is provided, Flourish AI automatically engages its built-in clinical evidence engine, ensuring the assistant and app remain functional without errors.

---

## How to Get Your App URL

Depending on where you are running Flourish AI:

### 1. In Google AI Studio Build Environment
- **Development App URL**: Shown in your session metadata at the top of the AI Studio build panel (e.g., `https://ais-dev-...run.app`). This is your live sandbox.
- **Shared App URL**: Found under the **Share** button in the AI Studio header (e.g., `https://ais-pre-...run.app`). Use this link to test on mobile devices or share with collaborators.
- AI Studio automatically sets the `APP_URL` environment variable to the Cloud Run service URL.

### 2. When Running Locally on Your Machine
- After starting the development server, your App URL is:
  ```
  http://localhost:3000
  ```
  *(or `http://localhost:5173` depending on your port configuration)*

### 3. When Deployed on Vercel or Render
- **Vercel**: After running `vercel` or connecting your GitHub repo, your production URL will look like `https://flourish-ai.vercel.app`.
- **Render**: Your URL will look like `https://flourish-ai.onrender.com`.

---

## Installation & How to Run Perfectly

Follow these steps to run Flourish AI smoothly on any local or cloud environment.

### Prerequisites

- **Node.js**: Version `18.0.0` or higher (Node 20+ recommended). Check with:
  ```bash
  node -v
  ```
- **npm** (v9+), **yarn**, or **pnpm**:
  ```bash
  npm -v
  ```
- *(Optional for ML training)*: Python 3.9+ with `pip`.

---

### Step 1: Clone or Open the Project Directory

```bash
cd femnourish
```

Ensure the following root files are present:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/`

---

### Step 2: Configure Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env
```

Open `.env` in your editor and add your credentials:

```ini
# GEMINI_API_KEY: Required for live Google Gemini calls
GEMINI_API_KEY="AIzaSyYourActualKeyHere"

# APP_URL: URL where the app is hosted
APP_URL="http://localhost:3000"
```

---

### Step 3: Install Dependencies

Run `npm install` to install all frontend libraries, icons, charting utilities, and the Google Gen AI SDK:

```bash
npm install
```

Installed core dependencies include:
- `react` & `react-dom` (v19)
- `react-router-dom` (v7)
- `@google/genai` (v2.4.0)
- `framer-motion` (v12)
- `lucide-react` (v0.546)
- `recharts` (v2.15)
- `@tailwindcss/vite` & `tailwindcss` (v4)

---

### Step 4: Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

You will see output similar to:

```
  VITE v6.0.3  ready in 280 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open `http://localhost:3000` in your browser.

---

### Step 5: Build for Production & Preview

To verify that the TypeScript codebase compiles with zero errors and generates optimized production assets:

```bash
# Build production bundle
npm run build

# Preview the production build locally
npm run preview
```

The production output will be generated cleanly in the `/dist` directory.

---

## Project Architecture & File Tree

```
femnourish/
├── index.html                    # Root HTML with Google Fonts & Flourish AI metadata
├── metadata.json                 # AI Studio capability declarations
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite with Tailwind v4 & React plugins
├── .env.example                  # Environment template
│
├── src/
│   ├── main.tsx                  # React DOM entry point
│   ├── index.css                 # Tailwind v4 import, theme variables & typography
│   ├── App.tsx                   # BrowserRouter & route definitions
│   │
│   ├── config/
│   │   └── app.config.ts         # Central APP_NAME = "Flourish AI", tagline, brand colors
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (UserProfile, Recipes, etc.)
│   │
│   ├── data/
│   │   ├── foodoscopeData.ts     # Curated RecipeDB, FlavorDB & CocktailDB records
│   │   └── exerciseData.ts       # Cycle-synced yoga routines & Python ML script
│   │
│   ├── services/
│   │   ├── storageService.ts     # LocalStorage state, demo profile, JSON export
│   │   ├── cyclePredictionService.ts # Cycle day, phase, and Bayesian period prediction
│   │   ├── pcosFitScore.ts       # 0–100 explainable PCOS-Fit Score calculation
│   │   ├── cravingSwapService.ts # Cosine similarity flavor matching engine
│   │   ├── foodoscopeService.ts  # Unified RecipeDB / CocktailDB client layer
│   │   └── geminiService.ts      # @google/genai API integration & clinical fallback
│   │
│   ├── components/
│   │   ├── Navigation.tsx        # Responsive header with cycle phase pill
│   │   ├── IntroAnimation.tsx    # Droplet & concentric liquid ripple animation
│   │   ├── DailyCheckinModal.tsx # Mood, energy, flow, discharge, and water tracker
│   │   └── RecipeDetailModal.tsx # Full recipe viewer, macros, and grocery addition
│   │
│   └── pages/
│       ├── LandingPage.tsx       # Marketing landing page with hero & features
│       ├── Onboarding.tsx        # Doctor-style conversational intake (age first)
│       ├── Dashboard.tsx         # "Today's Wellness" command center
│       ├── CycleTracker.tsx      # Menstrual calendar & Bayesian predictions
│       ├── RecipeExplorer.tsx    # RecipeDB browser with regional Indian filters
│       ├── PcosNutritionHub.tsx  # PCOS-Fit recipes & active Seed Cycling scheduler
│       ├── CravingSwap.tsx       # FlavorDB cosine similarity craving solver
│       ├── MovementModule.tsx    # "Move With Your Cycle" & ML script viewer
│       ├── BeverageExplorer.tsx  # Verified 0.0% ABV mocktails & elixirs
│       ├── Marketplace.tsx       # Flourish Market grocery list planner
│       ├── AskFemAssistant.tsx   # Gemini-powered wellness assistant
│       ├── AnalyticsPage.tsx     # Recharts cycle trends & symptom clustering
│       └── SettingsPage.tsx      # Profile edits, API key inputs, and JSON export
│
└── backend/
    ├── requirements.txt          # Python FastAPI & ML dependencies
    └── app/
        └── main.py               # FastAPI backend entry point with CORS
```

---

## Custom Machine Learning Training Pipeline

Flourish AI provides a standalone Python script to train an **XGBoost cycle-synced exercise and movement recommender** on your custom dataset.

### How to Run the ML Script:

1. Open a terminal and create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install the ML dependencies:
   ```bash
   pip install pandas numpy scikit-learn xgboost joblib
   ```
3. Run the script:
   - You can download `train_exercise_model.py` directly from the **Move With Your Cycle** page in the app (click **"Train Custom ML Model Code"** -> **"Download .py File"**).
   - Or run it via:
     ```bash
     python train_exercise_model.py --data exercise_dataset.csv --out flourish_exercise_model.joblib
     ```
   - If no dataset is provided, the script automatically synthesizes a balanced, verified 600-record dataset for immediate training.

---

## Environment Variables Guide

| Variable | Description | Where to Set | Required? |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key for "Ask Flourish AI" Assistant | `.env` or In-App Settings | Recommended (fallback available) |
| `APP_URL` | Self-referential URL of the running web application | `.env` or Cloud Provider | Optional (defaults to localhost:3000) |
| `PORT` | Local dev server port (default `3000`) | Environment / Vite config | Optional |

---

## Troubleshooting & FAQ

### Q: Why does the app open on port 3000 instead of 5173?
A: In AI Studio and production preview containers, port 3000 is the standard iframe gateway. The development server is pre-configured to bind seamlessly to port 3000.

### Q: Can I use the app without entering a Gemini API key?
A: **Yes!** If no API key is detected, `geminiService` engages a built-in evidence-based clinical reasoning engine. It provides rich answers regarding menstrual phases, seed cycling, magnesium for cramps, and insulin sensitivity.

### Q: How do I reset or clear my data?
A: Go to **Settings** (`/settings`):
- Click **"Restore Default Demo Profile"** to return to the rich sample profile (Ananya, 26, Day 12 Follicular/Ovulatory).
- Or click **"Clear & Retake Intake"** to clear localStorage and experience the fresh, age-first conversational onboarding from scratch.

### Q: How do I export my data for my doctor or dietitian?
A: Click **"Export All Wellness Data (JSON)"** in either **Cycle Calendar** (`/cycle`) or **Settings** (`/settings`). This downloads a formatted JSON file containing your profile parameters, cycle history, daily check-in logs, and shopping lists.

---

## Clinical Disclaimer

> **Flourish AI** is designed for educational, nutritional, and cycle-aware lifestyle personalization. It does not provide medical diagnoses, treatment plans, or clinical prescriptions. Always consult a qualified physician, gynecologist, or registered dietitian for medical evaluation.
