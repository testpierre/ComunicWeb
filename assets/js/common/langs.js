/**
 * Lang functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Get current language
 *
 * @return {String} The id of the current language
 */
ComunicWeb.common.langs.getCurrentLanguage = function(){
    return "fr";
    //return ComunicWeb.__config.defaultLanguage;
};

/**
 * Include and install specified language
 * 
 * @param {String} languageID The languageID to install
 */
ComunicWeb.common.langs.installLanguage = function(languageID){
    //Generate filename to include
    var fileToInclude = ComunicWeb.__config.languagesPath + languageID + ".inc.js";

    //Include filename
    ComunicWeb.common.jsFiles.includeFile(fileToInclude);
};

/**
 * Language initiator
 * 
 * @return Boolean False if it fails
 */
ComunicWeb.common.langs.initLanguages = function(){
    //Debug message
    ComunicWeb.debug.logMessage("Get and install languages...");

    //Get languages to install
    this.__currentLang = this.getCurrentLanguage();
    this.__defaultLang = ComunicWeb.__config.defaultLanguage;
    
    //Install default language (made by default)
    //this.installLanguage(this.__defaultLang);

    //If selected language is different than default one, install it too
    if(this.__currentLang !== this.__defaultLang)
        this.installLanguage(this.__currentLang);
    
    //Everything is OK
    return 0;
}

/**
 * Return a string in correct language
 * 
 * @param {String} stringName The name of the string to show
 * @param {Array} stringParams The optionnal parametres to include with the string
 * @return {String} The string ready to show
 */
ComunicWeb.common.langs.getTranslatedText = function(stringName, stringParams){
    //Try to get string
    if(this[this.__currentLang][stringName])
        var string = this[this.__currentLang][stringName];
    else if(this[this.__defaultLang][stringName])
        var string = this[this.__defaultLang][stringName];
    else
        var string = "No Translated String";
    
    //Change string with parametres if required
    if(stringParams){
        for(i in stringParams){
            string = string.replace("%p", stringParams[i]);
        }
    }

    return string;
}