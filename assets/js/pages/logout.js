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

        //Show a success notification
        ComunicWeb.common.notificationSystem.showNotification("Good bye, you successfully terminated your session !", "sucess", 5);

        //Open login page
        ComunicWeb.common.page.openPage("home");

        //Remove overlay
        screenOverlay.remove();
    },

};