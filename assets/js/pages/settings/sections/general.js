/**
 * Settings general section
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.sections.general = {

	/**
	 * Open settings section
	 * 
	 * @param {object} args Additionnal arguments
	 * @param {HTMLElement} target The target for the page
	 */
	open: function(args, target){
		
		//Create a box
		var box = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: box,
			type: "div",
			class: "box-body"
		});

		//Display loading message
		var loadingMsg = ComunicWeb.common.messages.createCalloutElem("Loading", "Please wait while this page is loading...", "info");
		boxBody.appendChild(loadingMsg);
	}

};