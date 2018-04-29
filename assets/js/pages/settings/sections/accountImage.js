/**
 * Account image settings section
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.sections.accountImage = {

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
			class: "box box-primary box-account-image-settings"
		});

		//Add box header
		var boxHead = createElem2({
			appendTo: box,
			type: "div",
			class: "box-header",
		});
		var boxTitle = createElem2({
			appendTo: boxHead,
			type: "h3",
			class: "box-title",
			innerHTML: "Account image"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: box,
			type: "div",
			class: "box-body"
		});

		//Add loading callout
		var loadMsg = ComunicWeb.common.messages.createLoadingCallout(boxBody);
		
		//Fetch information about account image on the API
		ComunicWeb.components.settings.interface.getAccountImage(function(result){

			//Remove loading message
			loadMsg.remove();

			//Check for errors
			if(result.error){
				notify("Could not get account image information !", "danger");
				return;
			}

			//Apply account image settings
			
		});
	},
}