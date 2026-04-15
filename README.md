# AM First Loans — Official Website

Official website for **AM First Assistance LLP**, a leading Direct Selling Agent (DSA) specializing in used car refinance loans, with operations across 9 branches in Indore, Raipur, Ujjain, and Jaipur.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Plain CSS (component-scoped) |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Email Reports | Nodemailer + ExcelJS |
| Scheduler | node-cron |

---

## Project Structure

```
am-first-loans/          # Frontend (React + Vite)
├── public/              # Static assets (logo, favicon, images)
├── src/
│   ├── assets/          # Images, award photos, map
│   ├── components/      # Shared components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LoanProducts.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Testimonials.jsx
│   │   ├── StatsBar.jsx
│   │   └── EMICalculator.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── UsedCarLoansPage.jsx
│   │   ├── ApplyPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── EMICalcPage.jsx
│   │   ├── EligibilityPage.jsx
│   │   ├── MediaPage.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Cookie.jsx
│   │   └── Disclaimer.jsx
│   └── App.jsx          # Root component + navigation
│
am-first-backend/        # Backend (Node.js + Express)
├── server.js            # API server + daily email reports
├── setup-db.js          # Database setup script
└── .env                 # Environment variables
```

---

## Getting Started

### 1. Frontend

```bash
cd am-first-loans
npm install
npm run dev
```

Runs on `http://localhost:5173`

### 2. Backend

```bash
cd am-first-backend
npm install
node server.js
```

Runs on `http://localhost:5005`

### 3. Database Setup

Make sure PostgreSQL is running, then:

```bash
cd am-first-backend
node setup-db.js
```

Or paste this directly in PostgreSQL:

```sql
\c amfirst_db

CREATE TABLE IF NOT EXISTS loan_applications (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  phone      VARCHAR(20),
  email      VARCHAR(100),
  city       VARCHAR(50),
  loan_type  VARCHAR(50),
  amount     NUMERIC,
  tenure     INTEGER,
  car_value  NUMERIC,
  car_model  VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  loan_type  VARCHAR(50),
  phone      VARCHAR(20),
  message    TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables

Create `am-first-backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amfirst_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password

MAIL_USER=amfirst.report@gmail.com
MAIL_PASS=your_gmail_app_password
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/apply` | Submit loan application |
| POST | `/api/contact` | Submit contact/enquiry form |
| GET | `/api/test-report` | Manually trigger email report |

---

## Daily Email Reports

Automated Excel reports are sent to `amfirst.report@gmail.com` **twice daily**:

| Time | Report |
|------|--------|
| 2:00 AM IST | Loan Applications + Contact Messages |
| 2:00 PM IST | Loan Applications + Contact Messages |

Each email contains a formatted `.xlsx` attachment with all entries for that day.

---

## Pages

| Route (key) | Page |
|-------------|------|
| `home` | Home Page |
| `about` | About Us |
| `used-car-loans` | Used Car Loans |
| `apply` | Apply Now |
| `contact` | Contact Us |
| `emi-calc` | EMI Calculator |
| `eligibility` | Eligibility & Documents |
| `media` | Media & News |
| `privacy` | Privacy Policy |
| `cookie` | Cookie Policy |
| `disclaimer` | Disclaimer |

---

## Company Info

- **Founded:** 2015 by Mr. Manish Parihar
- **Branches:** 9 across Indore (4), Raipur (3), Ujjain (1), Jaipur (1)
- **Disbursement:** ₹150 Cr in FY 2024-25
- **Contact:** amfirst.contact@gmail.com | +91-8818884843

