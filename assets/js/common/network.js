/**
 * Network functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.common.network = {

	/**
	 * @var {object} Cache contener
	 */
	cache: {},

	/**
	 * Make a GET request
	 * 
	 * @param {String} url Destination URL
	 * @param {Boolean} cacheResponse Specify if data can be cached or not (optimize network)
	 * @param {function} GETnextAction What to do next
	 * @return {Boolean} False if it fails
	 */
	getRequest: function(url, cacheResponse, GETnextAction){
		//First, check if it is required to cache the request
		if(cacheResponse){
			//Prepare cache entry name
			var cacheEntryName = encodeURIComponent(url);

			//Check if entry exists
			if(this.cache[cacheEntryName]){
				//Call next action with the url contained into the cache
				GETnextAction(this.cache[cacheEntryName]);

				//Quit function
				return true;
			}
		}

		//No cache entry where found or cache is disabled, continue
		var xhrRequest = new XMLHttpRequest();
		xhrRequest.open("GET", url);

		xhrRequest.onreadystatechange = function(){
			if(xhrRequest.readyState == 4){
				//We check if it is an error
				if(xhrRequest.status != 200){
					//It's an error, we will quit soon, but debug message before
					ComunicWeb.debug.logMessage("GET request failed on " + url + " Got response code " + xhrRequest.status);
					return false;
				}
				
				//Check if it is required to cache result
				if(cacheResponse){
					ComunicWeb.common.network.cache[cacheEntryName] = xhrRequest.responseText;
				}

				ComunicWeb.debug.logMessage("GET request: " + url + " Success (" + xhrRequest.status + ")");

				//Call next action
				GETnextAction(xhrRequest.responseText);
			}
		}

		//Perform request
		xhrRequest.send(null);
	},

	/**
	 * Empty network cache
	 * 
	 * @return {Boolean} True for a success
	 */
	emptyCache: function(){
		this.cache = {};

		//Success
		return true;
	},

	/**
	 * Update the status of the network
	 * 
	 * @param {Boolean} success True for a successful request, false else
	 * @return {Boolean} True for a success
	 */
	setStatus: function(success){

		//If the request is the success, hide error message
		if(success){
			//Check if an error message was present on the screen
			if(byId("networkErrorMessage")){
				//Hide it
				byId("networkErrorMessage").style.display = "none";
			}
		}
		
		//If we encountered a network error, display an error message
		if(!success){
			//Log state
			ComunicWeb.debug.logMessage("NETWORK ERROR : It's seems a network request has just echoed... Please check the network !");

			//Check if error message exists or not
			if(!byId("networkErrorMessage")){
				//Create error message contener
				var networkErrorMessage = createElem("div", document.body);
				networkErrorMessage.id = "networkErrorMessage";

				//Create a callout element within it
				var errorName = "<i class='fa fa-warning'></i> "+" Network error";
				var errorMessage = "It seems that there is a network error, and Comunic can't access to the Internet anymore... Please check your internet connexion...";
				var errorCallout = ComunicWeb.common.messages.createCalloutElem(errorName, errorMessage, "danger");
				networkErrorMessage.appendChild(errorCallout)
			}

			//Make sure the error message is visible on the screen
			byId("networkErrorMessage").style.display = "block";
		}
	},
};