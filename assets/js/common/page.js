/**
 * Page functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.page = {
    /**
     * Empty current page content
     */
    emptyPage: function(){
        //Empty body tag
        document.body.innerHTML = "";

        //Remove body speicific tags
        document.body.className = "";
        document.body.id = "";
        document.body.onclick = "";

        //Log message
        ComunicWeb.debug.logMessage("Clean the screen.");
    },


    /**
     * Show a full wait splash screen
     */
    showWaitSplashScreen: function(){
        //First, empty the screen
        this.emptyPage();

        //Log message
        ComunicWeb.debug.logMessage("Display a wait splash screen the screen.");

        //Create image element
        var imgElem = document.createElement("img");
        imgElem.src = ComunicWeb.__config.assetsURL+"img/roundProgress.gif";
        document.body.appendChild(imgElem);

        //Change body className
        document.body.className = "waitSplashScreen";

    },

    /**
     * Open a page
     * 
     * @param {String} pageURI The URI to the page
     */
    openPage: function(pageURI){
        //Log message
        ComunicWeb.debug.logMessage("Open the following page: " + pageURI);
    }
};