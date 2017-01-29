/**
 * Manage user login
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.user.userLogin = {

    /**
     * @var {Boolean} Store user login state (true by default)
     */
    __userLogin: true,

    /**
     * @var {Integer} Store the current user ID
     */
    __userID: 0,


    /**
     * Tell if user is logged in or not
     * 
     * @return {Boolean} Depend of the result
     */
    getUserLoginState: function(){
        //Return login state
        return this.__userLogin;
    },

    /**
     * Get user ID (if logged in)
     * 
     * @return {String.Boolean} User ID or false if not logged in
     */
    getUserID: function(){
        //If user is logged in
        if(this.getUserLoginState === true){
            //Return user ID
            return this.__userID;
        }
    },

    /**
     * Try to get and store current user ID
     * 
     * @param {function} afterGetCurrentUserID What to do next
     * @return {Integer} 0 if it fails
     */
    getCurrentUserId: function(afterGetCurrentUserID){
        //Prepare and make an API request
        var apiURI = "user/getCurrentUserID";
        var params = {};
        var requireLoginTokens = true;

        //What to do after the request is completed
        var afterAPIrequest = function(result){
            //Check if we got any error
            if(result.error){
                //Set user ID to 0 (security purpose)
                ComunicWeb.user.userLogin.__userID = 0;

                //Perform next action
                afterGetCurrentUserID(0);
            }
            else{
                //Update user ID
                ComunicWeb.user.userLogin.__userID = result.userID;

                //Perform next action
                afterGetCurrentUserID(result.userID)
            }

        };

        //Perform request
        ComunicWeb.common.api.makeAPIrequest(apiURI, params, requireLoginTokens, afterAPIrequest);
    },

    /**
     * Refresh the user login state
     */
    refreshLoginState: function(){
        //First, check if we have login tokens
        if(ComunicWeb.user.loginTokens.checkLoginTokens() !== true){
            //Specify the user isn't logged in
            this.__userLogin = false;
            this.__userID = 0;

            //User not logged in
            return false;
        }

        //Try to use tokens to get user infos
        var nextStep = function(userID){
            //We check received data
            if(userID == 0){
                //We consider user is not logged in
                 ComunicWeb.user.userLogin.__userLogin = false;
            }
        };
        this.getCurrentUserId(nextStep);
    },

    /**
     * Try to login user
     * 
     * @param {String} usermail The mail of user
     * @param {String} userpassword The password of the user
     * @param {Boolean} permanentLogin Specify wether the login is permanent or not
     * @param {function} afterLogin What to do next
     */
    loginUser: function(usermail, userpassword, permanentLogin, afterLogin){
        //Prepare and make an API request
        var apiURI = "user/connectUSER";
        var params = {
            userMail: usermail,
            userPassword: userpassword,
        };

        //What to do after the request is completed
        var afterAPIrequest = function(result){
            //Prepare data return
            var loginstate = false;
            
            //Check if there is a success message
            if(result.success){
                loginstate = true;

                //Indicates user is logged in
                ComunicWeb.user.userLogin.__userLogin = true;
                
                //Store tokens
                if(permanentLogin){
                    var storageType = "local";
                }
                else {
                    storageType = "session";
                }
                ComunicWeb.user.loginTokens.setUserTokens(result.tokens, storageType);
            }

            //Perform next action
            afterLogin(loginstate);

        };

        //Perform request
        ComunicWeb.common.api.makeAPIrequest(apiURI, params, afterAPIrequest);

    }
}