/**
 * Settings navigation pane
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.settings.navigationPane = {

	/**
	 * Display the settings navigation pane
	 * 
	 * @param {HTMLElement} target The target for the navigation pane
	 */
	display: function(target){

		//Create a box
		var navigationBox = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-solid"
		});

		//Set box header
		var boxHeader = createElem2({
			appendTo: navigationBox, 
			type: "div",
			class: "box-header with-border",
			
		});

		//Set box title
		createElem2({
			appendTo: boxHeader,
			type: "h3",
			class: "box-title",
			innerHTML: "Sections"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: navigationBox,
			type: "div",
			class: "box-body no-padding"
		});

		//Display the list of sections
		var elemList = createElem2({
			appendTo: boxBody,
			type: "ul",
			class: "nav nav-pills nav-stacked"
		});

		//General account information
		var sectionGeneral = createElem2({
			appendTo: elemList,
			type: "li",
		});
		var sectionGeneralLink = createElem2({
			appendTo: sectionGeneral,
			type: "a",
			innerHTML: "<i class='fa fa-user'></i> General"
		});
	}

}