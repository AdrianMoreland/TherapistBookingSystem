# Therapist Booking System
 Therapist Booking System - Portfolio - Development Phase - (DLBCSPJWD01)​ - Adrian Moreland Fernandez   

 This is a web applicating where users can register and, after logging in correctly, select an available slot to be booked with their therapist. Upon successful booking, they receive a confirmation email and can directly meet the therapist at the clinic, preventing schedule talk during the sessions to make them more efficient.    

 It also serves as a presentation card for the therapist to explain the type of therapy provided, pricing and other details.  

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Dependencies](#dependencies)
- [Endpoints](#endpoints)
- [Login](#login)
- [Test Data](#test-data)
- [Test Cases](#test-cases)


## Installation 
To set up the Doctor Patient Appointment Booking System, follow these steps:
1. Install node.js from manufacturer website.
2. Clone the repository or download the source code files.
3. Go to the backend folder using command cd backend
4. Install the required dependencies by running the following command:
   
   `npm install`
5. Create a .env file in the project's root directory and provide the necessary environment variables. The required variables include:


```env
PORT= //The desired port to run the application
DATABASE_URL= //The MongoDB URL to be used in the application
SECRET="// the desired secret for user authentication"
```

## Usage
Once all necessary dependencies have been installed, you can start the application by running following command from the root directory:
```node server.js```


The server will start running at the specified port, which can be accessed by searching *localhost:PORT* in the browser.

## Code Structure
The code for the Doctor Patient Appointment Booking System is organized into different files and directories. Here's an overview of the code structure:

therapist-booking-system    
├─ .**env** *(Necessary environment variables)*    
├─ .gitignore    
├─ **controllers**    
│  ├─ **Appointment.js** *(Controller responsible for handling appointment-related routes and operations)*   
│  ├─ **middleware.js** *(defines custom middleware functions and exports them - mainly defines the isLoggedIn middleware)*    
│  ├─ **Todo.js** *(Defines various routes for handling CRUD operations on Todo items - mainly ensures user is logged in)*    
│  └─ **User.js** *(Controller responsible for handling user-related routes and operations)*     
│    
├─ **db**    
│  └─ **connection.js** *(Establishes the connection to the database URL provided)*  
│   
├─ **mailer.js** *(Configures the Nodemailer transporter for sending emails)*    
│   
├─ **models**    
│  ├─ **Appointment.js** *(Defines the Mongoose schema and model for appointments)*    
│  ├─ **Todo.js** *(Defines the Mongoose schema and model for Todo items)*    
│  └─ **User.js** *(Defines the Mongoose schema and model for users)*    
│   
├─ **package.json** *(contains information about the application, as well as all dependencies to run it)*   
│  
├─ **public**    
│  ├─ **css**    
│  │  └─ **styles.css** *(Styling of the site)*  
│  │  
│  ├─ **images**       
│  │  ├─ **about-me.jpg**  *(Image in  the about me section)*    
│  │  └─ **hero-image.jpg** *(Hero image)*   
│  │    
│  ├─ **index.html**  *(Main entry point for the application. Defines the structure and content of the web page)*   
│  │  
│  └─ **js**  
│        └─ **main.js** *(Frontend javascript file)*    
│    
├─ **README.md**     
│   
└─ **server.js** *(Main entry point for the Node.js and Express.js application. It sets up the web server, defines routes, and configures middleware.)*   

## Endpoints

### User Endpoints     
**Create new user**    

- Endpoint: `POST /user/signup`
- Description: Creates a new user in the system.    

**Login existing user**    

- Endpoint: `GET /user/login`
- Description: Verify user and get a token.

**Retrieve all users**    

- Endpoint: `Get /user/all`
- Description: Retrieve all users in the system.    


  
### Appointments Endpoints     
**Create Appointment**     

- Endpoint: `POST /appointment/create`    
- Description: Creates a new appointment in the system.    

**Retrieve appointment by date**      

- Endpoint: `GET /appointment/get-booked-appointments`    
- Description:  Retrieve booked appointments for a specific date.    

**Retrieve appointment by user**    
 
- Endpoint: `GET /appointment/get-user-appointments`   
- Description:  Retrieve booked appointments for logged in user.    

**Cancel appointment**       

- Endpoint: `GET /appointment/cancel/:id`    
- Description:  Retrieve appointment by ID and delete it.    
  

## Dependencies 
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.6.3",
    "nodemailer": "^6.9.6"

## Login
You can create an account providing *at least* a correct email and a password, and then login with those.  
     
When you create an appointment, you will receive an email from the therapist mock email I created (**janekeegan.psychology@gmail.com**).    

## Test Data
1. Login Credentials
At the moment, I have created two users, one for the therapist and one with my university email.
Here is how the documents look in the database:   
```   
{
  "_id": {
    "$oid": "653135a08f64612609240cdd"
  },
  "name": "Jane",
  "surname": "Keegan",
  "username": "janekeegan.psychology@gmail.com",
  "phone": "111111111",
  "password": "$2a$10$K8LvmnZd5.CgvCGLxvwBh.1rHHOzooA/5tiKKj5O3yw/VHbTflbOq",
  "__v": 0
}
```


2. Appointments Data
I have created many appointments with my university email account to populate the unavailable time slots in the website.
Here is how the documents look in the database:
```
{
  "_id": {
    "$oid": "653139d00043a1175c0c9c02"
  },
  "username": "adrian.moreland-fernandez@iu-study.org",
  "date": {
    "$date": "2023-10-19T00:00:00Z"
  },
  "start_time": "13:00",
  "end_time": "14:00",
  "notification_method": "Email",
  "__v": 0
}
```


## Test Cases

| Test Case Name       | Step | Action                 | Test Data         | Result                          |
|----------------------|------|------------------------|-------------------|---------------------------------|
| Launch Site          | 1    | Run `node server.js` in root directory | -             | Server starts                   |
|                      | 2    | Go to `localhost:PORT` in browser | -             | Page is displayed               |
| User Sign Up         | 1    | Click on "Login" in Navbar menu | -               | Login popup is displayed        |
|                      | 2    | Click "Create an Account" | -                | Register popup displayed + Login popup hidden |
|                      | 3    | Enter Name               | John             | Input = John                     |
|                      | 4    | Enter Surname            | Doe              | Input = Doe                      |
|                      | 5    | Enter Email              | john.doe@email.com | Input = john.doe@email.com    |
|                      | 6    | Enter Phone              | 123 456 789      | Input = 123 456 789              |
|                      | 7    | Enter Password           | abcdef           | Input = abcdef                   |
|                      | 8    | Click on "Sign Up" button | -               | Account + Database document created |
|                      | 9    | (optional) Click "Back" Button | -            | Login Popup displayed + Register Popup Hidden |
| User Login           | 1    | Click on "Login" in Navbar menu | -            | Login popup is displayed         |
|                      | 2    | Enter Email              | john.doe@email.com | Input = john.doe@email.com    |
|                      | 3    | Enter Password           | abcdef           | Input = abcdef                   |
|                      | 4    | Click on "Login" button | -               | Account fetched from DB + user logged in correctly |
|                      | 5    | (optional) Error         | Wrong details    | iziToast Error message          |
| New Appointment     | 1    | Click "Make an appointment" button | -         | Calendar + time slots visible    |
|                      | 2    | Pick available date      | Weekday + not past date | Time slots updated |
|                      | 2(2) | Pick unavailable date    | -               | izitToast error message          |
|                      | 3    | Pick available time slot | -               | Time slot selected               |
|                      | 4    | Click "Confirm" button   | -               | Confirm appointment table visible |
|                      | 5    | Review + click "Make Appointment" button | - | Appointment confirmed + submit to DB + send emails |
| Manage Appointments  | 1    | Click "Make an appointment" button | -         | Appointment Manager visible     |
|                      | 2    | Review appointment table | -               | -                                |
|                      | 3    | Click on "Cancel" button | -               | Appointment deleted from DB and Table |
| Contact Form         | 1    | Enter Name               | John Doe         | Input = John Doe                 |
|                      | 2    | Enter Email              | john.doe@email.com | Input = john.doe@email.com  |
|                      | 3    | Enter Message            | Test             | Input = Test                     |
|                      | 4    | Click "Send" button      | -               | Email Sent to therapist          |
|                      | (optional) Click "Cancel" | -               | Input Form emptied                |

   
