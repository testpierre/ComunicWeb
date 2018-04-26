/**
 * Conversation chat window functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.chatWindows = {

	/**
	 * @var {Object} __conversationsCache Chat windows cache
	 */
	__conversationsCache: {},

	/**
	 * Open a new conversation window
	 * 
	 * @param {Integer} conversationID The ID of the window to open
	 * @return {Boolean} True for a success
	 */
	openConversation: function(conversationID){
		
		//Log action
		ComunicWeb.debug.logMessage("Opening conversation " + conversationID);

		//Create a conversation window
		var conversationWindow = this.create({
			target: byId(ComunicWeb.components.conversations.manager.__conversationsContainerID),
			conversationID: conversationID,
		});

		//Load the conversation
		this.load(conversationID, conversationWindow);

		//Success
		return true;
	},


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
		infosBox.rootElem.className += " direct-chat direct-chat-primary";

		//Adapt close button behaviour
		infosBox.closeFunction = function(){
			
			//Remove root element
			infosBox.rootElem.remove();

			//Remove the conversation from opened ones
			ComunicWeb.components.conversations.cachingOpened.remove(infosBox.conversationID);

			//Unload conversation
			ComunicWeb.components.conversations.chatWindows.unload(infosBox.conversationID);
		}

		infosBox.closeButton.onclick = infosBox.closeFunction;


		//Debug
		//Create messages container
		infosBox.messagesArea = createElem2({
			appendTo: infosBox.boxBody,
			type: "div",
			class: "direct-chat-messages",
			innerHTML: "",
		});

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
		
		//Add send a message form
		this.addMessageform(infosBox);

		//Return informations about the chat window
		return infosBox;

	},

	/**
	 * Add a message form to the chat windows
	 * 
	 * @param {Object} infosBox Informations about the chat box
	 * @return {Boolean} True for a success
	 */
	addMessageform: function(infosBox){

		//Create form container
		var conversationFormContainer = createElem2({
			appendTo: infosBox.boxFooter,
			type: "form",
			class: "create-message-form"
		});

		//Create input group
		var inputGroup = createElem2({
			appendTo: conversationFormContainer,
			type: "div",
			class: "input-group"
		});

		//Create text input (for message)
		var inputText = createElem2({
			appendTo: inputGroup,
			type: "textarea",
			class: "form-control",
			placeholder: "New message...",
		});
		inputText.maxLength = 200;

		//Enable textarea 2.0 on the message
		var textarea2 = new ComunicWeb.components.textarea();
		textarea2.init({
			element: inputText,
			minHeight: "34px",
			autosize: true,
		});

		//Create image input (for optionnal image)
		var inputImage = createElem2({
			type: "input",
			elemType: "file",
		});
		

		//Create button group
		var buttonGroup = createElem2({
			appendTo: inputGroup,
			type: "span",
			class: "input-group-btn",
		});

		//Add emojie button
		var emojiButton = createElem2({
			appendTo: buttonGroup,
			type: "button",
			elemType: "button",
			class: "btn btn-flat btn-add-emoji",
		});
		
			//Add image icon
			createElem2({
				type: "i",
				appendTo: emojiButton, 
				class: "fa fa-smile-o"
			});
		
		//Make emojie button lives
		ComunicWeb.components.emoji.picker.addPicker(inputText, emojiButton, function(){
			
			//Make the emojie picker visible
			wdtEmojiBundle.popup.style.top = (abs_height_bottom_screen()-357)+"px";

			//Make the smile button visible
			var currLeft = Number(wdtEmojiBundle.popup.style.left.replace("px", ""));
			var potentialLeft = currLeft - 20;

			if(potentialLeft > 0)
				wdtEmojiBundle.popup.style.left = potentialLeft + "px";

		});

		//Add image button
		var imageButton = createElem2({
			appendTo: buttonGroup,
			type: "button",
			elemType: "button",
			class: "btn btn-flat btn-add-image",
		});
		imageButton.onclick = function(){
			//Call file selector
			inputImage.click();
		};
		
			//Add image icon
			createElem2({
				type: "i",
				appendTo: imageButton, 
				class: "fa fa-image"
			});
		
		//Add send button
		var sendButton = createElem2({
			appendTo: buttonGroup,
			type: "button",
			class: "btn btn-primary btn-flat",
			elemType: "submit",
		});

			//Add send icon
			createElem2({
				appendTo: sendButton,
				type: "i",
				class: "fa fa-send-o",
			});

		//Prevent textarea from adding a new line when pressing enter
		$(inputText).keypress(function(event){
			if(event.keyCode == 13){
				event.preventDefault();
				sendButton.click();
			}
		});

		//Add required elements to infosBox
		infosBox.sendMessageForm = {
			formRoot: conversationFormContainer,
			sendButton: sendButton,
			inputText: inputText,
			textarea2: textarea2,
			inputImage: inputImage,
		};

		//Success
		return true;
	},

	/**
	 * Load (or reload) a conversation
	 * 
	 * @param {Integer} conversationID The ID of the conversation to load
	 * @param {Object} conversationWindow Informations about the conversation window
	 * @return {Boolean} True for a success
	 */
	load: function(conversationID, conversationWindow){

		//Log action
		ComunicWeb.debug.logMessage("Loading conversation " + conversationID);

		//Change conversation window name (loading state)
		this.changeName("Loading", conversationWindow);

		//Peform a request to informations about the conversation
		ComunicWeb.components.conversations.interface.getInfosOne(conversationID, function(informations){

			//In case of error
			if(informations.error){
				//Display error notification
				ComunicWeb.common.notificationSystem.showNotification("Couldn't get informations about the conversation !", "danger");
				return false;
			}

			//Get informations about the members of the conversation
			getMultipleUsersInfos(informations.members, function(membersInfos){

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

				//Save conversation informations in the cache
				ComunicWeb.components.conversations.chatWindows.__conversationsCache["conversation-"+conversationID] = conversationInfos;

				//Change the name of the conversation
				ComunicWeb.components.conversations.utils.getName(informations, function(conversationName){
					ComunicWeb.components.conversations.chatWindows.changeName(conversationName, conversationWindow);
				});

				//Update conversation members informations
				ComunicWeb.components.conversations.chatWindows.updateMembersList(conversationInfos);

				//Display conversation settings pane
				ComunicWeb.components.conversations.chatWindows.showConversationSettings(conversationInfos);

				//Register the conversation in the service
				ComunicWeb.components.conversations.service.registerConversation(conversationID);

				//Make send a message button lives
				conversationInfos.box.sendMessageForm.formRoot.onsubmit = function(){
					
					//Submit new message
					ComunicWeb.components.conversations.chatWindows.submitMessageForm(conversationInfos);

					//Block page reloading
					return false;
				};

			});
		});

		//Success
		return true;
	},

	/**
	 * Unload a chat window
	 * 
	 * @param {Integer} conversationID The ID of the conversation to unload
	 * @param {Boolean} keepInfos Keep informations about the chat window
	 * @return {Boolean} True for a success
	 */
	unload: function(conversationID, keepInfos){

		if(!this.__conversationsCache["conversation-"+conversationID]){
			ComunicWeb.debug.logMessage("Couldn't unload conversation: " + conversationID +". It seems not to be loaded...");
			return false;
		}

		//Log action
		ComunicWeb.debug.logMessage("Unloading a conversation: " + conversationID);

		//Get informations
		var conversationInfos = this.__conversationsCache["conversation-"+conversationID];
		
		//Empty messages area
		emptyElem(conversationInfos.box.messagesArea);
		conversationInfos.box.messagesArea.innerHTML = "";

		//Un-register conversation
		ComunicWeb.components.conversations.service.unregisterConversation(conversationID);

		//Remove informations if required
		if(!keepInfos){
			delete this.__conversationsCache["conversation-"+conversationID];
		}

		//Success
		return true;
	},

	/**
	 * Unload all chat windows
	 * 
	 * @return {Boolean} True for a success
	 */
	unloadAll: function(){

		//Clear conversation object
		clearObject(this.__conversationsCache);

		//Success
		return true;
	},

	/**
	 * Change the name of the converation at the top of the windows
	 * 
	 * @param {String} newName The new name for the conversation window
	 * @param {Ojbect} infos Informations about the conversation window
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
		
		//First, check conversation settings button and pane don't exists yet
		if(conversation.box.settingsButton){
			if(conversation.box.settingsButton.remove){
				conversation.box.settingsButton.remove();
			}
		}
		if(conversation.box.settingsPane){
			if(conversation.box.settingsPane.remove){
				conversation.box.settingsPane.remove();
			}
		}

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
		conversation.box.settingsPane = settingsPane;

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

		//Check if user is a conversation moderator or not
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

		//Update follow conversation checkbox status
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
		conversation.settingsForm.createButton.disabled = true;

		//Peform a request through the interface
		ComunicWeb.components.conversations.interface.updateSettings(newValues, function(result){
			
			//Enable again update button
			conversation.settingsForm.createButton.disabled = false;
			
			//Check for errors
			if(result.error)
				ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to update conversation settings !", "danger", 4);
			
			//Reload the conversation
			ComunicWeb.components.conversations.chatWindows.unload(conversation.infos.ID, true);
			ComunicWeb.components.conversations.chatWindows.load(conversation.infos.ID, conversation.box);
		});

		//Success
		return true;
	},

	/**
	 * Submit a new message form
	 * 
	 * @param {Object} convInfos Informations about the conversation
	 * @return {Boolean} True for a success
	 */
	submitMessageForm: function(convInfos){
		
		//Log action
		ComunicWeb.debug.logMessage("Send a new message in a conversation system.");
		
		//Extract main fields
		var form = convInfos.box.sendMessageForm;

		//Check if message is empty
		if(!checkString(form.inputText.value) && !form.inputImage.files[0]){
			ComunicWeb.common.notificationSystem.showNotification("Please type a valid message before trying to send it !", "danger", 2);
			return false;
		}
		
		//Lock send button
		form.sendButton.disabled = true;

		//Prepare what to do next
		var onceSent = function(result){

			//Check for errors
			if(result.error){
				ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to send message! Please try again...", "danger", 2);

				//Unlock send button
				form.sendButton.disabled = false;

				return false;
			}

			//Reset the form
			ComunicWeb.components.conversations.chatWindows.resetCreateMessageForm(convInfos);
		}

		//Send the message throught the interface
		ComunicWeb.components.conversations.interface.sendMessage({
			conversationID: convInfos.infos.ID,
			message: form.inputText.value,
			image: form.inputImage,
			callback: onceSent
		});
		
		//Success
		return true;
	},

	/**
	 * Reset a create a message form
	 * 
	 * @param {Object} infos Informations about the conversation
	 * @return {Boolean} True for a success
	 */
	resetCreateMessageForm: function(infos){

		//Extract form informations
		var form = infos.box.sendMessageForm;

		//Unlock send button and reset its value
		form.sendButton.disabled = false;

		//Empty textarea
		form.inputText.value = "";
		form.textarea2.resetHeight();

		//Remove image from image input
		form.inputImage.value = "";

		//Success
		return true;
	},

	/**
	 * Add a message to a conversation window
	 * 
	 * @param {Integer} conversationID The ID of the conversation to update
	 * @param {Object} messageInfos Informations about the message to add
	 * @return {Boolean} True for a success
	 */
	addMessage: function(conversationID, messageInfos){

		//First, check if the conversation informations can be found
		if(!this.__conversationsCache["conversation-"+conversationID]){
			ComunicWeb.debug.logMessage("Conversation Chat Windows : Error ! Couldn't add a message to the conversation because the conversation was not found !");
			return false;
		}

		//Else extract conversation informations
		var convInfos = this.__conversationsCache["conversation-"+conversationID];

		//Check if it is the current user who sent the message
		var userIsPoster = messageInfos.ID_user == userID();

		//Check if this is the first message of the conversation or not
		if(!convInfos.lastMessage){
			//Initialize last message object
			convInfos.lastMessage = {
				userID: 0,
				messageContainer: false,
			}
		}

		//Check if message poster is the same as the last message
		if(convInfos.lastMessage.userID == messageInfos.ID_user){
			//Skip message container creation & user avatar rendering...
			var messageContainer = convInfos.lastMessage.messageContainer;
			var firstMessageFromUser = false;
		}
		else {
			//Initialize user & message informations elements
			var firstMessageFromUser = true;

			//Create message element
			var messageContainer = createElem2({
				appendTo: convInfos.box.messagesArea,
				type: "div",
				class: "direct-chat-msg " + (userIsPoster ? "right" : "")
			});

			//Display message header
			var messageHeader = createElem2({
				appendTo: messageContainer,
				type: "div",
				class: "direct-chat-info clearfix"
			});

			//Add user name
			var usernameElem = createElem2({
				appendTo: messageHeader,
				type: "span",
				class: "direct-chat-name pull-" + (userIsPoster ? "right" : "left"),
				innerHTML: "Loading",
			});

			//Hide user name if it is the current user
			if(userIsPoster)
				usernameElem.style.display = "none";

			//Add user account image
			var userAccountImage = createElem2({
				appendTo: messageContainer,
				type: "img",
				class: "direct-chat-img",
				src: ComunicWeb.__config.assetsURL + "img/defaultAvatar.png",
				alt: "User account image",
			});

			//Load user informations
			if(convInfos.membersInfos["user-" + messageInfos.ID_user]){

				//Get informations
				var userInfos = convInfos.membersInfos["user-" + messageInfos.ID_user];

				//Replace poster name
				usernameElem.innerHTML = userInfos.firstName + " " + userInfos.lastName;
				userAccountImage.src = userInfos.accountImage;
			}

			//Update conversation informations
			convInfos.lastMessage = {
				userID: messageInfos.ID_user,
				messageContainer: messageContainer,
			}
		}
		

		//Add message
		var messageTargetElem = createElem2({
			appendTo: messageContainer,
			type: "div",
			class: "direct-chat-text " + (!firstMessageFromUser ? "not-first-message" : ""),
		});

		//Add text message
		var textMessage = createElem2({
			appendTo: messageTargetElem,
			type: "span",
			innerHTML: removeHtmlTags(messageInfos.message), //Remove HTML tags
		});

		//Check if an image has to be added
		if(messageInfos.image_path != null){
			
			//Image link
			var imageLink = createElem2({
				appendTo: messageTargetElem,
				type:"a",
				href: messageInfos.image_path,
			});

			//Image element
			createElem2({
				appendTo: imageLink,
				type: "img",
				src: messageInfos.image_path,
				class: "conversation-msg-image"
			});

			//Enable lightbox
			imageLink.onclick = function(){
				$(this).ekkoLightbox({
					alwaysShowClose: true,
				});
				return false;
			}
		}

		//Parse emojies in text message
		ComunicWeb.components.emoji.parser.parse({
			element: textMessage,
		});

		//Enable slimscroll
		$(convInfos.box.messagesArea).slimscroll({
			height: "250px",
		});

		//Scroll to the bottom of the conversation
		var scrollBottom = $(convInfos.box.messagesArea).prop("scrollHeight")+"px";
		$(convInfos.box.messagesArea).slimScroll({
			scrollTo: scrollBottom
		});

		//Initialize top scroll detection if required
		this.initTopScrollDetection(conversationID);

		//Success
		return true;
	},

	/**
	 * Init top scroll detection (if required)
	 * 
	 * @param {number} conversationID The ID of the target conversation
	 */
	initTopScrollDetection: function(conversationID){

		//Extract conversation informations
		var convInfo = this.__conversationsCache["conversation-"+conversationID];
		
		//Check if nothing has to be done
		if(convInfo.box.initializedScrollDetection)
			return;
		
		//Mark scroll detection as initialized
		convInfo.box.initializedScrollDetection = true;

		var scrollDetectionLocked = false;
		var scrollTopCount = 0;
		$(convInfo.box.messagesArea).slimScroll().bind("slimscrolling", function(e, pos){

			if(scrollDetectionLocked)
				return;

			if(pos != 0){
				scrollTopCount = 0;
			}

			scrollTopCount++;

			//Check top count
			if(scrollTopCount < 3)
				return;
			
			//Lock the detection
			scrollDetectionLocked = true;

			//Fetch older messages
			ComunicWeb.components.conversations.interface.getOlderMessages(
				conversationID,
				ComunicWeb.components.conversations.service.getOldestMessageID(conversationID),
				10,
				function(result){

					//Unlock scroll detection
					scrollDetectionLocked = false;

					//Check for errors
					if(result.error){
						notify("An error occured while trying to fetch older messages for the conversation !");
						return;
					}

					//Check for results
					if(result.length == 0){
						//Lock scroll detection in order to avoid useless traffic
						scrollDetectionLocked = true;
						return;
					}

					//Save the ID of the oldest message
					ComunicWeb.components.conversations.service.setOldestMessageID(result[0].ID);

					//Process the messages in reverse order
				}
			);
		});
	}
}

//Register conversations cache cleaning function
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.chatWindows.unloadAll");