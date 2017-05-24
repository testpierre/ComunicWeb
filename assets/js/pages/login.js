/**
 * Login page controller
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.login = {
	/**
	 * Open login page
	 * 
	 * @param {Object} additionnalData Additionnal data passed in the method
	 * @param {element} targetElement Where the template will be applied
	 * @returns {Boolean} False if it fails 
	 */
	openLoginPage: function(additionnalData, targetElement){

		//Prevent errors
		if(!additionnalData)
			additionnalData = {};

		//First, check if user is already logged in or not
		if(ComunicWeb.user.userLogin.getUserLoginState() === true){
			//Log message
			ComunicWeb.debug.logMessage("Couldn't open login page because user is already logged in !");

			//Open home page
			ComunicWeb.common.page.openPage("home");

			//Quit page
			return false;
		}

		//Prepare additional data
		var additionalTemplateData = {};

		//Preparing next actions
		var afterParsingTemplate = function(){
			//Change body class name
			document.body.className = "login-page hold-transition";

			//Enable iCheck
			$(function () {
				$('input').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%' // optional
				});
			});

			//Define email address (if possible)
			byId("usermail").value = ComunicWeb.components.mailCaching.get();

			//Get login form element
			var loginBody = document.getElementById("loginForm");

			//Get login button
			var loginButton = loginBody.getElementsByClassName("btn-login")[0];

			//Make the login action accessible
			//loginButton.onclick = ComunicWeb.pages.login.loginSubmit;
			loginBody.onsubmit = ComunicWeb.pages.login.loginSubmit;


			//Check now additional parametres changes
			//Check if a specific email address was specified
			if(additionnalData.emailInput)
				byId("usermail").value = additionnalData.emailInput;

			//Check if we have to display a login failed message
			if(additionnalData.loginFailedMessage)
				ComunicWeb.pages.login.displayLoginError();
		};

		//Apply template
		ComunicWeb.common.page.getAndShowTemplate(targetElement, additionalTemplateData, "pages/login/loginPage.tpl", afterParsingTemplate, true);
	},

	/**
	 * Perform user login
	 * 
	 * @return {Boolean} False if it fails
	 */
	loginSubmit: function(){
		//Get inputs
		var usermailInput = byId("usermail"); //Usermail
		var userpasswordInput = byId("userpassword"); //Password
		var rememberLoginInput = document.getElementById("rememberLogin"); //Remember login

		//Check inputs
		if(!(
			ComunicWeb.common.formChecker.checkInput(usermailInput, true) && //Check usermail input
			ComunicWeb.common.formChecker.checkInput(userpasswordInput, true) //Check password input
		)){
		   //Error notification
		   ComunicWeb.common.notificationSystem.showNotification("Please check what you've typed !", "error");

		   //Stop function execution
		   return false;
		}
	   
		//Enable overlay (use .remove() to remove)
		var screenOverlay = ComunicWeb.common.page.showTransparentWaitSplashScreen();
		
		//Retrieve values
		var usermail = usermailInput.value; 
		var userpassword = userpasswordInput.value;
		var permanentLogin = rememberLoginInput.checked;

		//What to do once user is logged in (or not)
		var afterTryLogin = function(loginResult){

			//First, remove overlay
			screenOverlay.remove();

			//Check if login failed
			if(!loginResult){
				
				//Display error
				ComunicWeb.pages.login.displayLoginError();

				//Return false
				return false;
		   }

			//Open home page
			ComunicWeb.common.page.openPage("home");
		};

		//Try to login user
		ComunicWeb.user.userLogin.loginUser(usermail, userpassword, permanentLogin, afterTryLogin);
	},

	/**
	 * Display login error message
	 * 
	 * @return {Boolean} True for a success
	 */
	displayLoginError: function(){
		//Create error modal
		errorMessageElem = ComunicWeb.common.messages.createCalloutElem("Login failed", "Please check your usermail and password", "danger");

		//Apply error modal
		document.getElementById('loginMessagesTarget').innerHTML = "";
		document.getElementById('loginMessagesTarget').appendChild(errorMessageElem);

		//Success
		return true;
	},
};