## UPDATE

To test the currently available code, make sure that you do the following after cloning it:

   - Make sure you have Node installed: https://nodejs.org/en/download/

   - Go to https://console.developers.google.com and start a new project (if you don't have one yet)
   - Go to Credentials --> Create Credentials --> Web Application (Configure the consent screen
       accordingly if necessary)
   - After that, create an API Key as well by pressing Create Credentials --> API key
   - Go to Dashboard --> Enable API and search for and enable three APIS:
        - Google Slides API
        - Google Drive API
        - Google Picker API
   - Update the code with the respective client key and API key (meaning the code in `homePage.js` which is in the `js` folder
   - Go to the terminal/command line, and type in the following commands:
        - `npm install express`
        - `npm install express-static`
        - `npm install socket.io`
    (Alternatively, simply type `npm install` while in the project folder since the dependencies
    are already stated in `package.json`)
   - To run the code, go to the terminal and type `node server.js` (make sure you are in the correct directory, i.e. the `assets` folder)
   - Go to `localhost:8000` to see the result on your desktop
   - Now, you can also go to your mobile phone, and enter the corresponding ipv4 address,
   along with the port (e.g. 129.168.1.209:8000) to see the mobile site

## TODO

There are several ideas to be implemented/ considered:

- Update mobile end when there are slide changes on desktop
- Proper sign out procedure
- An option to start another presentation?
- Presenter's notes on mobile

## Aim

We hope to facilitate presentations by allowing users to refer to scripts and control slides remotely through their mobile devices.

## Scope of project

The web-page provides a site for users to show their presentation slides, and reflects what the audience will see during the presentation.

The phone application will rely on the same Google Slides API as the web-page, and combines the functionalities of clickers and cue cards to give users remote control of their presentations while displaying their scripts on their phones.

Features to be completed by mid-late June:

The Minimum Viable Product (MVP) will be mostly completed, allowing for the main functionalities of remote control and script reading via mobile devices.
The web-page:
   - Can be synced with the mobile application
   - Reflects slides which the target audience will see during presentations

Mobile application:
   - Allows users to sign into their google drive accounts, and access their google slides via the application
   - Allows users to choose their intended presentation
   - Generates a random ‘secret key’ for syncing
   - Can be synced with the web-page
   - Controls the presentation by swiping left and right

Features to be completed by mid-July:

Script display
   - Display the script during the presentation

Termination feature
   - Allows for the presentation to be terminated at any time
