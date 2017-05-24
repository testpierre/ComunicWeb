/**
 * Utilities functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a new HTML node
 * 
 * @param {String} nodeType The type of the HTML node
 * @param {HTMLElement} appendTo Optionnal, defines node on which the new node will be applied
 * @return {HTMLElement} The newly created element
 */
function createElem(nodeType, appendTo){
	var newElem = document.createElement(nodeType);

	if(appendTo)
		appendTo.appendChild(newElem);

	//Return result
	return newElem;
}

/**
 * Get an HTML element specified by an ID
 * 
 * @param {String} nodeName The ID of the element
 * @return {HTMLElement} The elemnt / False for a failure
 */
function byId(nodeName){
	return document.getElementById(nodeName);
}

/**
 * Check a given email address
 * 
 * @param {String} emailAddress The email address to check
 * @return {Boolean} True for a valid email address / false else
 */
function checkMail(emailAddress){
	return (emailAddress.match(/^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]{1,}[.][a-zA-Z]{2,5}$/) === null ? false : true);
}

/**
 * Create a quick language access function shorcut
 */
function lang(stringName, stringParams){
    //Check if any params has been specified
    if(!stringParams)
        var stringParams = [];

    //Call translate function
    return ComunicWeb.common.langs.getTranslatedText(stringName, stringParams);
}