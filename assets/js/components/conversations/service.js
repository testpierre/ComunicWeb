/**
 * Conversation service file
 * 
 * Ensure that the content of the conversations is up to date
 * 
 * @author Pierre HUBER
 */

ComunicWeb.components.conversations.service = {
	
	/**
	 * @var {Integer} __intervalID The ID of the current service interval
	 */
	__intervalID: false,

	/**
	 * @var {Object} __serviceCache The service cache
	 */
	__serviceCache: false,

	/**
	 * @var {Boolean} __serviceLock Specify wether the service is already in use or not
	 */
	__serviceLock: false,
	
	/**
	 * Initializate conversation service
	 * 
	 * @return {Boolean} True for a success
	 */
	init: function(){

		//Make sure the cache is empty
		this.emptyCache();

		//Check if an interval already exists or not
		if(this.__intervalID)
			clearInterval(this.__intervalID); //Remove old interval
		
		//Force the service to unlock
		this.__serviceLock = false;
		
		//Initializate interval
		this.__intervalID = setInterval(function(){
			ComunicWeb.components.conversations.service.call();
		}, 2000);
		ComunicWeb.common.cacheManager.registerInterval(this.__intervalID);

		//Success
		return true;
	},

	/**
	 * Call this service
	 * 
	 * @return {Boolean} True for a success
	 */
	call: function(){

		//Check if the conversation element still exists or not
		if(!byId("conversationsElem")){
			ComunicWeb.debug.logMessage("Conversation Service : Couldn't locate conversations element, unregistering service !");
			clearInterval(this.__intervalID);
			return false;
		}

		//Check at least one conversation is opened
		if(!this.__serviceCache){
			ComunicWeb.debug.logMessage("Conversation Service : task skipped : the service cache is empty (equals to false).");
			return false;
		}
		if(JSON.stringify(this.__serviceCache) == "{}"){
			ComunicWeb.debug.logMessage("Conversation Service : task skipped : the service cache is empty. (equals to {})");
			return false;
		}

		//Check if the service is locked or not
		if(this.__serviceLock){
			ComunicWeb.debug.logMessage("Conversation Service : task skipped : the service is locked.");
			return false;
		}

		//Lock service
		this.__serviceLock = true;

		//Perform service task
		this.performTask();
	},

	/**
	 * Perform service task
	 *
	 * @return {Boolean} True for a success
	 */
	performTask: function(){

		console.log(this.__serviceCache);
		//Prepare API request
		var newConversations = [];
		var conversationsToRefresh = {}

		//Process each conversation
		var i;
		for(i in this.__serviceCache){

			//Extract conversation ID
			var processConversation = this.__serviceCache[i].conversationID;

			//Check if it is new conversation
			if(this.__serviceCache[i].last_update === 0)
				newConversations.push(processConversation);
			
			//Else perform a simple update of the conversation
			else {
				conversationsToRefresh["conversation-"+processConversation] = {
					last_update: this.__serviceCache[i].last_update,
				};
			}
		}

		//Perform a request on the interface
		ComunicWeb.components.conversations.interface.refreshConversations(
			newConversations,
			conversationsToRefresh,
			function(result){
				//Call callback function
				ComunicWeb.components.conversations.service.callback(result);
			}
		);
		
		//Success
		return true;
	},

	/**
	 * Service callback function
	 * 
	 * @param {Object} result The result of the request
	 * @return {Boolean} True for a success
	 */
	callback: function(result){

		//Check for errors
		if(result.error){
			ComunicWeb.debug.logMessage("Conversations Service : Couldn't update conversations !");

			//Display a notification
			ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to refresh conversations system !", "danger", 1.5);
		}
		else {
			//We can continue with the result
		}

		//Unlock service
		this.__serviceLock = false;

		//Success
		return true;
	},

	/**
	 * Register a new conversation
	 * 
	 * @param {Integer} conversationID The ID of the conversation to register
	 * @return {Boolean} True for a success
	 */
	registerConversation: function(conversationID){

		//Create conversation object
		if(!this.__serviceCache)
			this.__serviceCache = {}; //Create service cache object
		
		//Register conversation
		this.__serviceCache['conversation-' + conversationID] = {
			conversationID: conversationID,
			last_update: 0,
		};

		//Success
		return true;
	},

	/**
	 * Unregister a conversation
	 * 
	 * @param {Integer} conversationID The ID of the conversation to remove
	 * @return {Boolean} True for a success
	 */
	unregisterConversation: function(conversationID){

		//Log action
		ComunicWeb.debug.logMessage("Unregistering conversation " + conversationID + " from service.");

		if(this.__serviceCache){
			if(this.__serviceCache['conversation-'+conversationID]){
				delete this.__serviceCache['conversation-'+conversationID]; //Remove conversation
			}
		}

		//Success
		return true;
	},

	/**
	 * Empty service cache (unregister all conversations)
	 * 
	 * @return {Boolean} True for a success
	 */
	emptyCache: function(){
		if(this.__serviceCache){
			clearObject(this.__serviceCache);
		}

		//Unlock service
		this.__serviceLock = false;

		//Success
		return true;
	},
}

//Register service cache
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.service.emptyCache");