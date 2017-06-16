// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyCSjg3rrx6Obl4ngZsDlFlV4degUJSMvbw';
// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
var discoveryDocs = ["https://slides.googleapis.com/$discovery/rest?version=v1"];
// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
var clientId = '408869653199-ruoft30vmoqrgpku3us3qd2leb3k6tp1.apps.googleusercontent.com';
// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
var scopes = 'https://www.googleapis.com/auth/presentations.readonly https://www.googleapis.com/auth/drive';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var user;
var authResponse;
var oauthToken;
var pickerApiLoaded = false;

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
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Set the current Google User
      gapi.auth2.getAuthInstance().currentUser.listen(updateUser);
      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

// Callback to make sure that the Picker API has loaded
function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

// Store the current Google user
function updateUser(gUser) {
  user = gUser;
  updateToken();
}

// Store the access token
function updateToken() {
  authResponse = user.getAuthResponse(true);
  oauthToken = authResponse.access_token;
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      createPicker();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
}
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
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

// Callback implementation
function pickerCallback(data) {
      var url = 'nothing';
      if(data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL].replace('edit', 'present');
        alert('You picked ' + url);
        window.location.replace(url);
    }
}
