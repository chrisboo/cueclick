## UPDATE

To test the currently available code, make sure that you do the following after cloning it:

   - Go to https://console.developers.google.com and start a new project (if you don't have one yet)
   - Go to Credentials --> Create Credentials --> Web Application (Configure the consent screen
       accordingly if necessary)
   - After that, create an API Key as well by pressing Create Credentials --> API key
   - Go to Dashboard --> Enable API and search for and enable three APIS:
        - Google Slides API
        - Google Drive API
        - Google Picker API
   - Update the code with the respective client key and API key (just index.html for now)
   - Go to the terminal and do `npm install npm install --save @types/gapi` in the project folder
   - Also, do `npm install google-auth-library --save`
   - And `npm install googleapis`

Note that although the current code is written in JavaScript without using NodeJS, the
possibility of switching to nodeJS when refactoring and cleaning up the code after
establishing the basic functionality is not entirely discounted...Hence doing all these
installs.

## Prerequisites

You must have:
   - node
   - npm

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
