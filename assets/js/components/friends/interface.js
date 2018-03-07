/**
 * Friends list interface
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.interface = {

	/**
	 * Get the list of friends of the current user
	 * 
	 * @param {boolean} complete Specify whether the complete list
	 * should be returned or not
	 * @param {function} callback The callback function to call once
	 * we got a response from the server
	 */
	get_current_list: function(complete, callback){

		//Prepare the API request
		var apiURI = "friends/getList";
		var params = {
			complete: complete
		};

		//Perform API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Get the list of friends of a specified user
	 * 
	 * @param {number} userID The ID of the target user ID
	 * @param {function} callback What to do once we get a response
	 * from the server
	 */
	get_user_list: function(userID, callback){

		//Prepare API request
		var apiURI = "friends/get_user_list";
		var params = {
			userID: userID
		};

		//Perform API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	}

}