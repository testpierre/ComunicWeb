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
			ComunicWeb.debug.logMessage("Conversation Service : Couldn't locate conversation element, unregistering service !");
			clearInterval(this.__intervalID);
			return false;
		}

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

		//Success
		return true;
	},
}

//Register service cache
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.service.emptyCache");