# Oddo-X-Charusat-Hackathon-2025
Oddo X Charusat Hackathon 2025 
Team : The HackPack
Team No : 21

#video link: https://drive.google.com/drive/folders/1zDKg1J8DpA6MaZ_YSHY7KpQW_P7vdYpC?usp=sharing
 
## Problem Statement
Many underbanked or low-income communities lack access to essential financial tools and services, leading to limited economic opportunities and financial instability.

### Chosen Problem
The challenge is to simplify the loan application process for borrowers while ensuring efficient validation, approval, and fund transfer mechanisms for partner agencies (Banks and NBFCs).

### Problem Analysis
- Many individuals struggle to secure loans due to complicated application processes, lack of proper validation, and limited access to financial institutions.
- Less Income and lack of knowledge is reason for limited economic opportunities.
- Financial agencies face difficulties in verifying borrowers, tracking EMI payments, and mitigating loan defaults.

### Target Audience
- Borrowers in need of financial assistance, particularly those with low incomes.
- Banks and NBFCs looking to streamline loan applications.

### Impact
Increased financial inclusion can empower individuals and small businesses, enabling them to save, invest, and access credit. This leads to improved financial stability, economic growth, and reduced poverty in underserved communities.

## Solution Overview
A digital microfinance platform that connects borrowers with partner agencies, facilitating loan applications, document verification, approval, fund transfers, and repayment tracking with automated mechanisms.

### Approach
- Aadhaar-based authentication and profile creation for borrowers.
- Loan application process with automated EMI and repayment plan suggestions.
- Verification using OCR and eKYC mechanisms, including CIBIL score checks.
- Dashboard for partner agencies to review, approve/reject, and process applications.
- Automated fund transfers upon loan approval.
- EMI tracking, payment notifications, and penalty enforcement for late payments.

### Uniqueness
- Automated risk assessment using CIBIL and KYC data.
- Revenue-sharing model with partner agencies.

### Special Focus on Financial Education
1. **Financial Education Hub**:
   - Interactive videos and webinars on budgeting, credit scores, and debt management.
   - Financial term glossary with examples.
2. **Gamified Learning Modules**:
   - Quizzes and daily financial tips.
   - Reward-based learning (redeemable points for discounts).
3. **Virtual Financial Advisor**:
   - AI-powered chatbot for savings and investment advice.
   - Scenario-based lessons (e.g., debt management).
4. **Community Learning**:
   - Forums for sharing experiences and insights.
   - Monthly financial literacy contests with prizes.
5. **Financial Wellness Tracker**:
   - Personalized savings and spending insights.
   - Financial health improvement suggestions.

## Frameworks & Technologies
### Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Aadhaar API integration (simulated)
- **Payment Gateway**: Razorpay

### Reasoning
- Scalable and cost-effective stack for a large user base.
- Ensures security and compliance with financial regulations.

### Assumptions & Constraints
- Dummy data for CIBIL and KYC due to API restrictions.

## Feasibility & Implementation
### Implementation Ease
- Modular development using an agile approach.

### Effectiveness
- Reduces manual intervention in loan processing.
- Increases approval efficiency for financial agencies.
- Integrating educational modules into the loan application process.
- Promoting financial literacy workshops and interactive webinars alongside loan offerings.


## Customer Support
- **Chatbot Support**: Provide 24/7 support through a chatbot.
- **FAQ Section**: Create a comprehensive FAQ section to address common queries.

## UI/UX Mockup
### Screens Overview
- **User Dashboard**: Loan application, tracking, EMI management.
- **Partner Agency Dashboard**: Loan applications, approval, fund transfers.
- **Portal’s Panel**: System monitoring and analytics.

### User Flow
1. User registers with Aadhaar-based authentication.
2. Applies for a loan with required details.
3. System suggests optimal loan plans.
4. Partner agency reviews application.
5. If approved, funds are transferred; if rejected, it’s sent to another agency.
6. EMI tracking and auto-pay mechanisms ensure timely payments.

### Accessibility Considerations
- Simple design with easy navigation.

## Business Scope & Use Case
### Use Case Scenarios
- A user applies for a small business loan and gets instant approval.
- A partner bank manages applications via the dashboard and assigns agents to review them.

### Market Need
- Growing demand for digital loan platforms in emerging markets.
- Increased financial inclusion through simplified application processes.

## System Design & Architecture
### Technologies Overview
- **Frontend**: React.js for a responsive UI.
- **Backend**: Node.js for API and logic handling.
- **Database**: PostgreSQL for scalable storage.
