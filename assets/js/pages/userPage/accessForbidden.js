/**
 * Display informations about pages we are not allowed to show
 * 
 * Handles request
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.userPage.accessForbidden = {

	/**
	 * Display the page for user with forbidden access
	 * 
	 * @param {Integer} userID The ID of the target user
	 * @param {Object} params Additional parametres
	 * @param {HTMLElement} target The target element on the screen
	 */
	display: function(id, params, target){
		
		//Check if user is signed in or not
		if(!signed_in()){

			//Inform user that he must sign in to continue
			elem = ComunicWeb.common.messages.createCalloutElem(
				"Sign in required",
				"Please sign in to get access to this page.",
				"danger"
			);

			elem.className += " user_page_access_forbidden";

			target.appendChild(elem);

		}

	},

}