/**
 * Posts communication interface with the API
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.posts.interface = {

	/**
	 * Get user posts
	 * 
	 * @param {int} userID The ID of the target user
	 * @param {function} callback Callback function
	 */
	get_user: function(userID, callback){

		//Prepare the API request
		var APIuri = "posts/get_user";
		var params = {
			userID: userID
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(APIuri, params, true, callback);

	},

}