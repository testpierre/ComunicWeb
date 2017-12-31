/**
 * Posts function
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.userPage.posts = {

	/**
	 * Display the posts
	 * 
	 * @param {Object} userInfos Informations about the user
	 * @param {Object} params Additionnal parametres passed with the request
	 * @param {HTMLElement} target The target where the posts will be applied
	 */
	display: function(userInfos, params, target){

		//Create posts blocks
		var postsBlock = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary"
		});

		var postsBody = createElem2({
			appendTo: postsBlock,
			type: "div",
			class: "box-body"
		});

		//Get the posts from the API
		ComunicWeb.components.posts.interface.get_user(userInfos.userID, function(result){

			//Check for errors
			if(result.error){
				//Display notification
				ComunicWeb.common.notificationSystem.showNotification("Couldn't get user posts!", "danger", 4, "Error");
			}
			else {

				//Show the posts
				ComunicWeb.pages.userPage.posts._show(result, postsBody);

			}
		});
		
	},

	/**
	 * Show user posts
	 * 
	 * @param {Object} posts The list of posts to display
	 * @param {HMTLElement} target The rendering target
	 */
	_show: function(posts, target){
		
		//Process each post
		var i;
		for(i in posts){
			
			//Display post
			ComunicWeb.components.posts.ui.display_post(posts[i], target);

		}

	},



};