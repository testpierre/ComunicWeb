/**
 * Comments editor
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.comments.editor = {

	/**
	 * Open the comments editor
	 * 
	 * @param {Object} infos Informations about the comment to edit
	 * @param {HTMLElement} root Comment root element
	 */
	open: function(infos, root){
		
		//Prepare input callback
		var inputCallback = function(result){
			
			//Check if edition was cancelled
			if(!result)
				return;
			
			//Try to update comment content
			ComunicWeb.components.comments.interface.edit(infos.ID, result, function(result){

				//Check for error
				if(result.error){
					ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to update comment content !", "danger");
					return;
				}

				//Else perform next actions
				//Reload the comment
				ComunicWeb.components.comments.actions.reload(infos.ID, root);
			});

		}

		//Prompt the user to enter the new content of the comment
		ComunicWeb.common.messages.inputString(
			"Edit comment content",
			"Please specify the new content of the comment: ",
			infos.content,
			inputCallback
		);

	}

}