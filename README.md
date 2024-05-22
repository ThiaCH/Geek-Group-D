## Attendance Login Application (Prototype Concept)

The Attendance Login Application is designed to streamline the process of monitoring and managing attendance for a certain educational institution. <br/>
This prototype concept is intended to provide a user-friendly interface that caters to both administrators and students by enhancing efficiency and accessibility.

## How to use this application

<h3>Login Page</h3>
The login page serves as the entry point for all users. It requires your email address and password to authenticate your identity before gaining access to the respective functionalities of the application.

<h3>Sign Up Page</h3>
New users can create their account on the sign up page. This page prompts the user to provide essential information such as name, contact number, email address and password. After completion of the new sign up, the user's information will be log into the User Database for verification purposes.

<h3>Administrator Login </h3>

Once logged in, administrators gain access to several key functionalities:

   <li> <b>Attendance Page:</b> Administrators can view, record, and manage attendance records. This includes the ability to check attendance, view historical attendance data on students who are late or absent from classes. It also allows the administrator some admin rights to ammend the data if there are errors or changes to be made.

   <li> <b>Upcoming Event Page:</b> This page lists all upcoming events, allowing administrators to manage and schedule events such as seminars, workshops, 
   and promotion sales events.
      
   <li> <b>Resource Page:</b> A repository for administrators to manage and distribute recommended resources for students to supplement their learning.

<h3>Student Login</h3>

Students logging into the application will trigger system to automatically log the time of login as to help adminstrator mark the attendance of the student. Upon login, students will access the following features:

   <li> <b>Dashboard Page:</b> The dashboard offers a snapshot of the upcoming events, and learning resources for student after they login their attendance at the Login Page. 
   It serves as a mini notice board for students to check on daily events and lesson structure during their course at the institution. 
      
   <li> <b>Update Student Profile Page:</b> Students can update their personal information, such as name, contact number and email address to ensure that their records are current and accurate.

## Getting Started

### Deployment

The app has been deployed on Render, click [Here](https://project-3-geekery.onrender.com) to get started.

### Project Planning Board

Visit our [Trello](https://trello.com/b/17ZLjKPd/ga-project-3) to see the User Story, Wireframe and other project components.

### Pitch-Deck

Check out the [Pitch Deck](https://docs.google.com/presentation/d/1pmXCqy-pmqfGB4BjrsLq_Y2gYPtToeyv_4YKaHbxnZc/edit?usp=sharing) for a quick glimpse on how we identify the problem, ideate and generate solutions.

## Technologies Used:

<ul>
  <li>MongoDB + Mongoose  
  <li>Express with Node.js 
  <li>React in Vite
  <li>BootStrap (CSS)
  <li>Git & GitHub
  <li>Render(Cloud Hosting)
</ul>

## Screenshots

Below is the initial wireframe for this application. Some design layout were adjusted slightly during the development phase but generally majority remains as it is.

## Challenges during the making of this application

Apart from the team Git collaboration, which appeared to be the most challenging task as we first started but slowly became an ease as we progressed down the path. Our team encountered following difficulties in the midst of development though some of them had been conquered by the team efforts:

- The connection between frontend (React) and backend database (in our case, MongoDB) is not obvious, the flow of data is strictly controlled by Express which is the middleware, any part that went wrong during this interaction, such as an incorrect Fetch call, or failure in the return of res.json, would prevent the data from rendering in the webpage, and it could be time-consuming to troubleshoot without knowing the source of error. The complexity of problem can increase especially when we have more components that interconnect with one another. I had to double-check the spelling carefully because such mistakes were often unnoticeable and tough to identify.

- The timezone issue. As the app is deployed on Render and the time-server there is different to the local time server. As a result, anything function that associates to time although may have worked perfectly during local testing phase, it turned out to not work as intended after deploying. As this prototype is conceptualized and catered for local institute, it needs to synced with local timezone. Enormous efforts were spent to overcome the timezone constraint, yet the outcome is not as promising and continual research is required from a future enhancement perspective.

## Key Learnings

1. Effective communication is the key to successful team collaboration. Throughout this project, we exchanged our ideas promptly to help each other break the bottle-neck in ideation. We also timely conveyed our changes and engaged actively in discussions prior to merging the changes into our main git branch. This ensured we have minimal conflicts during merging and saved a lot of time and efforts from dealing with errors.

2. Apart from utilizing in-built hooks like useState, useEffect etc, also learned to create custom hooks for use in a class component to pass props.

3. Learned good practices in designing RESTful APIs in Express to handle different HTTP methods, perform CRUD operations in databases, and manage errors gracefully by implementing robust error handling on both the frontend and backend.

## Moving Forward (Future Enhancement)

- Integrate student login page with a QR system that generates an unique QR code each calendar day, so to avoid re-use of the same login url and abuse the attendance logging system.

- Implement a Forget Password feature where students and adminstrators can retrieve and reset their account password by email. This requires a SMTP server.

- On student dashboard, display events that are only dedicated for the class that the student is assigned to.

## Credit(s)

<ul>
   <li> Kristine (Administrator for General Assembly Singapore) 
</ul>
