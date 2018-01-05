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
		var textType = this._add_post_type(postTypesContener, "text", "Text");
		textType.checked = true;

		//Image
		var imageType = this._add_post_type(postTypesContener, "image", "<i class='fa fa-picture-o'></i> <span class='hidden-xs'>Image</span>");

		//Youtube
		var youtubeType = this._add_post_type(postTypesContener, "youtube", "<i class='fa fa-youtube-play'></i> <span class='hidden-xs'>YouTube</span>");

		//Movie
		var movieType = this._add_post_type(postTypesContener, "movie", "<i class='fa fa-file-movie-o'></i> <span class='hidden-xs'>Movie</span>");

		//Link
		var linkType = this._add_post_type(postTypesContener, "link", "<i class='fa fa-link'></i> <span class='hidden-xs'>Weblink</span>");

		//PDF
		var pdfType = this._add_post_type(postTypesContener, "pdf", "<i class='fa fa-file-pdf-o'></i> <span class='hidden-xs'>PDF</span>");

		//Countdown timer
		var countdownType = this._add_post_type(postTypesContener, "countdown", "<i class='fa fa-clock-o'></i> <span class='hidden-xs'>Timer</span>");

		//Survey
		var surveyType = this._add_post_type(postTypesContener, "survey", "<i class='fa fa-pie-chart'></i> <span class='hidden-xs'>Survey</span>");

		//Add send button
		var sendButton = createElem2({
			appendTo: boxBody,
			type: "button",
			class: "btn btn-primary pull-right",
			innerHTML: "Send"
		});
	},

	/**
	 * Create and add post type choice
	 * 
	 * @param {HTMLElement} target The target for the post type
	 * @param {string} value The value of the new post type
	 * @param {string} label The label associated with the post type
	 * @return {HTMLElement} The created input
	 */
	_add_post_type: function(target, value, label){

		var postTypeContener = createElem2({
			appendTo: target,
			type: "label",
			class: "post-form-choice"
		});
		
		var input = createElem2({
			appendTo: postTypeContener,
			type: "input",
			elemType: "radio",
			name: "post_type",
			value: value
		});

		createElem2({
			appendTo: postTypeContener,
			type: "span",
			innerHTML: label
		});

		return input;
	}
}