/**
 * Conversations utilites
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.utils = {

	/**
	 * Given conversation informations, returns its name
	 * 
	 * @param {Object} infos Conversation informations
	 * @param {Function} afterName What to do once we got conversation name
	 * @return {Boolean} True for a success
	 */
	getName: function(infos, afterName){

		//Check if the conversation has a name or not
		if(infos.name)
			afterName(infos.name);
		else {

			//Get informations about the first two members
			var firstMembers = [];

			//Retrieve IDs
			for(o in infos.members){
				//Limit number to 2
				if(firstMembers.length < 2){ 

					//Check this is a valid entry
					if(infos.members[o]){

						//Exclude current user ID
						if(infos.members[o] != userID()) 
							firstMembers.push(infos.members[o]);
					}
				}
			}

			//Get users informations
			ComunicWeb.user.userInfos.getNames(firstMembers, function(usersName){

				//For conversations with many members (more than 3 - we musn't forget current user)
				if(infos.members.length > 3)
					usersName += ", ...";

				//Peform next action now
				afterName(usersName);
			});
		}

		//Success
		return true;
	}


}