/**
 * Friends list interface
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.interface = {

	/**
	 * Get single friend informations
	 * 
	 * @param {number} friendID The ID of the target friend
	 * @param {function} callback Callback function
	 */
	get_single_friend: function(friendID, callback){

		//Prepare the API request
		var apiURI = "friends/get_single_infos";
		var params = {
			friendID: friendID
		};

		//Perform API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

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
	},

	/**
	 * Update the posts text authorization status of a friend
	 * 
	 * @param {number} friendID The ID of the target friend
	 * @param {boolean} allow TRUE if the user can post texts / FALSE else
	 * @param {function} callback
	 */
	set_can_post_texts: function(friendID, allow, callback){

		//Prepare API request
		var apiURI = "friends/set_can_post_texts";
		var params = {
			friendID: friendID,
			allow: allow
		};

		//Perform API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Remove a user from the friend list
	 * 
	 * @param {numbert} userID The ID of the user to remove
	 * @param {function} callback What to do once we got a response
	 */
	remove_friend: function(userID, callback){

		//Prepare API request
		var apiURI = "friends/remove";
		var params = {
			friendID: userID
		};

		//Perform API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	}

}