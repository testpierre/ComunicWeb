/**
 * Settings general section
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.sections.general = {

	/**
	 * Open settings section
	 * 
	 * @param {object} args Additionnal arguments
	 * @param {HTMLElement} target The target for the page
	 */
	open: function(args, target){
		
		//Create a box
		var box = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary box-general-settings"
		});

		//Add box header
		var boxHead = createElem2({
			appendTo: box,
			type: "div",
			class: "box-header",
		});
		var boxTitle = createElem2({
			appendTo: boxHead,
			type: "h3",
			class: "box-title",
			innerHTML: "General settings"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: box,
			type: "div",
			class: "box-body"
		});

		//Display loading message
		var loadingMsg = ComunicWeb.common.messages.createLoadingCallout();
		boxBody.appendChild(loadingMsg);

		//Load general settings information
		ComunicWeb.components.settings.interface.getGeneral(function(infos){

			//Remove loading message
			loadingMsg.remove();

			//Check for errors
			if(infos.error){
				var errMsg = ComunicWeb.common.messages.createCalloutElem("Error", "An error occured while retrieving account settings...", "danger");
				boxBody.appendChild(errMsg);
				return;
			}

			//Display the settings form
			ComunicWeb.pages.settings.sections.general._show_form(infos, boxBody);
		});
	},

	/**
	 * Show the settings form
	 * 
	 * @param {object} infos Informations about the user (General settings)
	 * @param {HTMLElement} target The target for the page
	 */
	_show_form: function(infos, target){

		//Main account information
		createElem2({
			appendTo: target,
			type: "h4",
			innerHTML: "Main account information"
		});

		//Display user ID
		createFormGroup({
			target: target,
			label: "User ID",
			type: "text",
			value: infos.id,
			disabled: true,
			additionalGroupClasses: "input-user-id"
		});

		//Display user email
		createFormGroup({
			target: target,
			label: "Email address",
			type: "email",
			value: infos.email,
			disabled: true,
			additionalGroupClasses: "input-user-email"
		});

		//Display user first name
		var firstName = createFormGroup({
			target: target,
			label: "First name",
			placeholder: "Your first name",
			type: "text",
			value: infos.firstName,
		});

		//Last name
		var lastName = createFormGroup({
			target: target,
			label: "Last name",
			placeholder: "Your last name",
			type: "text",
			value: infos.lastName
		});

		//Allow mails from Comunic
		var allowEmails = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Allow Comunic to send you emails",
			checked: infos.allow_comunic_mails
		});

		//Page settings
		add_space(target);
		createElem2({
			appendTo: target,
			type: "h4",
			innerHTML: "Page settings"
		});

		//Public page
		var publicPage = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Make your page public (available to every Comunic users)",
			checked: infos.is_public
		});

		//Open page
		var openPage = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Make your page open (available for the entire world)",
			checked: infos.is_open
		});
		
		//Make the public and open button begin synchronized
		$(publicPage).on("ifChanged", function(){
			if(!publicPage.checked){
				$(openPage).iCheck("uncheck");
			}
		});
		$(openPage).on("ifChanged", function(){
			if(openPage.checked){
				$(publicPage).iCheck("check");
			}
		});


		//Allow comments creation
		var allowComments = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Allow the comments on your page",
			checked: infos.allow_comments
		});

		//Allow posts from friends
		var allowPostsFromFriends = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Allow the posts from your friends on your page",
			checked: infos.allow_posts_from_friends
		});

		//Public friends list
		var publicFriendsList = createFormGroup({
			target: target,
			type: "checkbox",
			label: "Make your friend list public",
			checked: infos.public_friends_list
		});

		//Personnal website
		var personnalWebsite = createFormGroup({
			target: target,
			label: "Personnal website (optionnal)",
			type: "text",
			placeholder: "https://...",
			value: infos.personnal_website != "null" ? infos.personnal_website : ""
		});

		//Public notes
		var publicNotes = createFormGroup({
			target: target,
			label: "Public notes for your account 255 characters max (optionnal)",
			type: "textarea",
			placeholder: "Notes about your account...",
			value: infos.publicNote != "null" ? infos.publicNote : ""
		});

		//Virtual directory
		var virtualDirectory = createFormGroup({
			target: target,
			label: "Virtual directory for your user page (" + ComunicWeb.__config.siteURL + "user/{virtual_directory})<br />Account tag (in the form @{virtual_directory})",
			type: "text",
			placeholder: "Eg. john.way",
			value: infos.virtual_directory != "null" ? infos.virtual_directory : ""
		});

		//Auto-check the virtual directory when it is updated
		var checkTarget = createElem2({
			appendTo: target,
			type: "small"
		});
		
		virtualDirectory.onkeyup = function(){
			checkTarget.innerHTML = "Checking availability...";

			//Get the directory to check
			var directory = virtualDirectory.value;

			//Check if the directory is empty
			if(directory == ""){
				checkTarget.innerHTML = "";
				return;
			}

			//Perform a request on the API
			ComunicWeb.components.settings.interface.checkUserDirectoryAvailability(directory, function(callback){

				//Check if the directory is available or not
				checkTarget.innerHTML = callback.error ? "<invalidDirectory>This directory is not available!</invalidDirectory>" : "This directory seems to be available!";

			})
		}

		//Submit button
		var sendButton = createElem2({
			appendTo: target,
			type: "div",
			class: "btn btn-primary submit-form",
			innerHTML: "Update"
		});

		//Make the submit button lives
		sendButton.onclick = function(){

			//Check the given values
			if(!ComunicWeb.common.formChecker.checkInput(firstName, true))
				return notify("Please check your first name!", "danger");

			if(!ComunicWeb.common.formChecker.checkInput(lastName, true))
				return notify("Please check your last name!", "danger");
			
			if(personnalWebsite.value != ""){
				if(!check_url(personnalWebsite.value))
					return notify("Please check the given URL !", "danger");
			}

			//Pack all the values in an object
			var settings = {
				firstName: firstName.value,
				lastName: lastName.value,
				allow_comunic_mails: allowEmails.checked,
				isPublic: publicPage.checked,
				isOpen: openPage.checked,
				allowComments: allowComments.checked,
				allowPostsFromFriends: allowPostsFromFriends.checked,
				publicFriendsList: publicFriendsList.checked,
				personnalWebsite: personnalWebsite.value,
				virtualDirectory: virtualDirectory.value,
				publicNote: publicNotes.value,
			};

			//Lock send button
			sendButton.style.visibility = "hidden";

			//Perform the request over the API
			ComunicWeb.components.settings.interface.setGeneral(settings, function(result){

				//Unlock send button
				sendButton.style.visibility = "visible";

				//Check for errors
				if(result.error){
					notify("An error occured while updating user settings!", "danger");
					return;
				}

				//Success
				notify("Your settings have been successfully saved !", "success");

				//Reset the system
				ComunicWeb.common.system.reset();
			});
		};
	},

};