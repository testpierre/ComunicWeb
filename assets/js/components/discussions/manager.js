/**
 * Discussions manager
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.discussions.manager = {
	/**
	 * Display discussions manager
	 * 
	 * @return {Boolean} True for a success
	 */
	display: function(){

		//Try to get discussion manager
		var discussionsContainerElem = byId("discussionsElem");

		//Check if element exists or not
		if(discussionsContainerElem){
			ComunicWeb.debug.logMessage("NOTICE : couldn't initializate discussion manager because a discussion manager is already on the page");

			return true;
		}

		//Else inform user and create discussion manager
		ComunicWeb.debug.logMessage("INFO : initializate discussion manager");

		//Success
		return true;
	}
}