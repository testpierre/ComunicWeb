/**
 * Comunic WebApp init script
 * 
 * @author Pierre HUBERT
 */

//Anonymous function
(function(){
    
    //Start init
    ComunicWeb.debug.logMessage("Start initialization...");

    /**
     * Language initator
     */
    ComunicWeb.common.langs.initLanguages();

    //End of init
    ComunicWeb.debug.logMessage("Application is ready !");
})();

//Create a quick language access function shorcut
function lang(stringName, stringParams){
    //Check if any params has been specified
    if(!stringParams)
        var stringParams = [];

    //Call function
    return ComunicWeb.common.langs.getTranslatedText(stringName, stringParams);
}