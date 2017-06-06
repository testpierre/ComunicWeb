/**
 * User selector (using select2)
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.userSelect = {

	/**
	 * Initialize user selector for an element of the page
	 * 
	 * @param {HTMLElement} inputSelect The target select input
	 * @return {Boolean} True for a success
	 */
	init: function(inputSelect){

		//Log action
		ComunicWeb.debug.logMessage("INFO : Initialize user selector");

		$(inputSelect).select2({
			ajax: {
				transport: function(params, success, failure){

					//Check if some data were passed or not
					if(!params.data.term)
						return false;

					//Retrive users list
					ComunicWeb.user.userInfos.search(params.data.term, function(usersInfos){

						if(usersInfos.error)
							return; // Doesn't do anything failure();
						else{
							//Prepare results processing
							returnData = {
								results: []
							}
							
							//Processing results
							for(i in usersInfos){
								returnData.results.push({
									id: usersInfos[i].userID,
									text: usersInfos[i].firstName + " " + usersInfos[i].lastName,
									accountImage: usersInfos[i].accountImage, 
								});
							}
							
							//Return result
							success(returnData);
						}
					});

				},
				delay: 250,
			},

			//Format result displaying
			templateResult: ComunicWeb.components.userSelect.formatUser,
		});

	},

	/**
	 * Format the display of a user
	 * 
	 * @param {Object} infos Informations about the user
	 * @return {String} The formated informations
	 */
	formatUser: function(infos){

		if(!infos.id)
			return infos.id;
		
		return $("<img src='"+infos.accountImage+"' class='user-select-image' /> <span>" + infos.text + "</span>");
	},

	/**
	 * Returns the results of a specified select element
	 * 
	 * @param {HTMLElement} inputSelect The target element
	 * @return {Object} An object with all the select IDs
	 */
	getResults: function(inputSelect){
		
		//Prepare return
		var usersID = {};

		for(i in inputSelect.children){

			//Check it is really a children
			if(inputSelect.children[i].value){
				//Get ID
				var userID = inputSelect.children[i].value;

				usersID['user-'+userID] = userID;
			}
		}

		//Return result IDs
		return usersID;

	}
};