# 💰 Loan Calculator App

A responsive web app that calculates loan EMIs and displays a dynamic amortization schedule with real-time currency conversion. Built with **React**, **Material UI**, **Tailwind CSS**, and **ExchangeRate API**.

---

## 🚀 Features

- 📊 Loan EMI calculation using the standard financial formula
- 📅 Dynamic amortization schedule (monthly breakdown)
- 💱 Real-time currency conversion using ExchangeRate API
- 🌗 Light & Dark theme toggle (Material UI ThemeProvider + Context API)
- 📱 Fully responsive layout with collapsible navbar on mobile
- 🔍 Paginated exchange rate table for 160+ currencies
- 🧩 Custom React Hooks & Context for clean state management
- 🧱 Built with Vite, React Router, Tailwind CSS, and MUI

---

## 🧮 EMI Formula Used

EMI = [P × R × (1+R)^N] / [(1+R)^N − 1]

Where:

- P = Loan amount
- R = Monthly interest rate = Annual Rate / 12 / 100
- N = Term in months (Years × 12)

---

## 🖥️ Live Demo

🔗 [View Live](https://loan-calculator-wheat.vercel.app/)

---

## 📦 Tech Stack

- **React** (with Hooks & Router)
- **Vite** for build tooling
- **Material UI** for component styling
- **Tailwind CSS** for layout and responsiveness
- **Context API** for theme and currency state
- **Axios** for API calls
- **ExchangeRate API** for live currency rates
