# Digital Wallet Application

## Project Overview
Digital Wallet is a full-stack web application that simulates a mobile wallet system. Users can register and perform core wallet operations, including adding money, withdrawing, sending money to other users, and viewing transaction history. The application supports multiple roles:

- **User**: Manage personal wallet, view transactions.  
- **Agent**: Cash-in/cash-out for users, view commission history.  
- **Admin**: Manage users, agents, wallets, and system settings.

---

## Technology Stack
- **Frontend**: React, TypeScript, Redux Toolkit, TailwindCSS, Vite, React Router  
- **Backend**: Node.js, Express.js, MongoDB / Mongoose  
- **Authentication**: JWT  
- **UI Components**: Radix UI, Lucide React, Framer Motion  
- **Deployment**: Render (backend), Vercel (frontend)  

---

## Live Deployment
- **Frontend**: [https://digital-wallet-client-indol.vercel.app](https://digital-wallet-client-indol.vercel.app)  
- **Backend**: [https://digital-wallet-api-2.onrender.com](https://digital-wallet-api-2.onrender.com)  

---

## Setup Instructions

### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Digital-Wallet-Client.git
   cd Digital-Wallet-Client
2. Install dependencies:
     npm run dev
3. Start development server:
     npm run dev
4. Build for production:
     npm run build
5. Serve production build locally (optional)
     npm run start

# Backend
1 Clone the repository: 
   git clone https://github.com/<your-username>/Digital-Wallet-Server.git
   cd Digital-Wallet-Server
2 Install dependencies:
   npm install
3 Create .env file and set environment variables:
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
4 Start development server:
    npm run dev
5  Production deployment runs via Render

# Credentials for Testing
 #Admin

Phone Number: 01512345678

Password: 123456

 #Agent

Phone Number: 01712345678

Password: 123456

#Features

 #User Role:

   Deposit and withdraw money

   Send money to other users

   View transaction history with filtering

 #Agent Role:

   Cash-in/cash-out for users

   View commission history

 #Admin Role:

   Manage users, agents, and wallets

   Block/unblock wallets

   Approve/suspend agents

   View all transactions
