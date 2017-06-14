/**
 * Conversation chat window functions
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.conversations.chatWindows = {
	/**
	 * Create a new chat window
	 * 
	 * @param {Object} infos Informations required for the new chat window
	 * @info {HTMLElement} target The target of the new chat window
	 * @info {Integer} conversationID The ID of the target conversation
	 * @return {Object} Informations about the new chat window
	 */
	create: function(infos){

		//Log action
		ComunicWeb.debug.logMessage("Create a new chat window");

		//First, create the generic conversation window
		var infosBox = ComunicWeb.components.conversations.windows.create(infos.target.children[0]);

		infosBox.conversationID = infos.conversationID;

		//Adapt close button behaviour
		infosBox.closeFunction = function(){
			
			//Remove root element
			infosBox.rootElem.remove();

			//Remove the conversation from opened ones
			ComunicWeb.components.conversations.cachingOpened.remove(infosBox.conversationID);
		}

		infosBox.closeButton.onclick = infosBox.closeFunction;

		//Return informations about the chat window
		return infosBox;

	},
}