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
		
		//First, add the "open a conversation" new
		this.addOpenConversationButton(discussionsContainerElem);

	},

	/**
	 * Add the "open conversation" button
	 * 
	 * @param {HTMLElement} targetElem The target of the button
	 * @return {Boolean} True for a success
	 */
	addOpenConversationButton: function(targetElem){

		//Create the button
		var addButton = createElem("button", targetElem);
		addButton.className = "btn btn-primary open-conversation-button";
		addButton.innerHTML = "Open a conversation";
		
		
		//Temporary behavior
		addButton.onclick = function(){
			alert("Open a conversation !");
		}
	}
}