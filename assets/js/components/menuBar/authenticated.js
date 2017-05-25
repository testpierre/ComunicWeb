/**
 * Menubar for authenticated users complements
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.menuBar.authenticated = {
	/**
	 * Add authenticated user specific elements
	 * 
	 * @param {HTMLElement} container The container element of the Menubar
	 */
	addElements: function(container){
		//Create an auto-collapsed element
		var navbarCollapse = createElem("div", container);
		navbarCollapse.id = "navbar-collapse";
		navbarCollapse.className = "navbar-collapse pull-right collapse";

		//Create navbar elements list
		var navbarElemList = createElem("ul", navbarCollapse);
		navbarElemList.className = "nav navbar-nav";

		//Add dropdown menu
		this.addDropdown(navbarElemList);
		
	},

	/**
	 * Add dropdown menu
	 * 
	 * @param {HTMLElement} navbarElem The target navbarlist element 
	 * @return {Boolean} True for a success
	 */
	addDropdown: function(navbarElem){
		//Create dropdown menu
		var dropdown = createElem("li", navbarElem);
		dropdown.className = "dropdown";

		//Add dropdown button
		var dropdownButton = createElem("a", dropdown);
		dropdownButton.className = "dropdown-toggle";
		dropdownButton.setAttribute("data-toggle", "dropdown");
		
		//Add dropdown button icon
		var dropdownButtonIcon = createElem("i", dropdownButton);
		dropdownButtonIcon.className = "fa fa-gear";

		dropdownButton.innerHTML += " ";

		//Add dropdown button arrow
		var dropdownButtonArrow = createElem("span", dropdownButton);
		dropdownButtonArrow.className = "caret";

		//Create dropdown menu content
		var dropdownContent = createElem("ul", dropdown);
		dropdownContent.className = "dropdown-menu"
		dropdownContent.setAttribute("role", "menu");

		//Add logout link
		var logoutButton = createElem("li", dropdownContent);
		var logoutButtonLink = createElem("a", logoutButton);
		logoutButtonLink.innerHTML = "Logout";
		logoutButton.onclick = function(){openPage("logout")};
	}
};