/**
 * Comments UI
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.comments.ui = {

	/**
	 * Display a list comments
	 * 
	 * @param {Object} infos Informations about the comments
	 * @param {int} postID The ID of the post attached to the comments
	 * @param {HTMLElement} target The target for the comments
	 */
	display: function(infos, postID, target){
		
		//First, get informations about the users
		var usersID = ComunicWeb.components.comments.utils.get_users_id(infos);
		
		//Get informations about the users
		var usersInfo = ComunicWeb.user.userInfos.getMultipleUsersInfos(usersID, function(result){
			
			//Check for errors
			if(result.error){
				ComunicWeb.common.notificationSystem.showNotification("Couldn't informations about some users to display their comments !", "danger");
				return;
			}

			//Process the comments
			ComunicWeb.components.comments.ui._process_comments(infos, result, postID, target);

		}, false);
	},

	/**
	 * Process the list of comments
	 * 
	 * @param {Object} infos Informations about the comments
	 * @param {Object} userInfos Informations about the users of the comments
	 * @param {int} postID The ID of the post attached to the comments
	 * @param {HTMLElement} target The target for the comments
	 */
	_process_comments: function(infos, usersInfos, postID, target){

		//Create comments contener
		var contener = createElem2({
			appendTo: target,
			type: "div",
			class: "box-comments post-comments"
		});

		//Process the list of comments
		for(i in infos){
			this._show_comment(infos[i], usersInfos['user-' + infos[i].userID], contener);
		}

	},

	/**
	 * Show a comment
	 * 
	 * @param {object} infos Informations about the comment
	 * @param {object} user Informations about the user
	 * @param {HTMLElement} target The target for the comment
	 */
	_show_comment: function(infos, user, target){
		
		//Create comment contener
		var commentContener = createElem2({
			appendTo: target,
			type: "div",
			class: "box-comment"
		});

		//Add user image
		createElem2({
			appendTo: commentContener,
			type: "img",
			class: "img-circle imgs-sm",
			src: user.accountImage
		});

		//Create comment text
		var commentText = createElem2({
			appendTo: commentContener,
			type: "div",
			class: "comment-text"
		});

		//Add usernmae
		var userNameContener = createElem2({
			appendTo: commentText,
			type: "span",
			class: "username",
			innerHTML: userFullName(user)
		});

		//Add right elements
		var rightContener = createElem2({
			appendTo: userNameContener,
			type: "span",
			class: "text-muted pull-right"
		});

		//Add comment creation date
		createElem2({
			appendTo: rightContener,
			type: "span",
			innerHTML: ComunicWeb.common.date.timeDiffToStr(infos.time_sent) + " ago"
		});

		//Offer the user the possibility to delete the comment if he is allowed to do so
		if(userID() == infos.userID){

			//Create a button to delete the comment
			var deleteCommentLink = createElem2({
				appendTo: rightContener,
				type: "a",
				class: "delete-comment-link"
			});

			createElem2({
				appendTo: deleteCommentLink,
				type: "i",
				class: "fa fa-trash"
			});

		}

		//Add comment content
		var commentContent = createElem2({
			appendTo: commentText,
			type: "div",
			innerHTML: infos.content
		});

		//Add comment image (if any)
		if(infos.img_url != null){
			
			var commentImageContener = createElem2({
				appendTo: commentText,
				type: "div",
				class: "comment-img-contener"
			});

			var commentImageLink = createElem2({
				appendTo: commentImageContener,
				type: "a",
				href: infos.img_url
			});

			createElem2({
				appendTo: commentImageLink,
				type: "img",
				class: "comment-img",
				src: infos.img_url
			});

			commentImageLink.onclick = function(){
				$(this).ekkoLightbox({
					alwaysShowClose: true,
				});
				return false;
			}

		}
	},

}