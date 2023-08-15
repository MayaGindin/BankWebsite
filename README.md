# Bank Account Management System

## Project Goal and General Explanation:
Our project aims to develop a system that manages bank accounts. Users can register, log in, deposit money, transfer money between accounts, and view their transaction history. Administrators can see statistics, manage user accounts, and perform other managerial tasks. This README will break down the different functionalities, users, processes, managed data, and the general architecture of the system.

## Users Type:
- **Administrator (Manager):** This user can open accounts, update account details, delete accounts, and view various statistics and transaction histories.
- **Regular User (Surfer):** This user can see their balance, list of transactions, filter transactions by date, and make transfers to other accounts.

## Processes:
1. **Registration and Login:** Users can register for a new account and login to their existing accounts.
2. **Money Transactions:** Users can deposit and transfer money. The transaction details are stored and can be viewed anytime.
3. **Administrator Dashboard:** Provides a comprehensive view of statistics, user management functionalities, and transaction histories.
4. **Visual Data Representation:** Uses charts to represent data, providing an intuitive overview of various metrics.

## Managed Data:
- **User Data:** Information about each user including their account details.
- **Transaction Data:** Details of each money transaction, such as date, amount, sender, and recipient.
- **Balance Data:** The current balance of each account.

## General Architecture:
- **Frontend (Views):** We used a pre-made template for the design and edited it to match our requirements. Each `.ejs` file combines both HTML and JS, allowing dynamic content rendering. Styling is managed by CSS files in the `public/css` directory.
- **Backend (Server-side):** Our server, defined in the `app.js` file, is built with NodeJS and ExpressJS. It defines the various routes and functionalities of our application. User authentication is handled using JWT tokens, which keep the user logged in for a day.
- **Database:** We're using MongoDB for data storage. The data models, such as User, Transaction, and Balance, are defined in the `models` directory.
- **MVC Architecture:** Our code is organized using the Model-View-Controller (MVC) design pattern. This includes:
  - `models` directory for the data structures.
  - `views` directory for the frontend display.
  - `controllers` directory that handles the logic linking the models and the views.

## Additional Information:
- Default Administrator credentials are `username: admin` and `password: admin!@#`.
- The `routes` directory links URLs to the right pages in our project.
- All the design components (from a pre-made template) are housed in the `public` directory.
