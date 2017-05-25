/**
 * Landing home page
 * 
 * @author Pierre HUBERT
 */
ComunicWeb.pages.home.landingPage = {
    /**
     * Display home landing page
     *
     * @param {element} targetElement Where the page will be applied
     */
    display: function(targetElement){
        //Log action
        ComunicWeb.debug.logMessage("Open home landing page.");

        //Change page title
        document.title = "Comunic, a transparent social network";

        //Prepare additional data
        var additionalData = {};

        //Preparing next actions
        var afterParsingTemplate = function(){

            //Change home background
            byId("homeLandingScreen").style.backgroundImage = "url('"+ComunicWeb.__config.assetsURL + "img/pages/home/landingPage/img_background.jpg')";
        };

        //Apply template
        ComunicWeb.common.page.getAndShowTemplate(targetElement, additionalData, "pages/home/landingPage/home.tpl", afterParsingTemplate, true);
    }
};