/**
 * Conversations manager
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.manager = {

	/**
	 * @var {String} The ID of the conversation contener
	 */
	__conversationsContenerID: "conversationsElem",

	/**
	 * Display conversations manager
	 * 
	 * @return {Boolean} True for a success
	 */
	display: function(){

		//Try to get conversation manager
		var conversationsContainerElem = byId(this.__conversationsContenerID);

		//Check if element exists or not
		if(conversationsContainerElem){
			ComunicWeb.debug.logMessage("NOTICE : couldn't initializate conversation manager because a conversation manager is already on the page");

			return true;
		}

		//Else inform user and create conversation manager
		ComunicWeb.debug.logMessage("INFO : initializate conversation manager");

		//Create conversations manager element
		var conversationsContainerElem = createElem("div");
		conversationsContainerElem.id = this.__conversationsContenerID;
		
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

		//Then, open any already active conversation
		var openedConversations = ComunicWeb.components.conversations.cachingOpened.getAll();
		
		//Process opened conversations
		for(i in openedConversations){
			if(i < openedConversations.length)
				this.openConversation(openedConversations[i]);
		}

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

	/**
	 * Add a new conversation to the list of opened conversation accordingly to specified informations
	 * 
	 * @param {Object} infos Informations about the conversation to open
	 * @info {Integer} conversationID The ID of the conversation to open
	 * @return {Boolean} True or false depending of the success of the operation
	 */
	addConversation: function(infos){
		//We check if a conversation ID was specified or not
		if(infos.conversationID){
			ComunicWeb.debug.logMessage("Open a conversation based on its ID");
			var conversationID = infos.conversationID;
		}
		else {
			//It is an error
			ComunicWeb.debug.logMessage("Don't know which conversation to open !");
			return false;
		}

		//Check if the conversation is already open or not
		if(ComunicWeb.components.conversations.cachingOpened.isopen(conversationID)){
			ComunicWeb.debug.logMessage("The conversation " + conversationID + " is already opened !");
			return false;
		}

		//Open the conversation
		this.openConversation(conversationID);

		//Success
		return true;
	},

	/**
	 * Open a conversation 
	 * 
	 * @param {Integer} conversationID The ID of the conversation to open
	 * @return {Boolean} True or false depending of the success of the operation
	 */
	openConversation: function(conversationID){
		
		//Log action
		ComunicWeb.debug.logMessage("Opening conversation " + conversationID);

		//Save conversation ID in session storage
		ComunicWeb.components.conversations.cachingOpened.add(conversationID);

		//Create a conversation window
		var conversationWindow = ComunicWeb.components.conversations.chatWindows.create({
			target: byId(this.__conversationsContenerID),
			conversationID: conversationID
		});

		//Change conversation window name (loading state)
		ComunicWeb.components.conversations.chatWindows.changeName("Loading", conversationWindow);

		//Peform a request to informations about the conversation
		ComunicWeb.components.conversations.interface.getInfosOne(conversationID, function(informations){

			//In case of error
			if(informations.error){
				//Display error notification
				ComunicWeb.common.notificationSystem.showNotification("Couldn't get informations about the conversation !", "danger");
				return false;
			}

			//Get informations about the members of the conversation
			ComunicWeb.user.userInfos.getMultipleUsersInfos(informations.members, function(membersInfos){

				//Quit in case of error
				if(informations.error){
					//Display error notification
					ComunicWeb.common.notificationSystem.showNotification("Couldn't get informations about the conversation members !", "danger");
					return false;
				}
				
				//Create conversation informations root object
				var conversationInfos = {
					box: conversationWindow,
					membersInfos: membersInfos,
					infos: informations
				};

				//Change the name of the conversation
				ComunicWeb.components.conversations.utils.getName(informations, function(conversationName){
					ComunicWeb.components.conversations.chatWindows.changeName(conversationName, conversationWindow);
				});

				//Update conversation members informations
				ComunicWeb.components.conversations.chatWindows.updateMembersList(conversationInfos);

				//Display conversation settings pane
				ComunicWeb.components.conversations.chatWindows.showConversationSettings(conversationInfos);

			});
		});

		//Success
		return true;
	}
}