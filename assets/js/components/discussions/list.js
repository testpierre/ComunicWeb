/**
 * Discussions list window
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.discussions.list = {
	/**
	 * Display discussions list window
	 * 
	 * @param {HTMLElement} nodeBefore The node before the destination
	 * @return {Boolean} True for a success
	 */
	display: function(nodeBefore){

		//Log action
		ComunicWeb.debug.logMessage("INFO : initialize conversation list box.");

		//Create a window
		var listBox = ComunicWeb.components.discussions.windows.create(nodeBefore);

		//Change box title
		listBox.boxTitle.innerHTML = "Discussions";

		//Remove footer
		listBox.boxFooter.remove();

		//Success
		return true;
	},
}