/**
 * Friends list
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.friendsList = {

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


		//Success
		return true;
	}
}