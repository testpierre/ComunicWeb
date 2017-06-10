/**
 * Conversations list window
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.list = {
	/**
	 * Display conversations list window
	 * 
	 * @param {HTMLElement} nodeBefore The node before the destination
	 * @return {Boolean} True for a success
	 */
	display: function(nodeBefore){

		//Log action
		ComunicWeb.debug.logMessage("INFO : initialize conversation list box.");

		//Create a window
		var listBox = ComunicWeb.components.conversations.windows.create(nodeBefore);

		//Change box title
		listBox.boxTitle.innerHTML = "Conversations";

		//Remove footer
		listBox.boxFooter.remove();

		//Add the create button
		var createButton = createElem("button");
		listBox.boxTools.insertBefore(createButton, listBox.boxTools.children[0]);
		createButton.className = "btn btn-box-tool";
		createButton.onclick = function(){
			ComunicWeb.components.conversations.list.displayCreateForm(listBox);
		}

			//Button icon
			var createButtonIcon = createElem("i", createButton);
			createButtonIcon.className = "fa fa-pencil";

		//Display conversations list
		listBox.boxBody.innerHTML = "<p>Hello world</p>";

		//Success
		return true;
	},

	/**
	 * Display the form to create a new conversation
	 * 
	 * @param {Object} listBox Informations about the listbox target
	 * @return {Boolean} True for a success
	 */
	displayCreateForm: function(listBox){

		//Log action
		ComunicWeb.debug.logMessage("INFO : initialize create conversation form");

		//Hide boxy body contents
		var boxBodyElem = listBox.boxBody.children;
		for(i in boxBodyElem){
			if(boxBodyElem[i].style)
				boxBodyElem[i].style.display = "none";
		}

		//Change box title
		listBox.boxTitle.innerHTML = "New conversation";

		//Create and display conversation creation form
		var createForm = createElem("div", listBox.boxBody);

		//Choose users
		//Create select user element
		var usersElement = createFormGroup({
			target: createForm, 
			label: "Users", 
			multiple: true,
			placeholder: "Select users",
			type: "select2"});

		//Initialize user selector
		ComunicWeb.components.userSelect.init(usersElement);


		//Conversation name
		var conversationNameInput = createFormGroup({
			target: createForm, 
			label: "Conversation name", 
			placeholder: "Optionnal", 
			type: "text"});

		//Follow disucssion
		var followConversationInput = createFormGroup({
			target: createForm, 
			label: "Follow conversation", 
			checked: true,
			type: "checkbox"});

		//Create button
		var createButton = createElem("button", createForm);
		createButton.className = "btn btn-primary";
		createButton.style.width = "100%";
		createButton.innerHTML = "Create conversation";

		//Generate a summary object about all the informations we have got
		var infos = {
			listBox: listBox,
			usersElement: usersElement,
			conversationNameInput: conversationNameInput,
			followConversationInput: followConversationInput,
		};

		//Make button lives
		createButton.onclick = function(){
			ComunicWeb.components.conversations.list.submitCreateConversationForm(infos);
		};

		//Success
		return true;
	},

	/**
	 * Submit a create a conversation form
	 * 
	 * @param {Object} infos Data to pass to the function
	 * * @info {Object} listBox Informations about the listbox creating the conversation
	 * * @info {HTMLElement} usersElement Pointer on userElement
	 * * @info {HTMLElement} conversationNameInput Pointer on the input of the form of the conversation
	 * * @info {HTMLElement} followConversationInput Pointer on the "follow conversation" checkbox
	 * @return {Boolean} True for a success
	 */
	submitCreateConversationForm: function(infos){

		//First, get the list of users
		var selectedUsers = ComunicWeb.components.userSelect.getResults(infos.usersElement);

		//We check if less than one user was selected
		if(selectedUsers.length < 1){
			//Display an error notification
			ComunicWeb.common.notificationSystem.showNotification("Please select at least one user!", "danger", 2);

			return false;
		}

		//Add current user to the list
		selectedUsers.push(ComunicWeb.user.userLogin.getUserID());

		//Prepare the creation of the conversation
		//Get all required informations
		var conversationInformations = {
			users: selectedUsers,
			follow: infos.followConversationInput.checked,
			conversationName: (infos.conversationNameInput.value == "" ? false : infos.conversationNameInput.value),
		};

		//Change box body style
		var splashScreen = ComunicWeb.common.page.showTransparentWaitSplashScreen(infos.listBox.boxBody);

		//Contact the interface to create the conversation
		ComunicWeb.components.conversations.interface.createConversation(conversationInformations, function(response){

			//First, remove splash screen
			splashScreen.remove();

			//Check for errors
			if(response.error){
				//Make an error notification
				notifMessage = "An error occured while trying to create conversation. Please try again.";
				ComunicWeb.common.notificationSystem.showNotification(notifMessage, "danger", 3);

				return false;
			}

			//Success
			alert("success");
		})
	}
}