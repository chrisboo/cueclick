//Shows the password when it is hidden
function show() {
    var p = document.getElementById("pwd");
    p.setAttribute('type', 'text');
}

//Hides the password when it is shown
function hide() {
    var p = document.getElementById("pwd");
    p.setAttribute('type', 'password');
}

var pwShown = 0;

//Function to toggle between showing and hiding the password when eye is clicked
document.getElementById("eye").addEventListener("click", function() {
    if (pwShown === 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);
