#Toptal Travel Readme
##Project structure
The project contains 2 sub-projects: toptal (the FE code) and total-server
(the BE code).

###Server
- This is written in node.js. It requires 2 private files:
  - **private.pem** - this contains the private key that supports the JWT encryption.
  - **.env** - this contains the environment variables
      - PORT - the port to watch for incoming RestAPI calls
      - DB_HOST - for the DB connection
      - DB_USER - for the DB connection
      - DB_PASSWORD - for the DB connection
      - DB_DATABASE - for the DB connection
- To start the server use `node toptal-server/index.js`

###Front-End
- This is written using React. It requires 1 private file:
  - **public/config.js** - this contains config options:
    - **API_URL** - the path to the node server application
- To start the application use `cd toptal;npm start`

###Database
- The database is mysql version 8. It is pretty straightforward and could
probably run on older versions. To begin the application:
  - run the startup script `startup.sql`. It will create the DB
and the initial tables.
  - add a row to the user table for the super user
```
INSERT INTO `toptal`.`users` (
    `userId`,
    `userName`,
    `password`,
    `role`
)
VALUES (
    <the admin user id (valid email address)>,
    <the admin fiull name>,
    <a plain text password>,
    'super'
);
```
  - then run `toptal-server/password.js`. This will encrypt the 
  plain text password. Be sure to only run this once. From now on
  all user maintenance should happen within the application.

##Project Notes
- This code was written without knowledge of the final DevOps configuration.
If is to be run in a Docker environment, then it can be easily Dockerized. 
If the final environment is AWS, the node application can be added to an ECS
container and the Front-End code added to a an S3 storage as a web application.
- Given that the final DevOps is unknown, there is no support for emails. The user
id is a valid email address and support could be added fairly easily. In lieu of
email support, when a user is created or their password reset, the FE displays 
a url for the user to use to set their password. This url can be copied into
an email and sent to the user.
- The BE, running locally uses an http connection. When moved to production, 
this would be configured for https. Changing the destination is done via the 
FE config file.
- Logging is another issue dependant on DevOps. At this point in time, errors are
 logged to the console. 
- The UI design is fairly simple. I prefer the simple, clean style of the
Material UI components.
- The UI is responsive and tested to a width of 370 pixels. The user maintenance
page is not as responsive as it was assumed that the admin work would be done
primarily on desktop systems. 
- Messages sent to the Back-End include a JWT token. The token is never parsed
on the FE. The token is currently set for a 24 hour expiry. If an attempt to use
the system after the token is expired results in a message and the user being
redirected to the login page.

