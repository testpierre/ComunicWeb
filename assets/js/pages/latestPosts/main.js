/**
 * Latest posts page main script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.latestPosts.main = {

	/**
	 * Open latest posts page
	 * 
	 * @param {Object} params Parametres required to open the page
	 * @param {HTMLElement} target The target for the user page
	 */
	open: function(params, target){
		
		//Perform a request on the server to get the list of latest posts
		ComunicWeb.components.posts.interface.get_latest(function(response){

			//Check for errors - display a modal
			if(response.error){
				
				return;
			}

			//Display the list of posts

		});

	},
}