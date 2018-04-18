/**
 * Settings security section script
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.sections.security = {

	/**
	 * Open security settings section
	 * 
	 * @param {object} args Additionnal arguments
	 * @param {HTMLElement} target The target for the page
	 */
	open: function(args, target){
		
		//Create a box
		var box = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary box-security-settings"
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
			innerHTML: "Security settings"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: box,
			type: "div",
			class: "box-body"
		});


	},

}