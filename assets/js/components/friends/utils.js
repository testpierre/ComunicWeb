/**
 * Friends component utilities
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.utils = {

	/**
	 * Extract the IDs of the friends of the users from a friends list
	 * 
	 * @param {array} list The friends list to process
	 * @return {array} The list of IDs
	 */
	getUsersIdFromPersonnalList: function(list){

		//Parse the list
		usersID = [];
		list.forEach(function(friend){
			//Extract user id
			usersID.push(friend.ID_friend);
		});

		//Return the generated list
		return usersID;
	},


}