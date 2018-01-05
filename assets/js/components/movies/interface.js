/**
 * Movies communication interface
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.movies.interface = {
	
	/**
	 * Get the list of movies of the user from the server
	 * 
	 * @param {function} callback What to do once we got a response from the server
	 */
	getList: function(callback){

		apiURI = "movies/get_list";
		params = {};

		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	}

}