Personal Finance Tracker

A full-stack Personal Finance Tracker built with MERN stack that helps user manage their income and expenses in one place.
This application allows user to add, edit, delete and filter transactions, making is easier to track spending habits and manage personal finances efficiently.

---------------------------------------------------------

Features

* User Authentication
  * Secure signup and signin functionality
  * Authentication using JWT
  * Password hashing with bcrypt.
    
* Transaction Management
 * Add income and expense transactions
 * Edit existing transactions
 * Delete transactions
 * Add details such as:
   * Date
   * Category
   * Payment method
   * Transaction type (income/expense)
   * Amount
     
  * Filtering and search
    * Filter transactions by:
      * Amount
      * Transaction type
      * Payment method
      * Category
     
  * Finance tracking
    * Track overall income and expenses
    * View transactions history
    * Organize finance record in a structured way
   
  * Responsive UI
    * Clean and user-friendly interface
    * Designed for better readability and navigation
      
  ------------------------------------------------------
  
  Tech stack

  Frontend

  * HTML
  * CSS
  * Javascript

  Backend

  * Node.js
  * Express.js

  Database

  * Mongodb

  Authentication

  * JWT (JSON Web Woken)
  * bcrypt

  ------------------------------------------------------

  Project structure

  Personal-finance-tracker/ 
  │ 
  ├── Api/ # Backend code (Node.js, Express, MongoDB) 
  ├── my-app/ # Frontend code (React) 
  ├── package.json └── README.md
  
  -------------------------------------------------------

  How it works?

  * User creates an account or sign in
  * User add income or expense transactions
  * Each Transaction is stored with details like date, category and transacion type.
  * User can edit or delete transaction whenever needed
  * User can filter transactions to analyise finance activity more effeciently.

 ---------------------------------------------------------

 Installation and Setup
1. Clone the repository
git clone https://github.com/your-username/Personal-finance-tracker.git
cd Personal-finance-tracker
2. Install dependencies
Backend
cd Api
npm install
Frontend
cd ../my-app
npm install
3. Configure environment variables

Create a .env file inside the backend folder and add the required environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
4. Run the project
Start backend
cd Api
npm start
Start frontend
cd my-app
npm start

----------------------------------------------------------

What I Learned

While builting this project, while improved my understanding of,

* Builting Full stack application, using the MERN stack.
* Creating REST APIs with Express.js.
* Managing MongoDB data using mongoose.
* Handling CRUD operations and Filters in a real-world project.
* Connecting Frontend and Backend effectively.

-----------------------------------------------------------

Author

Dhanush
