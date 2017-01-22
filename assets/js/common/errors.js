/**
 * Comunic errors handler
 * 
 * @author Pierre HUBERT
 */

/**
 * Submit an error
 * 
 * @param {String} errorLevel The level of the error
 * @param {String} errorMessage The message associated with error
 * @param {Integer} errorCode The code of the error
 * @param {String} errorData Data associated with error
 */
ComunicWeb.common.error.submitError = function(errorLevel, errorMessage, errorCode, errorData){
	//Prepare API request
	var apiURI = "webApp/reportError";
	var params = {
		"errorLevel": errorLevel,
		"errorMessage": errorMessage,
		"errorCode": errorCode,
		"errorData": errorData.toSource(),
	}

	//Not any next action for now
	nextAction = function(){};

	//Send API request
	ComunicWeb.common.network.makeAPIrequest(apiURI, params, nextAction);
}

/**
 * Handle and show a fatal error
 * 
 * @param {String} errorMessage The message associated with error
 * @param {Integer} errorCode The code of the error
 * @param {String} errorData Data associated with error
 */
ComunicWeb.common.error.fatalError = function(errorMessage, errorCode, errorData){
	//Each not defined value is empty by default
	if(!errorMessage)
		var errorMessage = "Undefined error message";
	if(!errorCode)
		var errorCode = 0;
	if(!errorData)
		var errorData = {};

    //Make a black splash screen
    var splashScreen = document.createElement("div");
    splashScreen.style.position = "fixed";
    splashScreen.style.width = "100%";
    splashScreen.style.height = "100%";
    splashScreen.style.top = "0px";
    splashScreen.style.zIndex = "999999";
    splashScreen.style.backgroundColor = "#000000";
    
    //Show a message on screen to inform user
    var messageElem = ComunicWeb.common.messages.createCalloutElem(lang("__fatal_error"), lang("__fatal_error_explanation", [errorMessage]), "danger");
    messageElem.style.position = "relative";
    messageElem.style.margin = "auto";
    messageElem.style.width = "50%";
    messageElem.style.top  = "10%";

    //Append the message on the screen
    splashScreen.appendChild(messageElem);

    //Apply splash screen
    document.body.appendChild(splashScreen);

    //Make an API request to submit error
	this.submitError("fatal", errorMessage, errorCode, errorData);
}

/**
 * Handle and show a 404 not found error message
 * 
 * @return {Boolean} True for a success
 */
ComunicWeb.common.error.pageNotFound = function(){
	alert("404 not found");

	//Report error
	var errorData = {
		pageURL: location.href,
	};
	this.submitError("normal", "Page not found", "404", errorData);

	//Everything seems to be OK
	return true;
}