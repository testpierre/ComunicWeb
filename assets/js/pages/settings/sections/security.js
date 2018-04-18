/**
 * Settings security section script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.sections.security = {

	/**
	 * Open security settings section
	 * 
	 * @param {object} args Additionnal arguments
	 * @param {HTMLElement} target The target for the page
	 */
	open: function(args, target){
		
		//Create a box
		var box = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary box-security-settings"
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
			innerHTML: "Security settings"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: box,
			type: "div",
			class: "box-body"
		});

		//Append the form to query user password
		this._append_form_prompt_user_password(boxBody);
	},

	/**
	 * Append a form to prompt user password
	 * 
	 * @param {HMTLElement} target The target for the form
	 */
	_append_form_prompt_user_password: function(target){

		//Create form contener (allows easier manipulations then)
		var formContener = createElem2({
			appendTo: target,
			type: "div",
			class: "prompt-user-password"
		});

		//Add title
		createElem2({
			appendTo: formContener,
			type: "h4",
			innerHTML: "Password required"
		});

		//Add explanation
		createElem2({
			appendTo: formContener,
			type: "p",
			innerHTML: "In order to protect these sensitive information, your password is required to access this page."
		});

		//User password form
		var passwordInput = createFormGroup({
			target: formContener,
			label: "Your password",
			placeholder: "Your password",
			type: "password"
		});

		//Add submit button
		var sendButton = createElem2({
			appendTo: formContener,
			type: "div",
			class: "btn btn-primary submit-form",
			innerHTML: "Submit"
		});

		//Make submit button lives
		sendButton.onclick = function(){

			//Check the validity of the input
			if(!ComunicWeb.common.formChecker.checkInput(passwordInput, true)){
				notify("Please input your password !", "danger");
				return;
			}

			//Hide send button
			sendButton.style.visibility = "hide";

			//Perform a request over the server to fetch security settings
			ComunicWeb.components.settings.interface.getSecurity(passwordInput.value, function(result){

				//Show send button
				sendButton.style.visibility = "visible";

				//Check for errors
				if(result.error){
					notify("An error occured while retrieving security settings! Please check your password...", "danger");
					return;
				}

				//Remove password input form
				emptyElem(formContener);

				//Show security information update form
				
			});
		};
	},
}