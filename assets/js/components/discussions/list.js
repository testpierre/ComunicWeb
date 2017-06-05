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

		//Discussion name
		var discussionNameInput = createFormGroup(createForm, "Discussion name", "Optionnal", "text");

		//Follow disucssion
		var followDiscussionInput = createFormGroup(createForm, "Follow discussion", "true", "checkbox");
		

		//Create button
		var createButton = createElem("butto", createForm);
		createButton.className = "btn btn-primary";
		createButton.style.width = "100%";
		createButton.innerHTML = "Create discussion";

		//Success
		return true;
	}
}