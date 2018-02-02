/**
 * Post page main script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.postPage.main = {

	/**
	 * Open post page
	 * 
	 * @param {Object} params Parametres required to open the page
	 * @param {HTMLElement} target The target for the user page
	 */
	open: function(params, target){

		//Check for subfolder
		if(!params.subfolder){

			//The page is considered as not found
			ComunicWeb.common.error.pageNotFound(params, target);
			return;

		}

		//Get the ID of the post
		var postID = Math.floor((params.subfolder)*1);

		//Check for error
		if(postID < 1 || isNaN(postID)){
			var errorMsg = ComunicWeb.common.messages.createCalloutElem("Error", "The specified post ID is invalid!", "danger");
			target.appendChild(errorMsg);
			return;
		}

		//Now the post can be displayed
		this.display(postID, target);
	},

	/**
	 * Display the post page
	 * 
	 * @param {numbert} postID The ID of the post to display
	 * @param {HTMLElement} target The target for the post
	 */
	display: function(postID, target){
		
		//Get informations about the post
		ComunicWeb.components.posts.interface.get_single(postID, function(response){

			//Check for errors
			if(response.error){

				//Post considered as not found
				ComunicWeb.common.error.pageNotFound({}, target);
				return;

			}

			//Create row
			var pageRow = createElem2({
				appendTo: target,
				type: "div",
				class: "row single-post-row"
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

			//Display the post
			ComunicWeb.components.posts.ui.display_post(response, boxBody);

		});

	}


}