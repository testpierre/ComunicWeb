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



	},

	/**
	 * Show a comment
	 * 
	 * 
	 */
	_show_comment: function(){

	},

}