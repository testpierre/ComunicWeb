/**
 * Notifications utilities
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.notifications.utils = {

	/**
	 * Get the users ID that might be required to display the notifications
	 * 
	 * @param {array} list The list of notifications to process
	 * @return {array} The list of users id
	 */
	get_users_id: function(list){

		var users = [];

		for (var index = 0; index < list.length; index++) {
			const notif = list[index];
			
			if(!users.includes(notif.from_user_id))
				users.push(notif.from_user_id);

			if(!users.includes(notif.from_container_id) && notif.from_container_type == "user_page")
				users.push(notif.from_container_id);
		}

		return users;

	}

}