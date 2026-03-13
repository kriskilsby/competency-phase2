Competency Phase 2

A full-stack competency management and reporting system designed to support employee skills tracking, project experience, and professional development records.

The application combines a NestJS backend API, a Next.js frontend, and supporting data analysis scripts to provide a structured platform for managing employee competency information and generating insights.

Project Structure
competency-phase2
│
├── backend/        # NestJS API and business logic
├── frontend/       # Next.js frontend application
├── database/       # SQL queries and schema support
├── intelligence/   # Python scripts for analytics / gap analysis
└── README.md
Current Features

The system currently includes:

Employee data management

Employment history records

Professional qualifications tracking

Project experience tracking

Continuing Professional Development (CPD) entries

Dashboard components for visualising competency data

Skill visualisation using bubble and circle-packing charts

API endpoints for employee data retrieval

Interactive employee table with search and navigation

Individual employee detail pages

The project is under active development as part of Phase 2 of a competency management platform, focusing on improving data visualisation, reporting, and automation.

Technology Stack
Backend

NestJS

TypeScript

REST API architecture

Entity-based data modelling

Frontend

Next.js (React)

TypeScript

Tailwind CSS

Interactive data visualisation components

Data / Intelligence

Python

Data analysis scripts for competency gap analysis

Running the Project Locally
1. Clone the repository
git clone https://github.com/kriskilsby/competency-phase2.git
cd competency-phase2
2. Start the Backend

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Start the development server:

npm run start:dev

The NestJS API will start locally.

3. Start the Frontend

Open another terminal and navigate to the frontend folder:

cd frontend

Start the development server:

npm run dev
4. Access the Application

Open the application in your browser:

http://localhost:3000
Initial Frontend Setup

The frontend was created using the Next.js CLI with TypeScript:

npx create-next-app@latest frontend --typescript
Future Development

Planned improvements include:

Docker containerisation

Automated report generation

Advanced competency gap analysis

LLM-assisted skill classification

Deployment to a cloud server environment

Enhanced data visualisation dashboards

Author

Developed by Kris Kilsby as part of a full-stack competency management and analytics platform.