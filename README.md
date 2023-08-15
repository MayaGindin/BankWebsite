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

## Website screenshots:
## Register:
![Register](https://github.com/MayaGindin/BankWebsite/assets/94249909/5a51b1aa-c36b-41f5-b221-d454d0693d54)
## Login:
![Login](https://github.com/MayaGindin/BankWebsite/assets/94249909/51a9a24d-820f-47f8-bd07-dd920d79c520)
## User Dashboard:
![User_dashboard](https://github.com/MayaGindin/BankWebsite/assets/94249909/53e9c5b2-bb2c-45a3-90e4-7e7674521b6c)
## Deposit:
![Deposit](https://github.com/MayaGindin/BankWebsite/assets/94249909/41048027-0860-4fdc-bec3-c88bac4272a3)
## Transfer:
![Transfer](https://github.com/MayaGindin/BankWebsite/assets/94249909/eb77d05e-d1a8-451b-ba01-9bac543120b1)
## User Transactions:
![User_Transactions](https://github.com/MayaGindin/BankWebsite/assets/94249909/434c6261-f906-43cf-a321-96d08d290850)
## Transaction details
![Transaction_detail](https://github.com/MayaGindin/BankWebsite/assets/94249909/72ab1f94-e896-415c-a382-c09c49328973)
## Admin Dashboard
![Admin_dashboard](https://github.com/MayaGindin/BankWebsite/assets/94249909/798c92ba-8d31-42ce-b645-447a5e3ba4fa)
## Admin Create User
![Admin_Create_User](https://github.com/MayaGindin/BankWebsite/assets/94249909/6c8f68fd-26f7-4aca-869c-d89170fd8d7d)
## Admin View Users
![Admin_users](https://github.com/MayaGindin/BankWebsite/assets/94249909/2c50349d-058c-4110-a813-6a61546c3a96)

