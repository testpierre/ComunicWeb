/**
 * Logout page main controller
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.logout = {

    /**
     * Open logout page and perform logout
     * 
     * @param {Object} additionnalData Additionnal data passed in the method
     * @param {element} targetElement Where the template will be applied
     * @returns {Boolean} False if it fails 
     */
    openLogoutPage: function(additionnalData, targetElement){
        //Enable screen overlay
        var screenOverlay = ComunicWeb.common.page.showTransparentWaitSplashScreen();

        //Perform logout
        ComunicWeb.user.userLogin.logoutUser();

        //Clean all caches
        ComunicWeb.common.system.reset(true, "home");

        //Remove overlay
        screenOverlay.remove();
    },

};