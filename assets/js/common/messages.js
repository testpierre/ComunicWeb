/**
 * Messages functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a callout element and return it
 * 
 * @param {String} calloutTitle The title of the callout
 * @param {String} calloutMessage The message of the callout
 * @param {String} calloutType The type of the callout (danger, info, warning, success)
 */
ComunicWeb.common.messages.createCalloutElem = function(calloutTitle, calloutMessage, calloutType){
    //Prepare callout message
    calloutMessage = "<p>" + calloutMessage + "</p>";
    
    //By default, it is an info callout
    if(!calloutType)
        var calloutType = "info";

    //Create callout main contener
    var calloutElem = document.createElement('div');
    calloutElem.className = "callout callout-" + calloutType;

    //Add title
    var calloutTitleElem = document.createElement("h4");
    calloutTitleElem.innerHTML =  calloutTitle;
    calloutElem.appendChild(calloutTitleElem)

    //Add callout body
    var calloutBody = document.createElement("div");
    calloutBody.innerHTML = calloutMessage;
    calloutElem.appendChild(calloutBody);

    //Return created element
    return calloutElem;
}