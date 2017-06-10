/**
 * Conversations manager
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.manager = {
	/**
	 * Display conversations manager
	 * 
	 * @return {Boolean} True for a success
	 */
	display: function(){

		//Try to get conversation manager
		var conversationsContainerElem = byId("conversationsElem");

		//Check if element exists or not
		if(conversationsContainerElem){
			ComunicWeb.debug.logMessage("NOTICE : couldn't initializate conversation manager because a conversation manager is already on the page");

			return true;
		}

		//Else inform user and create conversation manager
		ComunicWeb.debug.logMessage("INFO : initializate conversation manager");

		//Create conversations manager element
		var conversationsContainerElem = createElem("div");
		conversationsContainerElem.id = "conversationsElem";
		
		//Insert the element at the right place
		var pageTarget = byId("pageTarget");
		if(pageTarget){
			//Insert disucssion element before it
			byId("wrapper").insertBefore(conversationsContainerElem, pageTarget);
		}
		else{
			//Just apply the element
			byId("wrapper").appendChild(conversationsContainerElem);
		}

		//Initializate conversation element
		this.init(conversationsContainerElem);

		//Success
		return true;
	},

	/**
	 * Initializate conversations element
	 * 
	 * @param {HTMLElement} conversationsContainerElem The container of the conversation element
	 * @return {Boolean} True for a success
	 */
	init: function(conversationsContainerElem){
		
		//First, add the "open a conversation" new
		this.addOpenConversationButton(conversationsContainerElem);

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
		
		
		//Make button lives
		addButton.onclick = function(){
			ComunicWeb.components.conversations.list.display(this);
		}
	},
}