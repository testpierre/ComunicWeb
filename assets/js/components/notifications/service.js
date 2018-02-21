/**
 * Notifications service
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.notifications.service = {
	
	/**
	 * Init the service
	 * 
	 * @param {HTMLElement} target The target that will receive 
	 * the number of unread notifications
	 * @param {Bool} auto_hide Automatically hide the notifications 
	 * number if there is not any new notification
	 */
	init: function(target, auto_hide){

		//Initialize interval
		var interval = setInterval(function(){

			//Auto-remove interval if the target has been removed
			if(!target.isConnected)
				return clearInterval(interval);

			//Get the number of notifications from the API
			ComunicWeb.components.notifications.interface.getAllUnread(function(response){

				//Continue in case of success
				if(response.error)
					return;

				//Update the target
				target.innerHTML = response.notifications;

				//If the number of notifications equals 0, hide the target if required
				if(response.notifications == 0 && auto_hide)
					target.style.display = "none";
				else
					target.style.display = "block";

			});

		}, 2000);

	},

}