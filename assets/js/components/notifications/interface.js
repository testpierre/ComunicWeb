/**
 * Notifications interface
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.notifications.interface = {

	/**
	 * Get the number of unread notifications
	 * 
	 * @param {function} callback
	 */
	getNbUnreads: function(callback){

		//Perform API request
		var apiURI = "notifications/count_unread";
		var params = {};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Get the list of unread notifications
	 * 
	 * @param {function} callback
	 */
	get_list_unread: function(callback){

		//Perform API request
		var apiURI = "notifications/get_list_unread";
		var params = {};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Mark a notification as seen
	 * 
	 * @param {number} id The ID of the notification to mark as seen
	 * @param {boolean} delete_similar Specify if the similar notifications
	 * associated to the user have to be delete too
	 * @param {function} callback (Optionnal)
	 */
	mark_seen: function(id, delete_similar, callback){

		//Perform an API request
		var apiURI = "notifications/mark_seen";
		var params = {
			notifID: id,
			delete_similar: delete_similar
		};

		ComunicWeb.common.api.makeAPIrequest(apiURI, params, false, callback);

	},
}