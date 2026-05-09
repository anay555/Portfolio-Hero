# 🚀 Futuristic 3D AI Portfolio

A hyper-detailed, futuristic 3D portfolio application built for an aspiring AI/ML and Systems Engineer. This project combines cutting-edge web technologies, real-time 3D rendering, and generative AI to create a uniquely interactive experience.

## ✨ Key Features

* **🌌 Interactive 3D Hero Scene**: Built with `Three.js` and `@react-three/fiber`, featuring a dynamic geometric sculpture and custom cursor interactions.
* **🧠 Holographic AI Assistant ("AURA")**: An integrated AI chat widget powered by the **Google Gemini API**. AURA is contextually aware of the portfolio's contents and can answer questions about projects, experience, and skills.
* **📄 Dynamic Resume Management**: A custom Node.js Express backend (with Vercel Serverless Function compatibility) that automatically detects and serves the newest PDF resume from the `public/resumes/` directory without requiring frontend codebase updates.
* **⚡ Modern Tech Stack**: Powered by React 19, TypeScript, Vite, and styled meticulously with Tailwind CSS.
* **🎬 Immersive UI/UX**: Scroll reveals, custom preloading, glitch text effects, and a tech-noir aesthetic.

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React
* **3D Rendering**: Three.js, React Three Fiber, React Three Drei
* **AI Integration**: `@google/genai` (Gemini Flash)
* **Backend**: Express.js / Node.js (Local & Cloud Run), Vercel Serverless Functions (`/api/resume.ts`)

## 📦 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd futuristic-portfolio-hero
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 📝 How to Update Your Resume

This project features a zero-touch frontend update system for your resume.

1. Navigate to the `public/resumes/` folder in the root directory.
2. Add your newest resume as a `.pdf` file.
3. The backend API (`/api/resume`) will automatically scan the folder, sort the PDFs by modification date, and serve the most recent one to the "Download Resume" button on the frontend.
4. You can safely delete older versions or keep them as backups.

## 🚀 Deployment

### Option A: Google Cloud Run (via AI Studio)
You can directly deploy this to Cloud Run using the built-in export features of your development platform. The `server.ts` file acts as the primary Express backend that successfully serves both the Vite built static files and the API endpoints.

### Option B: Vercel
This app is pre-configured for Vercel deployment:
1. Push the repository to GitHub.
2. Import the project in your Vercel Dashboard.
3. Add your `API_KEY` to Vercel's Environment Variables settings.
4. Deploy! Vercel will automatically use the `/api/resume.ts` Serverless Function to handle your dynamic resume routing, while statically serving your frontend and the `public/resumes/` folder.

---
*Architected by Anany Sharma. Built with React, Three.js & Gemini.*
