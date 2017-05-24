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

        loginForm.onsubmit = function(){
            //Try to login user; in case of failure redirect to login page

            return false;
        }

        //Add email address formGroup
        var emailFormGroup = createElem("div", loginForm);
        emailFormGroup.className = "form-group";

        //Add email input
        var emailInput = createElem("input", emailFormGroup);
        emailInput.className = "form-control";
        emailInput.placeholder = "Email address";
        emailInput.type = "email";

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
    }
}