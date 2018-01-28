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

		//Add comment creation form (if possible)
		if(signed_in()){
			ComunicWeb.components.comments.form.display(postID, contener)
		}

	},

	/**
	 * Display a single comment
	 * 
	 * @param {Object} infos Informations about the comment to display
	 * @param {HTMLElement} target The target for the comment
	 */
	display_comment: function(infos, target){

		//Get informations about the user
		ComunicWeb.user.userInfos.getUserInfos(infos.userID, function(result){

			//Check for errors
			if(result.error){
				ComunicWeb.common.notificationSystem.showNotification("Couldn't get informations about a user!", "danger");
				return;
			}

			//Display the comment
			ComunicWeb.components.comments.ui._show_comment(infos, result, target);

		});

	},

	/**
	 * Show a comment
	 * 
	 * @param {object} infos Informations about the comment
	 * @param {object} user Informations about the user
	 * @param {HTMLElement} target The target for the comment
	 */
	_show_comment: function(infos, user, target){
		
		//Create comment contener (if required)
		if(target.className != "box-comment"){

			var commentContener = createElem2({
				appendTo: target,
				type: "div",
				class: "box-comment"
			});

		}

		//Empty comment contener
		else {
			emptyElem(target);
			var commentContener = target;
		}
		

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

		//Offer the user the possibility to delete and update the comment if he is allowed to do so
		if(userID() == infos.userID){

			//Create a button to update the comment
			var editCommentLink = createElem2({
				appendTo: rightContener,
				type: "a",
				class: "edit-comment-link"
			});

			createElem2({
				appendTo: editCommentLink,
				type: "i",
				class: "fa fa-edit"
			});

			//Make edit button lives
			editCommentLink.onclick = function(){

				//Open comment editor
				ComunicWeb.components.comments.editor.open(infos, commentContener);
				
			}


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

			//Make delete button lives
			deleteCommentLink.onclick = function(){

				ComunicWeb.common.messages.confirm("Are you sure do you want to delete this comment ? This operation is unrecoverable!", function(response){

					//Check if user cancelled the operation
					if(!response)
						return;
					
					//Hide the comment
					commentContener.style.visibility = "hidden";
					
					//Delete the comment
					ComunicWeb.components.comments.interface.delete(infos.ID, function(response){

						commentContener.style.visibility = "visible";

						//Check for errors
						if(response.error){
							ComunicWeb.common.notificationSystem.showNotification("Could not delete comment!", "danger");
							return;
						}


					});

				});

			}
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

		//Load likes
		var likesTarget = createElem2({
			appendTo: commentText,
			type: "div",
		});

		var userLiking = null;
		if(signed_in()){
			userLiking = infos.userlike;
		}

		//Call component
		ComunicWeb.components.like.button.display(
			"comment",
			infos.ID,
			infos.likes,
			userLiking,
			likesTarget
		);

	},

}