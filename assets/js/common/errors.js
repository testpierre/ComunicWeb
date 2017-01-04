/**
 * Comunic errors handler
 * 
 * @author Pierre HUBERT
 */

/**
 * Show a fatal error
 * 
 * @param {String} errorMessage Error message
 */
ComunicWeb.fatalError = function(errorMessage){
    //Make a black splash screen
    var splashScreen = document.createElement("div");
    splashScreen.style.position = "fixed";
    splashScreen.style.width = "100%";
    splashScreen.style.height = "100%";
    splashScreen.style.top = "0px";
    splashScreen.style.zIndex = "999999";
    splashScreen.style.backgroundColor = "#000000";
    
    //Show a message on screen to inform user
    var messageElem = this.__createCalloutElem("Fatal error", "A fatal error occured : " + errorMessage + ". Please try to refresh the page...", "danger");
    messageElem.style.position = "relative";
    messageElem.style.margin = "auto";
    messageElem.style.width = "50%";
    messageElem.style.top  = "10%";

    //Append the message on the screen
    splashScreen.appendChild(messageElem);

    //Apply splash screen
    document.body.appendChild(splashScreen);

    //Make an API request to submit error
}