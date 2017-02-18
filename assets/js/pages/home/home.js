/**
 * Common homes functions
 */
ComunicWeb.pages.home.home = {
    /**
     * Open home page
     * @param {Object} additionnalData Additionnal data passed in the method
     * @param {element} targetElement Where the template will be applied
     * @returns {Boolean} False if it fails
     */
    openHomePage: function(additionnalData, targetElement){
        //Check wether if user is logged in or not
        var userLoggedIn = ComunicWeb.user.userLogin.getUserLoginState();

        //Dev feature : Show result
        if(userLoggedIn){
            targetElement.appendChild(ComunicWeb.common.messages.createCalloutElem("", "User logged in !", "info"));
        }
        else{
            targetElement.appendChild(ComunicWeb.common.messages.createCalloutElem("", "User not logged in !", "warning"));
        }

        //Everything seems to be OK
        return true;
    }
};