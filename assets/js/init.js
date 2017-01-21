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
     * Prepare login
     */
    //Clean current page content
    ComunicWeb.common.page.emptyPage();
    
    //Show a wait splash screen
    ComunicWeb.common.page.showWaitSplashScreen();

    /**
     * Language initator
     */
    ComunicWeb.common.langs.initLanguages();

    /**
     * Open a page
     */
    //Get current page URI
    var currentPage = ComunicWeb.common.url.getCurrentWebsiteURL();

    //Open a page
    ComunicWeb.common.page.openPage(currentPage);

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