/**
 * User informations functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.user.userInfos = {

    /**
     * @var {String} User infos cache
     */
    usersInfos: {},

    /**
     * Get user informations
     * 
     * @param {String} userID User on which to make request (current to get connected user)
     * @param {function} afterGetUserInfos What to do once user informations are available
     * @return {Boolean} False if it fails
     */
    getUserInfos: function(userID, afterGetUserInfos){
        //First, check if informations are already available in the cache
        if(this.usersInfos[userID])
            afterGetUserInfos(this.usersInfos[userID]); //Then return these informations now
            
        //Else we have to perform an API request
        if(userID == "current" || userID == ComunicWeb.user.userLogin.__userID){
            var apiURI = "user/getCurrentUserInfos";
            var params = {};
        }
        else{
            ComunicWeb.debug.logMessage("ERROR : getUserInfos not implemented for other user than the current one !");
            return false;
        }

        //Specify what to do next
        var onceGetUserInfos = function(result){
            if(result.error){
                ComunicWeb.debug.logMessage("ERROR : couldn't get infos about user ID : "+userID+" !");
                return false;
            }
            
            //Save result
            ComunicWeb.user.userInfos.usersInfos[""+userID] = result[0];

            //Return result
            afterGetUserInfos(result[0]);
        }

        //Perform request
        ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, onceGetUserInfos);

        //Everything is OK
        return true;

    },

    /**
     * Empty user informations cache
     * Remove all entries from user informations cache
     * 
     * @return {Boolean} True for a success
     */
    emptyUserInfosCache: function(){
        this.userInfos = undefined; //Mark user info cache as undefined
        this.userInfos = {}; //Create a new variable

        return true;
    },
}