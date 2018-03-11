/**
 * Friends actions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.actions = {

	/**
	 * Refresh informations of a single personnal friend
	 * 
	 * @param {number} friendID The ID of the target friend
	 * @param {HTMLElement} target The target element
	 */
	refresh_single_personnal: function(friendID, target){

		//Get informations about the friendship
		ComunicWeb.components.friends.interface.get_single_friend(friendID, function(r){

			//Check for errors
			if(r.error){
				ComunicWeb.common.notificationSystem.showNotification("Could not get informations about a friendship !", "danger");
				return;
			}

			//Get informations about the user
			ComunicWeb.user.userInfos.getUserInfos(friendID, function(user){

				//Check for errors
				if(user.error){
					ComunicWeb.common.notificationSystem.showNotification("Could get informations about a friend !", "danger");
					return;
				}

				//Refresh the UI
				ComunicWeb.components.friends.ui.show_personnal_friend(target, r, user);

			});
			
		});

	}

};