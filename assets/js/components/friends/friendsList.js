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
	}
};