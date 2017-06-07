/**
 * Discussions list window
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.discussions.list = {
	/**
	 * Display discussions list window
	 * 
	 * @param {HTMLElement} nodeBefore The node before the destination
	 * @return {Boolean} True for a success
	 */
	display: function(nodeBefore){

		//Log action
		ComunicWeb.debug.logMessage("INFO : initialize conversation list box.");

		//Create a window
		var listBox = ComunicWeb.components.discussions.windows.create(nodeBefore);

		//Change box title
		listBox.boxTitle.innerHTML = "Discussions";

		//Remove footer
		listBox.boxFooter.remove();

		//Add the create button
		var createButton = createElem("button");
		listBox.boxTools.insertBefore(createButton, listBox.boxTools.children[0]);
		createButton.className = "btn btn-box-tool";
		createButton.onclick = function(){
			ComunicWeb.components.discussions.list.displayCreateForm(listBox);
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
	 * Display the form to create a new discussion
	 * 
	 * @param {Object} listBox Informations about the listbox target
	 * @return {Boolean} True for a success
	 */
	displayCreateForm: function(listBox){

		//Log action
		ComunicWeb.debug.logMessage("INFO : initialize create discussion form");

		//Hide boxy body contents
		var boxBodyElem = listBox.boxBody.children;
		for(i in boxBodyElem){
			if(boxBodyElem[i].style)
				boxBodyElem[i].style.display = "none";
		}

		//Change box title
		listBox.boxTitle.innerHTML = "New discussion";

		//Create and display discussion creation form
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


		//Discussion name
		var discussionNameInput = createFormGroup({
			target: createForm, 
			label: "Discussion name", 
			placeholder: "Optionnal", 
			type: "text"});

		//Follow disucssion
		var followDiscussionInput = createFormGroup({
			target: createForm, 
			label: "Follow discussion", 
			checked: true,
			type: "checkbox"});

		//Create button
		var createButton = createElem("button", createForm);
		createButton.className = "btn btn-primary";
		createButton.style.width = "100%";
		createButton.innerHTML = "Create discussion";

		//Generate a summary object about all the informations we have got
		var infos = {
			listBox: listBox,
			userElement: usersElement,
			discussionNameInput: discussionNameInput,
			followDiscussionInput: followDiscussionInput,
		};

		//Make button lives
		createButton.onclick = function(){
			ComunicWeb.components.discussions.list.submitCreateDiscussionForm(infos);
		};

		//Success
		return true;
	},

	/**
	 * Submit a create a discussion form
	 * 
	 * @param {Object} infos Data to pass to the function
	 * * @info {Object} listBox Informations about the listbox creating the discussion
	 * * @info {HTMLElement} userElement Pointer on userElement
	 * * @info {HTMLElement} discussionNameInput Pointer on the input of the form of the discussion
	 * * @info {HTMLElement} followDiscussionInput Pointer on the "follow discussion" checkbox
	 * @return {Boolean} True for a success
	 */
	submitCreateDiscussionForm: function(infos){

		//First, get the list of users
		console.log("hello from list.js");
	}
}