/**
 * Login page controller
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.login = {
    /**
     * Open login page
     * 
     * @param {Object} additionnalData Additionnal data passed in the method
     * @param {element} targetElement Where the template will be applied
     * @returns {Boolean} False if it fails 
     */
    openLoginPage: function(additionnalData, targetElement){
        //First, check if user is already logged in or not
        if(ComunicWeb.user.userLogin.getUserLoginState() === true){
            //Log message
            ComunicWeb.debug.logMessage("Couldn't open login page because user is already logged in !");

            //Open home page
            ComunicWeb.common.page.openPage("home");

            //Quit page
            return false;
        }

        //Prepare additional data
        var additionalData = {};

        //Preparing next actions
        var afterParsingTemplate = function(){
            //Change body class name
            document.body.className = "login-page hold-transition";

            //Enable iCheck
            $(function () {
                $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
                });
            });
        };

        //Apply template
        ComunicWeb.common.page.getAndShowTemplate(targetElement, additionalData, "pages/login/loginPage.tpl", afterParsingTemplate, true);
    }
};