# SIP Backend API

This is the backend API for the SIP-related project, built using Express.js and Prisma with Neon as the database. The API provides endpoints for SIP calculations and holiday-related data.

## Features
- Calculate next SIP installment date based on frequency.
- Fetch holiday data.
- CORS enabled for frontend communication.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Prisma & Neon)
- **Deployment**: Vercel

## Project Structure
```
|-- backend
    |-- config
    |-- controllers
    |-- middleware
    |-- routes
    |-- prisma
    |-- index.js
    |-- app.js
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/sip-backend.git
   cd sip-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=your_database_url
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. Push database schema to Prisma:
   ```sh
   npx prisma db push
   ```

5. Run the server locally:
   ```sh
   npm start
   ```

## Deployment (Vercel)
1. Ensure the following build settings in `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "app.js", "use": "@vercel/node" }
     ]
   }
   ```
2. Deploy using Vercel CLI:
   ```sh
   vercel
   ```

## API Endpoints
### Health Check
```
GET /
```
Response:
```json
{"message": "Server up and running"}
```

### SIP Calculation
```
GET /sip/next-instalment?startDate=YYYY-MM-DD&frequency=weekly&referenceDate=YYYY-MM-DD
```
Response:
```json
{"nextInstalment": "YYYY-MM-DD"}
```

### Fetch Holidays
```
GET /holidays
```
Response:
```json
[ { "date": "YYYY-MM-DD", "name": "Holiday Name" } ]
```


