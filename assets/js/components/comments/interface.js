/**
 * Comments interface with the server
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.comments.interface = {

	/**
	 * Get informations about a single comment
	 * 
	 * @param {number} commentID The ID of the comment to get
	 * @param {function} callback
	 */
	get_single: function(commentID, callback) {

		//Perform a request on the API
		var apiURI = "comments/get_single";
		var params = {
			commentID: commentID
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Update a comment content
	 * 
	 * @param {number} commentID The ID of the comment to update
	 * @param {string} content The new content of the comment
	 * @param {function} callback
	 */
	edit: function(commentID, content, callback){

		//Perform a request on the API
		var apiURI = "comments/edit";
		var params = {
			commentID: commentID,
			content: content
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Delete a comment
	 * 
	 * @param {number} commentID The ID of the comment to delete
	 * @param {function} callback What to do once the comment has been delete
	 */
	delete: function(commentID, callback){

		//Perform a request on the API
		var apiURI = "comments/delete";
		var params = {
			commentID: commentID
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	}

};