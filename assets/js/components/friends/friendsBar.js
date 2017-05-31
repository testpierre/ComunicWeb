/**
 * Friends bar
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friends.bar = {

	/**
	 * Display friends list
	 * 
	 * @return {Boolean} True for a success
	 */
	display: function(){
		//Log action
		ComunicWeb.debug.logMessage("Initialize friends list.");

		//Check if friends list already exists or not
		var friendsListContainer = byId("friendsList");

		//We check if the friend list already exists or not
		if(friendsListContainer){
			ComunicWeb.debug.logMessage("Notice: friend list already present on the page. Nothing to be done.");
			return true;
		}

		//Create and apply friends list element
		var friendsListContainer = createElem("div");
		friendsListContainer.id = "friendsList";
		
		//Check if "pageTarget" already exists or not
		var pageTarget = byId("pageTarget");
		if(pageTarget){
			//Insert friends list just before pageTarget
			byId("wrapper").insertBefore(friendsListContainer, pageTarget);
		}
		else{
			byId("wrapper").appendChild(friendsListContainer); //Just happend the menubar
		}

		//Initializate friends list
		this.init(friendsListContainer);

		//Success
		return true;
	},

	/**
	 * Initializate a friend list
	 * 
	 * @param {HTMLElement} friendsListContainer The container of the friend list
	 * @return {Boolean} True for a success
	 */
	init: function(friendsListContainer){

		//First, create the table container
		var listFriendsElem = createElem("table", friendsListContainer);
		listFriendsElem.className = "table table-condensed";

		//Refresh friends list
		this.refresh(listFriendsElem);

		//Success
		return true;
	},

	/**
	 * Refresh the listbar
	 * 
	 * @param {HTMLElement} listFriendsElem The element that contains the list of friens
	 * @return {Boolean} True for a success
	 */
	refresh: function(listFriendsElem){
		//Refresh it
		ComunicWeb.components.friends.list.refresh(function(list){
			//Check for error
			if(!list){
				//Log information
				ComunicWeb.debug.logMessage("ERROR : Can't refresh menubar without the latest list !");

				//Error
				return false;
			}

			//Get users list to get information about them
			usersID = {};
			for(i in list){
				//Extract user id
				var processID = list[i].ID_friend;

				usersID["user_"+processID] = processID;
			}
			
			//Get users ID informations
			ComunicWeb.user.userInfos.getMultipleUsersInfos(usersID, function(usersInfo){
				console.log(usersInfo);
			});
		});
	},
}