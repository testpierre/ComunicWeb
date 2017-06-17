/**
 * Conversation chat window functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.chatWindows = {
	/**
	 * Create a new chat window
	 * 
	 * @param {Object} infos Informations required for the new chat window
	 * @info {HTMLElement} target The target of the new chat window
	 * @info {Integer} conversationID The ID of the target conversation
	 * @return {Object} Informations about the new chat window
	 */
	create: function(infos){

		//Log action
		ComunicWeb.debug.logMessage("Create a new chat window");

		//First, create the generic conversation window
		var infosBox = ComunicWeb.components.conversations.windows.create(infos.target.children[0]);

		//Save conversation ID
		infosBox.conversationID = infos.conversationID;

		//Change box root class name
		infosBox.rootElem.className += " direct-chat";

		//Adapt close button behaviour
		infosBox.closeFunction = function(){
			
			//Remove root element
			infosBox.rootElem.remove();

			//Remove the conversation from opened ones
			ComunicWeb.components.conversations.cachingOpened.remove(infosBox.conversationID);
		}

		infosBox.closeButton.onclick = infosBox.closeFunction;


		//Debug
		infosBox.boxBody.innerHTML = "<div class='direct-chat-messages'>Hello world</p>";

		//Add button to get conversation members
		infosBox.membersButton = createElem("button");
		infosBox.closeButton.parentNode.insertBefore(infosBox.membersButton, infosBox.closeButton);
		infosBox.membersButton.type = "button";
		infosBox.membersButton.className = "btn btn-box-tool";
		infosBox.membersButton.setAttribute("data-toggle", "tooltip");
		infosBox.membersButton.setAttribute("data-widget", "chat-pane-toggle");
		infosBox.membersButton.title = "Conversation members";

			//Add button icon
			var buttonIcon = createElem("i", infosBox.membersButton);
			buttonIcon.className = "fa fa-users";

		//Add conversation members pane
		var membersPane = createElem("div", infosBox.boxBody);
		membersPane.className = "direct-chat-contacts";
		
		//Add conversation members list
		infosBox.membersList = createElem("ul", membersPane);
		infosBox.membersList.className = "contacts-list";
		
		//Return informations about the chat window
		return infosBox;

	},

	/**
	 * Change the name of the converation at the top of the windows
	 * 
	 * @param {String} newName The new name for the conversation window
	 * @param {Ojbect} infos INformations about the conversation window
	 * @return {Boolean} True for a success
	 */
	changeName: function(newName, infos){

		//Empty name field
		emptyElem(infos.boxTitle);
		
		//Create conversation icon 
		var conversationIcon = createElem("i", infos.boxTitle);
		conversationIcon.className = "fa fa-comments";

		//Add conversation title
		var conversationTitle = createElem("span", infos.boxTitle);
		conversationTitle.innerHTML = " " + newName;

		//Success
		return true;
	},

	/**
	 * Update conversation members list
	 * 
	 * @param {Object} conversation Informations about the conversation
	 * @return {Boolean} True for a success
	 */
	updateMembersList: function(conversation){
		
		//First, make sure conversation members pane is empty
		emptyElem(conversation.box.membersList);

		//Then process each user
		var i = 0;
		for(i in conversation.infos.members){
			if(conversation.membersInfos['user-'+conversation.infos.members[i]]){
				var memberInfos = conversation.membersInfos['user-'+conversation.infos.members[i]];

				//Display user informations
				var userLi = createElem("li", conversation.box.membersList);
				var userLink = createElem("a", userLi);
				
				//Add user account image
				var userImage = createElem("img", userLink);
				userImage.className = "contacts-list-img";
				userImage.src = memberInfos.accountImage;
				
				//Add member informations
				var memberInfosList = createElem2({
					type: "div", 
					appendTo: userLink,
					class: "contacts-list-info",
				});

				//Add user name
				var memberName = createElem2({
					type: "span",
					appendTo: memberInfosList,
					class: "contacts-list-name",
					innerHTML: memberInfos.firstName + " " + memberInfos.lastName,
				});

				//Check if members is a moderator or not of the conversation
				var memberStatus = conversation.infos.ID_owner == memberInfos.userID ? "Moderator" : "Member";

				//Add member status
				var memberStatus = createElem2({
					type: "span",
					appendTo: memberInfosList,
					class: "contats-list-msg",
					innerHTML: memberStatus
				});
			}
		}

		//Enable slimscrooll
		$(conversation.box.membersList).slimscroll({
			height: "100%",
			color: "#FFFFFF"
		});

		//Success
		return true;
	},

	/**
	 * Show conversation settings (button + pane)
	 * 
	 * @param {Object} conversation Informations about the conversation
	 * @return {Boolean} True for a success
	 */
	showConversationSettings: function(conversation){
		
		//Create and display conversation settings button wheel
		conversation.box.settingsButton = createElem2({
			type: "button",
			insertBefore: conversation.box.membersButton,
			class: "btn btn-box-tool",
			type: "button"
		});

		//Add button icon
		createElem2({
			type: "i",
			appendTo: conversation.box.settingsButton,
			class: "fa fa-gear",
		});

		//Create settings pane
		var settingsPane = createElem2({
			type: "div",
			appendTo: conversation.box.boxBody,
			class: "conversation-settings-pane",
		});

		//Make the settings button lives
		conversation.box.settingsButton.onclick = function(){
			//Update settings pane classname
			if(settingsPane.className.includes(" open"))
				settingsPane.className = settingsPane.className.replace(" open", ""); //Close the pane
			else
				settingsPane.className += " open"; //Open the pane
		};

		//Create the conversation form
		var settingsForm = ComunicWeb.components.conversations.utils.createConversationForm(settingsPane);

		//Update form informations
		settingsForm.createButton.innerHTML = "Update settings";
		
		//Update conversation name
		if(conversation.infos.name)
			settingsForm.conversationNameInput.value = conversation.infos.name;

		//Check if user is a ocnversation moderator or not
		if(conversation.infos.ID_owner == userID()){
			//Update conversation members
			ComunicWeb.components.userSelect.pushEntries(settingsForm.usersElement, conversation.infos.members);
		}
		else {
			//We disable name field
			settingsForm.conversationNameInput.disabled = "true";

			//We hide conversation users (presents in members pane)
			settingsForm.usersElement.parentNode.style.display = "none";
		}

		//Update follow conversation checkbox
		if(conversation.infos.following == "1"){
			$(settingsForm.followConversationInput).iCheck("check");
		}
		else {
			$(settingsForm.followConversationInput).iCheck("uncheck");
		}

		//Save settings form in global form
		conversation.settingsForm = settingsForm;

		//Make update settings button lives
		settingsForm.createButton.onclick = function(){
			ComunicWeb.components.conversations.chatWindows.submitUpdateForm(conversation);
		};

		//Success
		return true;
	},


	/**
	 * Process submited update conversation form
	 * 
	 * @param {Object} conversation Informations about the conversation
	 * @return {Boolean} True for a success
	 */
	submitUpdateForm: function(conversation){

		//Then, get informations about the input
		var newValues = {
			conversationID: conversation.infos.ID,
			following: conversation.settingsForm.followConversationInput.checked,
		}

		//Add other fields if the user is a conversation moderator
		if(conversation.infos.ID_owner == userID()){
			//Specify conversation name
			var nameValue = conversation.settingsForm.conversationNameInput.value
			newValues.name = (nameValue === "" ? false : nameValue);
			
			//Get conversation members
			newValues.members = ComunicWeb.components.userSelect.getResults(conversation.settingsForm.usersElement);

			//Check if any users were selected
			if(newValues.members.length === 0){
				//Inform user that its input is invalid
				ComunicWeb.common.notificationSystem.showNotification("Please select at least one user !", "danger", 3);
				return false;
			}

		}

		//Now, freeze the submit button
		conversation.settingsForm.createButton.disabled = "true";

		//Peform a request through the interface
		ComunicWeb.components.conversations.interface.updateSettings(newValues, function(result){
			console.log("Function callback !!!!!!!!!!!!!!", result);
		});

		//Success
		return true;
	},
}