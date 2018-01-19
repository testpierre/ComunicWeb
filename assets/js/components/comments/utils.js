/**
 * Comments utilities
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.comments.utils = {

	/**
	 * Get the IDs of the users who posted comments
	 * 
	 * @param {Object} infos Informations about the comments
	 * @return {Object} List of users ID
	 */
	get_users_id: function(infos){

		//Process the list of users
		var users = [];

		var i;
		for(i in infos){

			//If the user isn't already present in the list, add it
			if(!users.includes(infos[i].userID))
				users.push(infos[i].userID);

		}

		return users;
	}

}