/**
 * Latest posts page main script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.latestPosts.main = {

	/**
	 * Open latest posts page
	 * 
	 * @param {Object} params Parametres required to open the page
	 * @param {HTMLElement} target The target for the user page
	 */
	open: function(params, target){
		
		//Perform a request on the server to get the list of latest posts
		ComunicWeb.components.posts.interface.get_latest(function(response){

			//Check for errors - display a modal
			if(response.error){
				
				//Display modal error
				var error = ComunicWeb.common.messages.createCalloutElem("Error", "Could not get the list of the latest posts ! Please try to refresh the page...", "danger");
				error.className += " latestPostsError";
				target.appendChild(error);

				return;
			}

			//Display the list of posts
			ComunicWeb.pages.latestPosts.main._display_list(response, target);
		});

	},

	/**
	 * Display the list of latest post
	 * 
	 * @param {Object} list The list of posts to display
	 * @param {HTMLElement} target The target for the posts
	 */
	_display_list: function(list, target){

		//Create post list box
		//Create row
		var pageRow = createElem2({
			appendTo: target,
			type: "div",
			class: "row latest-posts-row"
		});

		//Post column
		var column = createElem2({
			appendTo: pageRow,
			type: "div",
			class: "col-md-6"
		});

		//Create post box
		var postBox = createElem2({
			appendTo: column,
			type: "div",
			class: "box box-primary"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: postBox,
			type: "div",
			class: "box-body"
		});

		//Process the list of posts
		for (let index = 0; index < list.length; index++) {
			//Display the post
			ComunicWeb.components.posts.ui.display_post(list[index], boxBody);
		}

		//Check if there aren't any post to display
		if(list.length == 0){
			//Display message
			var message = ComunicWeb.common.messages.createCalloutElem("No post to display", "Posts from you and your friend will appear here...", "info");
			message.className += " noLatestPosts";
			boxBody.appendChild(message);
		}
	}
}