/**
 * Application background system functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.system = {
	/**
	 * Initializate the application
	 * 
	 * @param {String} openPage Specify a page to open
	 * @return {Boolean} True for a success
	 */
	init: function(openPage){

		//Display Comunic logo
		ComunicWeb.debug.displayComunicLogo();

		//Start init
		ComunicWeb.debug.logMessage("Start initialization...");

		//Disable tooltips
		$(function () {
			$(document.body).tooltip("disable");
		});

		//Enable page URLs detection
		window.location.changed = function(e){
			ComunicWeb.common.page.location_updated(e);
		}

		/**
		 * Prepare login
		 */
		//Clean current page content
		ComunicWeb.common.page.emptyPage();
		
		//Show a wait splash screen
		ComunicWeb.common.page.showWaitSplashScreen("Starting up...");

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
			if(!openPage){
				//Get current page URI
				var currentPage = ComunicWeb.common.url.getCurrentWebsiteURL();

				//Open a page
				ComunicWeb.common.page.openPage(currentPage);
			}
			else
				//Open specified page
				ComunicWeb.common.page.openPage(openPage);

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
		}), 25000);
		ComunicWeb.common.cacheManager.registerInterval(autoRefresh);

		//Success
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
	},

	/**
	 * Reset the application
	 * 
	 * @param {Boolean} complete Specify wether the cache cleaning has to be complete or not (for logout)
	 * @param {String} openPage Specify a page to open once the application is restarted
	 * @return {Boolean} True for a success
	 */
	reset: function(complete, openPage){
		//Show a wait splashscreen message
		ComunicWeb.common.page.showWaitSplashScreen("Reset the application in progress...");

		//Clear intervals
		ComunicWeb.common.cacheManager.cleanIntervals();

		//Clean caches
		ComunicWeb.common.cacheManager.cleanCaches(complete);

		//Init the page again
		this.init(openPage);

		//Success
		return true;
	},
};