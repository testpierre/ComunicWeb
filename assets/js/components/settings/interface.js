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
		var apiURI = "/settings/get_general/";
		var params = {};
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

}