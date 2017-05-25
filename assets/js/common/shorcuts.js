/**
 * This file contains shorcuts to ease access of common functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a quick language access function shorcut
 * 
 * @param {String} stringName The name of the string to show
 * @param {Array} stringParams The optionnal parametres to include with the string
 * @return {String} The string ready to show
 */
function lang(stringName, stringParams){
    //Check if any params has been specified
    if(!stringParams)
        var stringParams = [];

    //Call translate function
    return ComunicWeb.common.langs.getTranslatedText(stringName, stringParams);
}

/**
 * Function to change currently opened page
 * 
 * @param {String} pageURI The URI to the page
 * @param {Object} additionnalData Additionnal data to pass to the new page
 * @return {Boolean} True for a success
 */
function openPage(pageURI, additionnalData){
	return ComunicWeb.common.page.openPage(pageURI, additionnalData);
}