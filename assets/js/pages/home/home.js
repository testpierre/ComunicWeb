/**
 * Common homes functions
 * 
 * @author Pierre HUBERT
 */
ComunicWeb.pages.home.home = {
    /**
     * Open home page
     * 
     * @param {Object} additionnalData Additionnal data passed in the method
     * @param {element} targetElement Where the template will be applied
     * @returns {Boolean} False if it fails
     */
    openHomePage: function(additionnalData, targetElement){
        //Check wether if user is logged in or not
        var userLoggedIn = ComunicWeb.user.userLogin.getUserLoginState();

        //Check if user is in or not
        if(userLoggedIn){
            //Dev feature : Show result
            targetElement.appendChild(ComunicWeb.common.messages.createCalloutElem("", "User logged in !", "info"));
            
            //Create logout button
            var loginButton = document.createElement("button");
            loginButton.onclick = (function(){
                ComunicWeb.common.page.openPage("logout");
            });
            loginButton.innerHTML="Logout";
            targetElement.appendChild(loginButton);

        }
        else{
            //Display landing page
            ComunicWeb.pages.home.landingPage.display(targetElement);
        }

        //Everything seems to be OK
        return true;
    }
};