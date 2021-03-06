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
	 * @param {int} lastPostID The ID of the last post loaded
	 * @param {function} callback Callback function
	 */
	get_user: function(userID, lastPostID, callback){

		//Load the previous posts to the loaded post if required
		if(lastPostID > 0)
			lastPostID--;

		//Prepare the API request
		var APIuri = "posts/get_user";
		var params = {
			userID: userID,
			startFrom: lastPostID
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(APIuri, params, true, callback);

	},

	/**
	 * Get the list of the latest posts
	 * 
	 * @param {number} lastPostID The ID of the loast loaded post (or 0)
	 * @param {function} callback What to do when we got response
	 */
	get_latest: function(lastPostID, callback){

		if(lastPostID > 0)
			lastPostID--;

		//Prepare API request
		var APIuri = "posts/get_latest";
		var params = {
			startFrom: lastPostID
		};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(APIuri, params, true, callback);

	},

	/**
	 * Get single post informations
	 * 
	 * @param {int} postID The ID of the post to get
	 * @param {function} callback What to do once we got post informations
	 */
	get_single: function(postID, callback){

		//Prepare API request
		var APIuri = "posts/get_single";
		var params  = {
			postID: postID
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(APIuri, params, true, callback);

	},

	/**
	 * Send a new post
	 * 
	 * @param {string} kind The kind of page
	 * @param {string} id The ID of the kind of page
	 * @param {FormData} data The data of the new post
	 * @param {function} callback The function to call once the post is posted
	 */
	send_post: function(kind, id, data, callback){

		//Prepare the request
		var apiURI = "posts/create";

		//Append the kind of post to the request
		data.append("kind-page", kind);
		data.append("kind-id", id);

		//Perform the request
		ComunicWeb.common.api.makeFormDatarequest(apiURI, data, true, callback);

	},

	/**
	 * Change post visibility level
	 * 
	 * @param {int} postID The ID of the post
	 * @param {string} new_level New visibility level for the post
	 * @param {function} callback What to do once we got a response
	 */
	set_visibility_level: function(postID, new_level, callback){

		//Prepare the API request
		var APIuri = "posts/set_visibility_level";
		var params = {
			postID: postID,
			new_level: new_level
		};

		//Make the request
		ComunicWeb.common.api.makeAPIrequest(APIuri, params, true, callback);

	},

	/**
	 * Delete a post
	 * 
	 * @param {int} postID The ID of the post to delete
	 * @param {function} callback What to do once we got a reponse
	 */
	delete: function(postID, callback){

		//Prepare an API request
		apiURI = "posts/delete";
		params = {
			postID: postID
		};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Update a message content
	 * 
	 * @param {int} postID The ID of the post to update
	 * @param {string} content The new content of the post
	 * @param {function} callback What to do once post has been updated
	 */
	update_content: function(postID, content, callback){

		//Prepare an API request
		apiURI = "posts/update_content";
		params = {
			postID: postID,
			new_content: content
		};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	},

	/**
	 * Send a response to a survey
	 * 
	 * @param {int} postID The ID of the target post
	 * @param {int} choiceID The ID of the selected choice
	 * @param {function} callback This function is called when we got a response
	 */
	survey_send_response: function(postID, choiceID, callback){

		//Prepare an API request
		apiURI = "surveys/send_response";
		params = {
			postID: postID,
			choiceID: choiceID
		};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);
	},

	/**
	 * Cancel a response to a survey
	 * 
	 * @param {int} postID The ID of the target post
	 * @param {function} callback This function is called once we got a response
	 */
	cancel_survey_response: function(postID, callback){

		//Prepare an API request
		apiURI = "surveys/cancel_response";
		params = {
			postID: postID
		};

		//Perform the request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, callback);

	}

}