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

		//Add the different post types
		var postTypesContener = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-types"
		});

		//Text
		var textType = create_radio(postTypesContener, "post_type", "Text");
		$(textType).iCheck("check");

		//Image
		var imageType = create_radio(postTypesContener, "post_type", "Image");

		//Youtube
		var youtubeType = create_radio(postTypesContener, "post_type", "YouTube");

		//Movie
		var movieType = create_radio(postTypesContener, "post_type", "Movie");

		//Link
		var linkType = create_radio(postTypesContener, "post_type", "Link");

		//PDF
		var pdfType = create_radio(postTypesContener, "post_type", "PDF");

		//Countdown timer
		var countdownType = create_radio(postTypesContener, "post_type", "Countdown timer");

		//Survey
		var surveyType = create_radio(postTypesContener, "post_type", "Survey");

		//Add send button
		var sendButton = createElem2({
			appendTo: boxBody,
			type: "button",
			class: "btn btn-primary pull-right",
			innerHTML: "Send"
		});
	}

}