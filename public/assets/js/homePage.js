/* -- Background image -- */
body {
    background-image: url(../img/wood.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* -- Login element -- */
#center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 15%;
    box-shadow: 2px 2px 4px 3px #505050;
    width: 30%;
    height: auto;
    position: absolute;
}

/* -- CueClick Logo -- */
#logo {
    max-width: 80%;
    width: 80%;
    height: auto;
    position: relative;
}

#para {
    position: relative;
    font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
    font-size: 2vw;
    max-width: 100%;
    height: auto;
    line-height: 2%;
}

/* -- Sign in button -- */
#authorize-button {
    position: relative;
    font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
    font-size: 1.5vw;
    margin-bottom: 2%;
}

#authorize-button:hover {
    cursor: pointer;
}

/* -- Style for button overlays -- */
.overlay {
    right: 1.5%;
    width: 4.5vw;
    height: 4.5vw;
    border: 0;
    border-radius: 50%;
    z-index: 2;
    color: #5b7193;
    opacity: 0;
}

.overlay:hover {
    opacity: 0.4;
    transition: 200ms ease-out;
}

/* -- Style for side buttons -- */
#side-buttons {
    position: fixed;
    bottom: 1.5%;
    right: 1.5%;
    width: 4.5vw;
    height: 11vw;
}

/* -- New presentation button -- */
#new-presentation {
    position: absolute;
    display: none;
    top: 0;
    width: 4.5vw;
    height: 4.5vw;
}

#bottom-presentation {
    position: absolute;
    top: 0;
    width: 4.5vw;
    height: 4.5vw;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    border: 0;
    font-size: 4vw;
    font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
}

#top-presentation {
    position: absolute;
    top: 0;
}

/* -- Sign out button -- */
#signout-button {
    position: absolute;
    display: none;
    bottom: 0;
    width: 4.5vw;
    height: 4.5vw;
}

#bottom-button {
    position: absolute;
    bottom: 0;
    width: 4.5vw;
    height: 4.5vw;
    z-index: 1;
}

#top-button {
    position: absolute;
    bottom: 0;
}

/* -- iframe -- */
#slides {
    display: none;
}
