/**
 * Interface between the graphical conversation system and the API
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.interface = {

	/**
	 * @var {Object} __conversationsList Cached list of conversations
	 */
	__conversationsList: {},

	/**
	 * Get and return the list of available conversations
	 * 
	 * @param {Function} onceGotList What to do next
	 * @param {Boolean} force Force the list to be loaded even if present in the cache
	 * @return {Boolean} True for a success
	 */
	getList: function(onceGotList, force){

		//First, check if the list is already present in the cache or not
		if(this.__conversationsList && !force){
			//Perform next action now
			onceGotList(this.__conversationsList);
		}

		//Else, prepare an API request
		var apiURI = "conversations/getList";
		var params = {}; //No params required now

		//Perform the API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, function(results){

			//Check for error
			if(results.error){
				//Log error
				ComunicWeb.debug.logMessage("ERROR : couldn't get conversations list !");

				//Perform next action
				onceGotList(results);
			}
			else {
				//Process the list
				var conversationsList = {};
				for(i in results){
					conversationsList["conversation-"+results[i].ID] = results[i];
				}

				//Save the list in the cache
				ComunicWeb.components.conversations.interface.__conversationsList = conversationsList;

				//Perform next action
				onceGotList(conversationsList);
			}

		});

		//Success
		return true;
	},

	/**
	 * Create a conversation
	 * 
	 * @param {Object} infos Informations about the conversation to create
	 * * @info {Array} users A list of the members of the conversation
	 * * @info {Boolean} follow Defines if the current user wants to follow the conversation or not
	 * * @info {Mixed} conversationName The name of the conversation
	 * @param {Function} afterCreate What to do once the conversation is created
	 * @return {Boolean} True for a success
	 */
	createConversation: function(infos, afterCreate){

		//Prepare an API request
		var apiURI = "conversations/create";
		var params = {
			name: infos.conversationName,
			follow : infos.follow,
			users: infos.users,
		};

		//Perform the API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, function(result){

			//Check for errors
			if(result.error){
				//Log error
				ComunicWeb.debug.logMessage("ERROR ! Couldn't create a conversation!");
			}

			//Perform next action
			afterCreate(result);

		});

		//Success
		return true;
	},

	/**
	 * Update conversation settings
	 * 
	 * @param {infos} infos Informations about the conversation to update
	 * @info {Integer} conversationID The ID of the conversation to update
	 * @info {Boolean} following Specify if the user is following the conversation or not
	 * @info {String} name Specify a new name for the conversation
	 * @info {array} members Specify the new list of members for the conversation
	 * @param {function} callback The function callback
	 * @return {Boolean} True for a success
	 */
	updateSettings: function(infos, callback){
		console.log("PLEASE IMPLEMENT ME ON NEXT DEVELOPPEMENT FUNCTION");
	},

	/**
	 * Get informations about a unique conversation
	 * 
	 * @param {Integer} conversationID The ID of the conversation
	 * @param {function} nextStep What to do once the operation is completed
	 * @param {Boolean} forceRefresh Force informations about the conversation to be fetched (ignore cached informations)
	 * @return {Boolan} True for a success
	 */
	getInfosOne: function(conversationID, nextStep, forceRefresh){

		//First, if the conversation is available in the cache
		if(!forceRefresh && this.__conversationsList['conversation-'+conversationID]){

			//Perform next action now without getting fresh informations on the server
			nextStep(this.__conversationsList['conversation-'+conversationID]);

			//Success
			return true;
		}

		//Else, perform an API request
		var apiURI = "conversations/getInfosOne";
		var params = {
			conversationID: conversationID,
		};

		//Perform the API request
		ComunicWeb.common.api.makeAPIrequest(apiURI, params, true, function(result){

			//Check for errors
			if(result.error){
				
				//Log error
				ComunicWeb.debug.logMessage("Couldn't get informations about the conversation number "+conversationID+" !")

				//Perform next action now
				nextStep(result);

				return false;
			}

			//Else it is a success
			//Cache the result
			ComunicWeb.components.conversations.interface.__conversationsList["conversation-"+conversationID] = result;

			//Perform next action
			nextStep(result);

			return true;

		});

		//Success
		return true;
	},

	/**
	 * Empty conversations cache
	 * 
	 * @return {Boolean} True for a success
	 */
	emptyCache: function(){
		//Empty cache
		clearObject(this.__conversationsList);

		//Success
		return true;
	}
}

//Register conversations cache cleaning function
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.interface.emptyCache");