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

	/**
	 * Get all conversations ID in the list
	 * 
	 * @return {Array} An array with all opened conversations ID
	 */

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
	}

}

//Register cache cleaner
ComunicWeb.common.cacheManager.registerCacheCleaner("ComunicWeb.components.conversations.cachingOpened.emptyStorage", true);