/**
 * Conversation service file
 * 
 * Ensure that the content of the conversations is up to date
 * 
 * @author Pierre HUBER
 */

ComunicWeb.components.conversations.service = {
	
	/**
	 * @var {Integer} intervalID The ID of the current service interval
	 */
	__intervalID: false,
	
	/**
	 * Initializate conversation service
	 * 
	 * @return {Boolean} True for a success
	 */
	init: function(){

		//Check if an interval already exists or not
		if(this.__intervalID)
			clearInterval(this.__intervalID); //Remove old interval

		//Initializate interval
		this.__intervalID = setInterval(function(){
			ComunicWeb.components.conversations.service.call();
		}, 1500);
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
		console.log("Conversation service called !");
	}
}