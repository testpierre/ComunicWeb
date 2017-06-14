/**
 * Opened conversations caching system
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.cachingOpened = {
	
	__varName: "opened-conversations-ids",

	/**
	 * Add a new conversation ID in the list
	 * 
	 * @param {Integer} conversationID The ID of the conversation to add
	 * @return {Boolean} True for a success
	 */
	add: function(conversationID){
		//Get currently openened conversations
		var conversations = this.getAll();

		//Add new conversation (if required)
		if(!conversations.includes(conversationID.toString())){
			conversations.push(conversationID);

			//Convert into string
			var conversationsString = conversations.join(";");

			//Save the new values
			sessionStorage.setItem(this.__varName, conversationsString);
		}

		//Success
		return true;
	},

	/**
	 * Remove a conversation from the list
	 * 
	 * @param {Integer} conversationID The ID of the conversation to remove
	 * @return {Boolean} True for a success
	 */
	remove: function(conversationID){
		
		var conversations = this.getAll();

		if(!conversations.includes(conversationID.toString())){
			return false; //The conversation was not found
		}

		//Remove the entry
		var entryNumber = conversations.indexOf(conversationID.toString());
		conversations.splice(entryNumber, 1);

		//Save the new values
		var conversationsString = conversations.join(";");
		sessionStorage.setItem(this.__varName, conversationsString);
	},

	/**
	 * Get all conversations ID in the list
	 * 
	 * @return {array} An array with all opened conversations ID
	 */
	getAll: function(){

		//Query session storage
		var results = sessionStorage.getItem(this.__varName);
		
		if(results === null)
			return []; //Return an empty array

		//Else parse results
		return results.split(";");
	},

	/**
	 * Empty the storage
	 * 
	 * @return {Boolean} True for a success
	 */
	emptyStorage: function(){
		
		//Remove variables for session storage
		sessionStorage.removeItem(this.__varName);
		
		//Success
		return true;
	},

}

//Register cache cleaner
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.cachingOpened.emptyStorage", true);