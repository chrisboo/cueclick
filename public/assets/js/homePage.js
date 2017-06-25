// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyCSjg3rrx6Obl4ngZsDlFlV4degUJSMvbw';
// Enter the API Discovery Docs that describes the APIs you want to access
var discoveryDocs = ["https://slides.googleapis.com/$discovery/rest?version=v1"];
// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script
var clientId = '408869653199-ruoft30vmoqrgpku3us3qd2leb3k6tp1.apps.googleusercontent.com';
// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details
var scopes = 'https://www.googleapis.com/auth/presentations.readonly https://www.googleapis.com/auth/drive';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var newPresentation = document.getElementById('new-presentation');
var center = document.getElementById('center');
var user;
var authResponse;
var oauthToken;
var pickerApiLoaded = false;
var presentationId;
var presentation;

function handleClientLoad() {
    // Load the API client and auth2 library
    gapi.load('client:auth2', initClient);
    //Load the Picker API
    gapi.load('picker', onPickerApiLoad);
}

function initClient() {
    gapi.auth2.init({
        apiKey: apiKey,
        discoveryDocs: discoveryDocs,
        clientId: clientId,
        scope: scopes
    }).then(function () {
      // Listen for sign-in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle the initial sign-in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // Set the current Google User
      gapi.auth2.getAuthInstance().currentUser.listen(updateUser);
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
  });
}

// Callback to make sure that the Picker API has loaded
function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      center.style.display = 'none';
      signoutButton.style.display = 'block';
      newPresentation.style.display = 'block';
      createPicker();
    } else {
      signoutButton.style.display = 'none';
      newPresentation.style.display = 'none';
    }
}

// Store the current Google user
function updateUser(gUser) {
    user = gUser;
    if (user != null && user != undefined) {
        // If the user is a Google User, update the user token
        if (user.Zi != null) {
            updateToken();
        }
    }
}

// Store the access token
function updateToken() {
  authResponse = user.getAuthResponse(true);
  oauthToken = authResponse.access_token;
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    // Reload the page on signout
    window.location.reload();
}

// Reopen a new picker for selecting another presentation
function openNewPresentation() {
    var pickedBefore = (iframe.style.display === 'block');
    if (pickedBefore) {
        resetIFrame();
    }
    createPicker();
}

// Create and render a Picker object for picking user slides
function createPicker() {
    if (pickerApiLoaded && oauthToken) {
      var picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.PRESENTATIONS).
        setOAuthToken(oauthToken).
        setDeveloperKey(apiKey).
        setCallback(pickerCallback).
        build();
      picker.setVisible(true);
    }
}

// Callback implementation - get the Presentation object using its ID
function pickerCallback(data) {
      if(data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        presentationId = doc[google.picker.Document.ID];
        getPresentation();
    }
}

// Get the presentation by making a GET request to the Google Slides API
// and store the Presentation object in a variable
function getPresentation() {
    // Create a new XMLHttpRequest to get the corresponding slides object
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        url = "https://slides.googleapis.com/v1/presentations/" + presentationId;
    xhr.open(method, url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Get the JSON object (the Presentation) from the returned string
            presentation = JSON.parse(xhr.responseText);
            displayPresentation();
        }
    }
    xhr.send();
}

// Display the chosen presentation in an iframe
function displayPresentation() {
    // Display the presentation in an iframe
    var iframe = document.getElementById('slides');
    iframe.style.display = "block";
    iframe.src = "https://docs.google.com/presentation/d/" + presentation.presentationId + "/embed?start=false&loop=false&delayms=3000";
    iframe.onload = function() {
        initWebControl();
    }
}
