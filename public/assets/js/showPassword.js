var p = document.getElementById("pwd");
var cancelSign = document.getElementById("cancelEye");

//Shows the password when it is hidden
function show() {
    p.setAttribute('type', 'text');
    cancelSign.style.display = 'block';
}

//Hides the password when it is shown
function hide() {
    p.setAttribute('type', 'password');
    cancelSign.style.display = 'none';
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
