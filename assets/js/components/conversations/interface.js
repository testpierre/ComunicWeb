/**
 * Interface between the graphical conversation system and the API
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.interface = {

	/**
	 * @var {Object} __conversationsList Cached list of conversations
	 */
	__conversationsList: false,

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
	 * * @info {Boolan} follow Defines if the current user wants to follow the conversation or not
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
}