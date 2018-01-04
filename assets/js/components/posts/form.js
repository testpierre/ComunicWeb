/**
 * Posts creation form
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.posts.form = {

	/**
	 * Display post creation form
	 * 
	 * @param {string} kind The kind of page
	 * @param {int} id The ID of the page
	 * @param {HTMLElement} target The target of the form
	 */
	display: function(kind, id, target){

		//Log action
		ComunicWeb.debug.logMessage("Display post creation form");

		//Create form creation box
		var boxRoot = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary post-form"
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: boxRoot,
			type: "div",
			class: "box-body"
		});

		//Create post message textarea
		var inputMessageDiv = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "new-message",
		});

		//Enable bootstrap-wysiwyg
		$(inputMessageDiv).wysiwyg();


		//Add send button
		var sendButton = createElem2({
			appendTo: boxBody,
			type: "button",
			class: "btn btn-primary pull-right",
			innerHTML: "Send"
		});
	}

}