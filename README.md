### Live Preview : https://calm-shelf-40053.herokuapp.com/ 

# Server section

## About
This is a sample server which will just return a list of user's hardcoded, which is available in the file response.json
**Make sure you are on node 12.0 or above**


## Before starting
Please use 
### `npm install`
to install all the dependencies

##Starting the server,
Use 
### `node app.js`
to start the server, at 1234 port, 
**Remember that if the port number is changed here, it will need to be changed in the react project for ui as well** 



# UI Section

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About the project
This a react project build with Material UI to create a stunning UI/UX for both **Desktop chrome and a Mobile user**, The project demos list of users(hardcoded in the server), each user is clickable, which opens a modal box which shows user activities,Please go through below points to understand the project better.<br/>

Each user which is returned from the server has activity period,name,timeZone of the user.<br/>
Activity period-shows how long the user was active, with a startTime and endTime.<br/>

When the webApp user clicks on these list of users, A modal box is opened, which has the 
user's user activity.Now the modal box also has 2 date inputer which takes fromDate and  
to date for filtering activity (By default the extreme ends of the date will be populated in this input box).<br/>

**Note: The beauty of this project is no matter what timeZone the activity of the user is given to the project, it will identify the local timezone of the person seeing it and covert it to the local time zone**
Eg: if the user activity is 1:33 PM in AMerica/Los_angeles, if the webapp user is in america/los_angeles he will see it as 1:33PM only, but if he is in asia/kolkata timezone he will be seeing it as 2.03 AM (cause thats the time when was active from according to indian time).<br/>

when expanding the individual activity,You will find a time stamp from when to when he was active in an individual session(according to local time Zone),it also has a graph view to show his session<br/>


##Before starting the project 
use <br/>
```npm install```<br/>
to install all the dependencies


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
