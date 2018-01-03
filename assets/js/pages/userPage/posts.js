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
			class: "box-body",
		});

		//Display loading message
		var loadingMsg = createElem2({
			appendTo: postsBody,
			type: "p",
			innerHTML: "Loading posts..."
		});
		loadingMsg.style.textAlign = "center";

		//Get the posts from the API
		ComunicWeb.components.posts.interface.get_user(userInfos.userID, function(result){

			//Check for errors
			if(result.error){
				//Display notification
				ComunicWeb.common.notificationSystem.showNotification("Couldn't get user posts!", "danger", 4, "Error");
			}
			else {

				//Empty the target
				emptyElem(postsBody);

				//Show the posts
				ComunicWeb.pages.userPage.posts._show(result, postsBody);

			}
		});
		
	},

	/**
	 * Show user posts
	 * 
	 * @param {Object} posts The list of posts to display
	 * @param {HTMLElement} target The rendering target
	 */
	_show: function(posts, target){

		//Process each post
		var i;
		for(i in posts){
			
			//Display post
			ComunicWeb.components.posts.ui.display_post(posts[i], target);

		}

		//Check if there is not any posts
		if(target.children.length == 0){
			this._no_posts_msg(target);
		}

	},

	/**
	 * Display a message to inform user that there is not any post
	 * on the page he is visiting
	 * 
	 * @param {HTMLElement} target The target for the message
	 */
	_no_posts_msg(target){
		
		var msgContener = createElem2({
			appendTo: target,
			type: "div"
		});

		var msgTitle = createElem2({
			appendTo: msgContener,
			type: "h2",
			innerHTML: "No post yet"
		});
		msgTitle.style.textAlign = "center";

		var msgContent = createElem2({
			appendTo: msgContener,
			type: "p",
			innerHTML: "Nobody has posted a message on this page yet."
		}).style.textAlign = "center";
	}



};