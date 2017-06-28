## Motivation

Presentations are important; they communicate and sell our ideas to a target audience. We try to perfect our presentations, but it can be expensive and bothersome to do so. Why? For a start, we need to control the slides during our presentation. Unfortunately, depending on our teammates can result in slides being confusingly out of sync with our presentation while a clicker is bulky, easy to forget, and not necessarily cheap (especially for students). Additionally, we may wish to reference our scripts during the presentation, but fumbling with a stack of cue-cards or worse, forgetting to bring the cue-cards can effectively destroy the entire presentation.

This then begs the question: can we control our presentations in a cheaper and more convenient way?

## Aim

We hope to facilitate presentations by allowing users to refer to scripts and control slides remotely through their mobile devices.

## Scope of project

The web-application provides a site for users to show their presentation from their desktop, and to control their slides using their mobile phones.

Consequently, this site has to be accessible on both desktop and mobile to allow for real time communication between the devices. On the desktop, users will be able to log into their Google Drive accounts to select their presentation slides. Meanwhile, the mobile end combines the functionalities of clickers and cue cards to give users remote control of their presentations while displaying their scripts on their phones.

By mid-late June, the Minimum Viable Product (MVP) will be mostly completed, allowing for the main functionality of controlling the slides in the chosen presentation remotely.

By mid-late July, a working prototype will be completed, fulfilling the second main functionality of script display on mobile during the presentations. Additional features may also be implemented depending on the time constraints and work progress.

## Features implemented

### Web
- Authenticate users via Google sign-in
- Allow users to choose their intended presentation
- Display intended presentation in an expendable iframe
- Switch slide display in response to mobile controls
- Allow users to choose a new presentation
- Allow users to sign out of the web application

### Mobile

- Allow users to control the presentation by swiping left and right

## Instructions -- How to run the code

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
   - Note that you must join this Google group for now before testing the application: https://groups.google.com/forum/#!forum/risky-access-by-unreviewed-apps.

   This is because we have yet to submit this form: https://support.google.com/code/contact/oauth_app_verification which will be done at a
   later date after deployment
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
