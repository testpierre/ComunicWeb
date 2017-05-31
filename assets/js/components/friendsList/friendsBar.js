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
	 * Refresh a friend list
	 * 
	 * @param {HTMLElement} listFriendsElem The element that contains the list of friens
	 * @return {Boolean} True for a success
	 */
	refresh: function(listFriendsElem){
		//First, perform an API request
		var apiURI = "friends/getList";
		var params = {};

		//Perform request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, function(result){
			
			//Check for error
			if(result.error){
				ComunicWeb.debug.logMessage("Couldn't get a new version of friends list !");
				return false;
			}

			//Log information
			ComunicWeb.debug.logMessage("Got a new version of friends list !");
		});
	},
}