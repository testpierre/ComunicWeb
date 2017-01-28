/**
 * User functions
 * - Login tokens
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.user.loginTokens = {
    /**
     * Set User tokens
     * 
     * @param {Object} tokens The token object
     * @param {Type} storageType The token destination (local or session)
     */
    setUserTokens: function(tokens, storageType){
        //First, we check if there is any login token available
        this.deleteLoginTokens();

        //We encode login tokens
        var tokensArray = JSON.stringify(tokens);

        //We store login tokens
        //If localStorage is required
        if(storageType == "local"){
            localStorage.setItem("loginTokens", tokensArray);
        }
        else {
            //Session storage
            sessionStorage.setItem("loginTokens", tokensArray);
        }

        //Everything is OK
        return true;

    },

    /**
     * Check if there is any login tokens available
     * 
     * @return {Boolean} True or false, depending of the result
     */
    checkLoginTokens: function(){
        //First, check in local storage
        if(localStorage.getItem("loginTokens") != "null"){
            //It is OK
            return true;
        }

        //Check if we have to remove any thing in session storage
        if(sessionStorage.getItem("loginTokens") != "null"){
            //It is OK
            return true;
        }

        //Else there isn't login token available
        return false;
    },

    /**
     * Get login tokens
     * 
     * @return {Object} Login tokens, if they exists (false in failure)
     */
    getLoginTokens: function(){
        //First, check in local storage
        if(localStorage.getItem("loginTokens") != "null"){
            //Return localStorage login tokens
            var loginTokenString = localStorage.getItem("loginTokens")
        }

        //Then, check in session storage
        if(sessionStorage.getItem("loginTokens") != "null"){
            //Return session storage login token
            var loginTokenString = sessionStorage.getItem("loginTokens")
        }

        //Check if we didn't get any login token
        if(!loginTokenString){
            return false;
        }

        //Decode the login token
        var loginTokens = JSON.parse(loginTokenString);

        //Returns the result
        return loginTokens;
    },

    /**
     * Perform user logout (delete tokens)
     */
    deleteLoginTokens: function(){
        //Check if we have to remove any thing in local storage
        if(localStorage.getItem("loginTokens") != "null"){
            //Remove the key
            localStorage.removeItem("loginTokens");
        }

        //Check if we have to remove any thing in session storage
        if(sessionStorage.getItem("loginTokens") != "null"){
            //Remove the key
            sessionStorage.removeItem("loginTokens");
        }
    }
};