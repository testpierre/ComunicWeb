/**
 * User page
 * 
 * Display the profile of the user
 * 
 * Main file
 * 
 * @author Pierre HUBERT
 */
ComunicWeb.pages.userPage.main = {

	/**
	 * Open user page
	 * 
	 * @param {Object} params Parametres required to open the page
	 * @param {HTMLElement} target The target for the user page
	 */
	open: function(params, target){
		
		//Check if a subfolder was specified or not
		if(params.subfolder){
			
			var user = params.subfolder;

			//Check if there are also subfolder (which are then removed)
			if(user.indexOf("/")){
				user = user.split("/").shift();
			}

		} else {
			var user = "me";
		}

		//Check if the user specified is an ID
		if(user*1 == user){
			this.openUserPage(user, params, target);
		}
		else {

			//Check if we are opening user page
			if(user === "me"){
				if(signed_in()){
					//Open current user page
					openPage("user/"+userID());
				}
				else {
					//Redirect to login page
					openPage("login");
				}
			}
			else {

				//Search which page should be opened now
				ComunicWeb.user.userInfos.getIDfromPath(user, function(id){
					
					//The user was not found
					if(id < 0){
						ComunicWeb.common.error.pageNotFound(null, target);
					}

					else {
						ComunicWeb.pages.userPage.main.openUserPage(id);
					}

				});


			}

		}
		
	},

	/**
	 * Open precise user page
	 * 
	 * @param {Integer} id The ID of the user to open the page
	 * @param {Object} params Parametres required to open the page
	 * @param {HTMLElement} target Target of the user page
	 */
	openUserPage: function(id, params, target){
		
		//Log action
		log("Open user page : " + id);
		

	},

}