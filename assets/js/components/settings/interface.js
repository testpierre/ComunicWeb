/**
 * Settings interface
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.settings.interface = {

	/**
	 * Get general account settings
	 * 
	 * @param {function} callback
	 */
	getGeneral: function(callback){

		//Make a request over the API
		var apiURI = "settings/get_general";
		var params = {};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Set (update) general account settings
	 * 
	 * @param {object} settings New general account settings
	 * @param {function} callback Callback function
	 */
	setGeneral: function(settings, callback){
		var apiURI = "settings/set_general";
		ComunicWeb.common.api.makeAPIrequest(apiURI, settings, true, callback);
	},

	/**
	 * Check the availability of the virtual directory for user
	 * 
	 * @param {string} directory The directory to check
	 * @param {function} callback
	 */
	checkUserDirectoryAvailability: function(directory, callback){
		var apiURI = "settings/check_user_directory_availability";
		var params = {
			directory: directory
		};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	},

	/**
	 * Get security account settings
	 * 
	 * @param {string} password The password of the user
	 * @param {function} callback Callback function
	 */
	getSecurity: function(password, callback){
		var apiURI = "settings/get_security";
		var params = {
			password: password
		};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	},

	/**
	 * Set (update) security account settings
	 * 
	 * @param {object} settings New settings
	 * @param {function} callback 
	 */
	setSecurity: function(settings, callback){
		var apiURI = "settings/set_security";
		ComunicWeb.common.api.makeAPIrequest(apiURI, settings, true, callback);
	},

	/**
	 * Update the password of the user
	 * 
	 * @param {string} oldPassword The old password of the user
	 * @param {string} newPassword The new password
	 * @param {function} callback
	 */
	updatePassword: function(oldPassword, newPassword, callback){
		var apiURI = "settings/update_password";
		var params = {
			oldPassword: oldPassword,
			newPassword: newPassword
		};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	},

	/**
	 * Get account image settings from the API
	 * 
	 * @param {function} callback
	 */
	getAccountImage: function(callback){
		var apiURI = "settings/get_account_image";
		var params = {};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	}
}