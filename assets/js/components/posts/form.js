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



		//Add image upload form
		var imgUploadForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-image"
		});

		var imgFileInput = createElem2({
			appendTo: imgUploadForm,
			type: "input",
			elemType: "file"
		});
		//End : image


		//Add Youtube input form
		var youtubeInputForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-youtube",
		});

		var youtubeLinkInput = createFormGroup({
			target: youtubeInputForm,
			label: "Youtube video link",
			placeholder: "https://youtube.com/watch?v=",
			type: "text"
		});
		//End : Youtube


		//Add movie input form
		var movieInputForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-movie",
		});

		//Add choose button
		var movieChooseButton = createElem2({
			appendTo: movieInputForm,
			type: "button",
			class: "btn btn-primary",
			innerHTML: "Choose"
		});

		var movieIDInput = createElem2({
			appendTo: movieInputForm,
			type: "input",
			elemType: "hidden",
			value: 0
		});

		var movieName = createElem2({
			appendTo: movieInputForm,
			type: "span",
			innerHTML: "No movie selected."
		});

		//Make movie choose button lives
		movieChooseButton.onclick = function(){
			ComunicWeb.components.movies.picker.pick(function(movie){
				//Set movie ID and name
				movieIDInput.value = movie.id;
				movieName.innerHTML = movie.name;
			});
		}
		//End : movie

		//Add webpage input form
		var linkChooseForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-weblink"
		});

		var linkInput = createFormGroup({
			target: linkChooseForm,
			label: "Page URL",
			placeholder: "https://...",
			type: "text"
		});
		//End : webpage

		//Add PDF specific informations
		var pdfUploadForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-pdf"
		});

		var pdfFileInput = createElem2({
			appendTo: pdfUploadForm,
			type: "input",
			elemType: "file"
		});
		//End : PDF

		//Add countdown timer specific informations
		var countdownForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-countdown"
		});

		var timeEndInput = createFormGroup({
			target: countdownForm,
			label: "End date",
			placeholder: "dd/mm/yyyy",
			type: "text"
		});

		$(timeEndInput).datepicker({
			autoclose: true,
			format: "dd/mm/yyyy"
		});
		//End : countdown timer
		
		//Add survey specific informations
		var surveyForm = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "post-survey"
		});

		//Survey question
		var surveyQuestionInput = createFormGroup({
			target: surveyForm,
			label: "Question for the survey",
			placeholder: "Question",
			type: "text"
		});

		//Survey answers
		var surveyAnswerInput = createFormGroup({
			target: surveyForm,
			label: "Answers",
			type: "select2",
			multiple: true,
		});

		//Survey message help
		var surveyAnswerHelper = createElem2({
			appendTo: surveyForm,
			type: "p",
			innerHTML: "Type your answer and then press return (enter) key to confirm it."
		})

		//Enable select2
		$(surveyAnswerInput).select2({
			tags: true,
			tokenSeparators: ['\n'],
			dropdownParent: $(surveyQuestionInput)
		});
		//End: survey specific

		//Create post type change handler
		var changesHandler = function(){

			imgUploadForm.style.display = imageType.checked ? "block" : "none";
			youtubeInputForm.style.display = youtubeType.checked ? "block" : "none";
			movieInputForm.style.display = movieType.checked ? "block" : "none";
			linkChooseForm.style.display = linkType.checked ? "block" : "none";
			pdfUploadForm.style.display = pdfType.checked ? "block" : "none";
			countdownForm.style.display = countdownType.checked ? "block" : "none";
			surveyForm.style.display = surveyType.checked ? "block" : "none";
		};

		//Apply changesHandler function to all the data types
		textType.onclick = changesHandler;
		imageType.onclick = changesHandler;
		youtubeType.onclick = changesHandler;
		movieType.onclick = changesHandler;
		linkType.onclick = changesHandler;
		pdfType.onclick = changesHandler;
		countdownType.onclick = changesHandler;
		surveyType.onclick = changesHandler;

		//Right contener
		var rightDiv = createElem2({
			appendTo: boxBody,
			type: "div",
			class: "pull-right"
		})

		//Add visibility level choice
		var visibility_choices_contener = createElem2({
			appendTo: rightDiv,
			type: "div",
			class: "post-visiblity-contener"
		});

		//Private post
		var privateInput = this._add_visiblity_choice(visibility_choices_contener, "private", "Private", "fa-user");

		//Friends-visible post
		var friendsInput = this._add_visiblity_choice(visibility_choices_contener, "friends", "Friends", "fa-users");
		friendsInput.checked = true;

		//Worldwide post
		this._add_visiblity_choice(visibility_choices_contener, "public", "Public", "fa-globe");

		//Add send button
		var sendButton = createElem2({
			appendTo: rightDiv,
			type: "button",
			class: "btn btn-primary",
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
	},

	/**
	 * Create and add visibility level choice
	 * 
	 * @param {HTMLElement} target The target for the visibility level
	 * @param {string} value The value of the visibility level
	 * @param {string} title The title of the visibility level
	 * @param {string} icon The name of the icon associated with the visibility level
	 * @return {HTMLElement} The created input
	 */
	_add_visiblity_choice: function(target, value, title, icon){

		//Visibility label
		var visibility_contener = createElem2({
			appendTo: target,
			type: "label",
		});

		//Create input
		var visibilityInput = createElem2({
			appendTo: visibility_contener,
			type: "input",
			elemType: "radio",
			name: "post_visibility",
			value: value
		});

		//Create icon
		var visibility_label = createElem2({
			appendTo: visibility_contener,
			type: "span",
			innerHTML: "<i class='fa " + icon + "'></i>"
		});

		return visibilityInput;
	},
}