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
		var loadingMsg = ComunicWeb.common.messages.createCalloutElem("Loading", "Please wait while this page is loading...", "info");
		boxBody.appendChild(loadingMsg);

		//Load general settings information
		ComunicWeb.components.settings.interface.getGeneral(function(infos){

			//Remove loading message
			loadingMsg.remove();

			//Check for errors
			if(infos.error){
				var errMsg = ComunicWeb.common.messages.createCalloutElem("Error", "An error occured while retrieving account settings...", "danger");
				boxBody.appendChild(errMsg);
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

		//Display user ID
		createFormGroup({
			target: target,
			label: "User ID",
			type: "text",
			value: infos.id,
			disabled: true,
			additionalGroupClasses: "input-user-id"
		});

		//Display user name
		createFormGroup({
			target: target,
			label: "Email address",
			type: "email",
			value: infos.email,
			disabled: true,
			additionalGroupClasses: "input-user-email"
		});

	},

};