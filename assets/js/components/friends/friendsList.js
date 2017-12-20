/**
 * Friends list caching system
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.list = {
	/**
	 * Last list cached
	 */
	__list: {},

	/**
	 * Refresh the list
	 * 
	 * @param {Function} afterRefreshList What to do next
	 * @return {Boolean} True for a success
	 */
	refresh: function(afterRefreshList){

		//First, perform an API request
		var apiURI = "friends/getList";
		var params = {};

		//Perform request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, function(result){
			
			//Check for error
			if(result.error){
				ComunicWeb.debug.logMessage("Couldn't get a new version of friends list !");

				//Perform next action...
				afterRefreshList(false);

				//Error
				return false;
			}

			//Log information
			ComunicWeb.debug.logMessage("Got a new version of friends list !");

			//Cache the new list
			ComunicWeb.components.friends.list.__list = result;

			//Perform next action
			afterRefreshList(result);

			//Success
			return true;
		});

		//It is a success
		return true;
	},

	/**
	 * Get the list
	 * 
	 * @return {Object} The list
	 */
	get: function(){
		//Return the list
		return this.__list;
	},

	/**
	 * Respond a friendship request
	 * 
	 * @param {Integer} friendID The friend ID to respond
	 * @param {Boolean} accept Specify if the request was accepted or not
	 * @param {Function} afterResponse Specify an action to do next
	 * @return {Boolean} True for a success
	 */
	respondRequest: function(friendID, accept, afterResponse){
		//Prepare the API request
		var apiURI = "friends/respondRequest"
		var params = {
			"friendID": friendID,
		};
		
		if(accept)
			params.accept = "true";
		else
			params.accept = "false";
		
		//Process request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, afterResponse);

		//Success
		return true;
	},

	/**
	 * Get the current status of a friendship relation
	 * 
	 * @param {Integer} friendID The ID of the target friend
	 * @param {Function} callback What to do once we get the response
	 */
	getStatus: function(friendID, callback){
		
		//Prepare the API request
		var apiURI = "friends/getStatus";
		var params = {
			"friendID": friendID
		};

		//Process request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Empty friends cache list
	 * 
	 * @return {Boolean} True for a success
	 */
	emptyCache: function(){

		//Empty cache
		this.__list = {};

		//Success
		return true;
	}
};

//Register cache cleaner
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.friends.list.emptyCache");