/**
 * Comments interface with the server
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.comments.interface = {

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