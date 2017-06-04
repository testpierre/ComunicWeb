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

		//Create discussions manager element
		var discussionsContainerElem = createElem("div");
		discussionsContainerElem.id = "discussionsElem";
		
		//Insert the element at the right place
		var pageTarget = byId("pageTarget");
		if(pageTarget){
			//Insert disucssion element before it
			byId("wrapper").insertBefore(discussionsContainerElem, pageTarget);
		}
		else{
			//Just apply the element
			byId("wrapper").appendChild(discussionsContainerElem);
		}

		//Initializate discussion element
		this.init(discussionsContainerElem);

		//Success
		return true;
	},

	/**
	 * Initializate discussions element
	 * 
	 * @param {HTMLElement} discussionsContainerElem The container of the discussion element
	 * @return {Boolean} True for a success
	 */
	init: function(discussionsContainerElem){

	},
}