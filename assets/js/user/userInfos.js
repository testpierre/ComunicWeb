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
	 * @return {Boolean} True for a success
	 */
	getUserInfos: function(userID, afterGetUserInfos){

		//If requested user is the current user, replace "current" with userID
		if(userID === "current")
			userID = ComunicWeb.user.userLogin.__userID;

		//First, check if informations are already available in the cache
		if(this.usersInfos["user-"+userID]){
			afterGetUserInfos(this.usersInfos["user-"+userID]); //Then return these informations now
			return true;
		}
			
		//Else we have to perform an API request
		var apiURI = "user/getInfos";
		var params = {
			userID: userID
		};

		//Specify what to do next
		var onceGetUserInfos = function(result){
			if(result.error){
				ComunicWeb.debug.logMessage("ERROR : couldn't get infos about user ID : "+userID+" !");

				//Returns the error to the next function
				afterGetUserInfos(result);

				return false;
			}
			else {
				//Save result
				ComunicWeb.user.userInfos.usersInfos["user-"+userID] = result[0];

				//Return result
				afterGetUserInfos(result[0]);
			}
		}

		//Perform request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, onceGetUserInfos);

		//Everything is OK
		return true;

	},

	/**
	 * Get multiple users informations
	 * 
	 * @param {String} usersID User on which to make request (current to get connected user)
	 * @param {function} afterGetUserInfos What to do once users informations are available
	 * @return {Boolean} True for a success
	 */
	getMultipleUsersInfos: function(usersID, afterGetUserInfos){

		//First, check if informations are already available in the cache for some users
		var cachedInformations = {};
		var needRequest = false; //By default the request isn't required
		var usersToGetList = "";
		for(i in usersID){
			//Extract userID
			var processUserID = usersID[i];

			//Check the local cache
			if(this.usersInfos["user-"+processUserID]){
				//Add user information to cached informations
				cachedInformations[processUserID] = this.usersInfos["user-"+processUserID];
			}
			else {
				//Else we'll have to get data
				needRequest = true;
				usersToGetList += usersID+",";
			}
		}

		//Check if an API request is not required
		if(!needRequest){
			//Go immediatly to the next step
			afterGetUserInfos(cachedInformations);
			return true;
		}

		//Perform API request
		var apiURI = "user/getInfosMultiple";
		var params = {
			usersID: usersToGetList,
		}

		//Specify what to do next
		var onceGetUserInfos = function(result){
			if(result.error){
				//Log error
				ComunicWeb.debug.logMessage("ERROR : couldn't get infos about users ID !");

				//Returns the error to the next function
				afterGetUserInfos(result);

				//Something went wrong
				return false;
			}
			else {
				//Prepare return
				var returnInformations = cachedInformations;

				//Save results and prepare return
				for(i in result){
					//Get user ID
					var userID = result[i]['userID'];
					
					//Store
					ComunicWeb.user.userInfos.usersInfos["user-"+userID] = result[i];

					returnInformations[userID] = result[i];
				}
				

				//Return results
				afterGetUserInfos(returnInformations);
			}
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