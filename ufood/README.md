# UFood — Multi-Vendor Food Delivery Platform

Production-ready MERN stack food delivery platform built step-by-step for Bangladesh.

## Repository Structure

```text
ufood/
├── backend/          # Node.js + Express 5 + MongoDB (Mongoose) REST API
├── frontend/         # React 19 + Vite + Tailwind CSS v4 + Redux Toolkit
└── .github/workflows # GitHub Actions CI pipeline
```

## Local Setup (Step 01)

### 1. Backend
```bash
cd backend
cp .env.example .env
# Edit backend/.env and add your MONGODB_URI
npm install
npm run dev
```
Verify backend health: `http://localhost:8000/api/v1/health`

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173` — the starter page will verify the live connection to the UFood API.

## Build Progress
- [x] **Step 01:** Repository foundation, `.gitignore`, `.env.example`, Express 5 + centralized error handler, React 19 + Vite shell, CI pipeline.
- [ ] **Step 02:** Authentication, Firebase ID Token verification & cryptographic OTP.
