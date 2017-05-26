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
		navbarCollapse.className = "navbar-collapse pull-left collapse";

		//Create navbar elements list
		var navbarCollapseElemList = createElem("ul", navbarCollapse);
		navbarCollapseElemList.className = "nav navbar-nav";

		//Add search form
		this.addSearchForm(navbarCollapseElemList);

		//Navbar right elements
		var navbarRight = createElem("div", container);
		navbarRight.className = "navbar-custom-menu";
		var navbarRightElemList = createElem("ul", navbarRight);
		navbarRightElemList.className = "nav navbar-nav";

		//Add user name
		this.addUserName(navbarRightElemList);

		//Add dropdown menu
		this.addDropdown(navbarRightElemList);
		
	},

	/**
	 * Add dropdown menu
	 * 
	 * @param {HTMLElement} navbarElem The target navbarlist element 
	 * @return {HTMLElement} The dropdown content element
	 */
	addDropdown: function(navbarElem){
		//Create dropdown menu
		var dropdown = createElem("li", navbarElem);
		dropdown.className = "dropdown dropdown-user-menu-action";

		//Add dropdown button
		var dropdownButton = createElem("a", dropdown);
		dropdownButton.className = "dropdown-toggle";
		dropdownButton.setAttribute("data-toggle", "dropdown");
		
		//Add dropdown button icon
		var dropdownButtonIcon = createElem("i", dropdownButton);
		dropdownButtonIcon.className = "fa fa-gear";

		//Add space
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

		//Return dropdown content element
		return dropdownContent;
	},

	/**
	 * Add user name element
	 * 
	 * @param {HTMLElement} navbarElem The target navbarlist element 
	 * @return {HTMLElement} The user element
	 */
	addUserName: function(navbarElem){
		//Create user element
		var userelement = createElem("li", navbarElem);
		userelement.className = "user-menu";

		//Add user link element
		var userlinkelement = createElem("a", userelement);

		//Add user image
		var userimage = createElem("img", userlinkelement);
		userimage.className = "user-image";
		userimage.src = ComunicWeb.__config.assetsURL + "img/defaultAvatar.png";

		//Add user name
		var userNameElem = createElem("span", userlinkelement);
		userNameElem.className = "hidden-xs";
		userNameElem.innerHTML = "Loading...";

		//Make a request to get informations about the user
		ComunicWeb.user.getUserInfos.getUserInfos("current", (function(userInfos){

			//Change user name
			userNameElem.innerHTML = userInfos.firstName + " "+ userInfos.lastName;

			//Change avatar url
			userimage.src = userInfos.accountImage;

		}));
	},

	/**
	 * Add search form element
	 * 
	 * @param {HTMLElement} navbarElem The target navbarlist element 
	 * @return {HTMLElement} The user element
	 */
	addSearchForm: function(navbarElem){
		//Create form element
		var searchForm = createElem("form", navbarElem.parentNode);
		searchForm.className = "navbar-form navbar-left";
		searchForm.setAttribute("role", "search");

		//Create form group
		var formGroup = createElem("div", searchForm);
		formGroup.className = "form-group";

		//Create search input
		var searchInput = createElem("input", formGroup);
		searchInput.className = "form-control";
		searchInput.placeholder = "Search...";
		searchInput.type = "text";
		searchInput.id = "navbar-search-input";
		
	}
};