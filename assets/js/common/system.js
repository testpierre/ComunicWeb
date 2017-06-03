/**
 * Application background system functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.system = {
	/**
	 * Initializate the application
	 * 
	 * @return {Boolean} True for a success
	 */
	init: function(){
		//Start init
		ComunicWeb.debug.logMessage("Start initialization...");

		/**
		 * Prepare login
		 */
		//Clean current page content
		ComunicWeb.common.page.emptyPage();
		
		//Show a wait splash screen
		ComunicWeb.common.page.showWaitSplashScreen();

		/**
		 * Language initator
		 */
		ComunicWeb.common.langs.initLanguages();

		/**
		 * What to do after login refresh
		 */
		var afterLoginRefresh = function(){
			
			/**
			 * Open a page
			 */
			//Get current page URI
			var currentPage = ComunicWeb.common.url.getCurrentWebsiteURL();

			//Open a page
			ComunicWeb.common.page.openPage(currentPage);

			//End of init
			ComunicWeb.debug.logMessage("Application is ready !");
		}

		/**
		 * Get login state
		 */
		ComunicWeb.user.userLogin.refreshLoginState(afterLoginRefresh);

		/**
		 * Automaticaly refresh login state
		 */
		var autoRefresh = setInterval((function(){
			ComunicWeb.user.userLogin.refreshLoginState();
		}), 15000);

		//Sucess
		return true;
	},

	/**
	 * Restart the application
	 * 
	 * @return {Boolean} True for a success
	 */
	restart: function(){
		//Show a wait splashscreen message
		ComunicWeb.common.page.showWaitSplashScreen("Restarting...");

		//Reload the page
		location.href = document.location;
	}
};