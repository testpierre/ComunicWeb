/**
 * Menu bar object
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.menuBar = {
	/**
	 * Display menu bar
	 * 
	 * @return {Boolean} True for a success
	 */
	display: function(){
		//Log message
		ComunicWeb.debug.logMessage("Display menu bar");

		//Try to get menubar element
		var menuBar = byId("menuBar");

		//We check if the menubar is present or not on the page
		if(menuBar){
			ComunicWeb.debug.logMessage("Info: The menubar is already present on the page");
			return true;
		}

		//So we have to initializate it
		//Create menubar element
		var menuBar = createElem("header");
		byId("wrapper").insertBefore(menuBar, byId("wrapper").childNodes[0]);
		menuBar.id = "menuBar";

		//Initializate the menubar
		return this.init(menuBar);
	},

	/**
	 * Initializate a menubar
	 * 
	 * @param {HTMLElement} menuContainer The menu container
	 * @return {Boolan} True for a success
	 */
	init: function(menuContainer){
		//Log action
		ComunicWeb.debug.logMessage("Info: Initializate a menuBar in element : '"+menuContainer.id+"'");

		//Change menu container informations
		menuContainer.className = "main-header";

		//Create main menu
		var menuElem = createElem("div", menuContainer);
		menuElem.className = "navbar navbar-static-top";

		//Create nav element
		var navElem = createElem("nav", menuElem);
		navElem.className = "navbar navbar-static-top";

		//Create conatiner
		var containerElem = createElem("div", navElem);
		containerElem.className = "container";

		//Create navbar header
		var navbarHeader = createElem("div", containerElem);
		navbarHeader.className = "navbar-header";

			//Create site name link
			var siteNameElem = createElem("a", navbarHeader);
			siteNameElem.className = "navbar-brand";
			siteNameElem.innerText = "Comunic";
			siteNameElem.onclick = (function(){
				ComunicWeb.common.page.openPage("home");
			});

		//Now we need to know if user is logged in or not
		
	},
};