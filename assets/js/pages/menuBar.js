/**
 * Menu bar object
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.menuBar = {
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
		var menuBar = createElem("div");
		byId("wrapper").insertBefore(menuBar, byId("wrapper").childNodes[0]);
		menuBar.id = "menuBar";

		//Initializate the menubar
		return this.init(menuBar);
	},

	/**
	 * Initializate a menubar
	 * 
	 * @param {HTMLElement} menuElem The menu container
	 * @return {Boolan} True for a success
	 */
	init: function(menuElem){
		//Log action
		ComunicWeb.debug.logMessage("Info: Initializate a menuBar on element : '"+menuElem.id+"'");

		
	},
};