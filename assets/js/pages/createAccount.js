/**
 * Create account page
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.createAccount = {

	/**
	 * Open create account page
	 * 
	 * @param {Object} additionnalData Additionnal data passed in the method
	 * @param {element} target Where the page will be applied
	 */
	openPage: function(additionnalData, target){

		//Display the account creation form
		this._display_form(target);

	},

	/**
	 * Display the account creation form
	 * 
	 * @param {HTMLElement} target The target for the page
	 */
	_display_form: function(target){

		//Create form root
		var formRoot = createElem2({
			appendTo: target,
			type: "div",
			class: "create-account-form"
		});

		//Add a title
		createElem2({
			appendTo: formRoot,
			type: "h2",
			innerHTML: "Create an account"
		});

		//Add a message
		createElem2({
			appendTo: formRoot,
			type: "p",
			innerHTML: "Use the following form to create an account and join the network : "
		});

		//Input user first name
		var firstNameInput = createFormGroup({
			target: formRoot,
			label: "First name",
			placeholder: "Your first name",
			type: "text"
		});

		//Input user last name
		var lastNameInput = createFormGroup({
			target: formRoot,
			label: "Last name",
			placeholder: "Your last name",
			type: "text"
		});

		//Input user email
		var emailInput = createFormGroup({
			target: formRoot,
			label: "Email address <small><i class='fa fa-warning'></i> Warning! You will not be able to change this later !</small>",
			placeholder: "Your email address",
			type: "email"
		});

		//Input user password
		var passwordInput = createFormGroup({
			target: formRoot,
			label: "Password",
			placeholder: "Your password",
			type: "password"
		});

		//Confirm user password
		var confirmPasswordInput = createFormGroup({
			target: formRoot,
			label: "Confirm your password",
			placeholder: "Your password",
			type: "password"
		});

		//Submit form
		var submitButtonContainer = createElem2({
			appendTo: formRoot,
			type: "div",
			class: "submit-form"
		});
		var submitButton = createElem2({
			appendTo: submitButtonContainer,
			type: "button",
			class: "btn btn-primary",
			innerHTML: "Create the account"
		});
	},

}