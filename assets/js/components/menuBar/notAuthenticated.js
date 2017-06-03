/**
 * Not authenticated menu bar components
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.menuBar.notAuthenticated = {
	/**
	 * Add not-authenticated user specific elements
	 * 
	 * @param {HTMLElement} container The container element of the Menubar
	 */
	addElements: function(container){

		//Create an auto-collapsed element
		var navbarCollapse = createElem("div", container);
		navbarCollapse.id = "navbar-collapse";
		navbarCollapse.className = "navbar-collapse pull-right collapse";

		//Create login form
		var loginForm = createElem("form", navbarCollapse);
		loginForm.className = "navbar-form navbar-left menubar-loginForm";
		loginForm.setAttribute("role", "login");

		//Add email address formGroup
		var emailFormGroup = createElem("div", loginForm);
		emailFormGroup.className = "form-group";

		//Add email input
		var emailInput = createElem("input", emailFormGroup);
		emailInput.className = "form-control";
		emailInput.placeholder = "Email address";
		emailInput.type = "email";
		emailInput.value = ComunicWeb.components.mailCaching.get();

		//Add password formGroup
		var passwordFormGroup = createElem("div", loginForm);
		passwordFormGroup.className = "form-group";

		//Add password input
		var passwordInput = createElem("input", passwordFormGroup);
		passwordInput.className = "form-control";
		passwordInput.placeholder = "Password";
		passwordInput.type = "password";

		//Add submit button formGroup
		var submitFromGroup = createElem("div", loginForm);
		submitFromGroup.className = "form-group";

		//Add submit input
		var submitInput = createElem("input", submitFromGroup);
		submitInput.className = "form-control";
		submitInput.value = "Login";
		submitInput.type = "submit";

		//Add submit form behaviour
		loginForm.onsubmit = function(){
			//Enable screen overlay (use .remove() to remove)
			var screenOverlay = ComunicWeb.common.page.showTransparentWaitSplashScreen();

			//Try to login user; in case of failure redirect to login page
			//What to do once user is logged in (or not)
			var afterTryLogin = function(loginResult){

				//First, remove overlay
				screenOverlay.remove();

				//Check if login failed
				if(!loginResult){
					
					//Redirect to login page
					ComunicWeb.common.page.openPage("login", {
						loginFailedMessage: true,
						emailInput: emailInput.value,
					});

					//Return false
					return false;
			}
				
				//Open home page
				ComunicWeb.common.page.openPage("home");
			};

			//Try to login user
			ComunicWeb.user.userLogin.loginUser(emailInput.value, passwordInput.value, true, afterTryLogin);

			//Block form
			return false;
		}
	}
}