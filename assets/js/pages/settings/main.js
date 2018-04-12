/**
 * User settings main script file
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.main = {

	/**
	 * Open settings page
	 * 
	 * @param {object} args Optionnal arguments
	 * @param {HTMLElement} target The target for the page
	 */
	open: function(args, target){

		//Settings page is organized like an array with two columns
		//Left column : settings sections menu
		//Rigth column : current settings section

		//Create a row
		var row = createElem2({
			appendTo: target,
			type: "div",
			class: "row settings-page-container"
		});

		//Left area
		var leftArea = createElem2({
			appendTo: row,
			type: "div",
			class: "col-md-3"
		});

		//Display left navigation pane
		ComunicWeb.pages.settings.navigationPane.display(leftArea);
	},

}