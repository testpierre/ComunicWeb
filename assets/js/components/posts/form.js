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
			innerHTML: ""
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

		//Make send button lives
		sendButton.onclick = function(){

			//Generate request
			var datas = new FormData();

			//Get the message content
			var message_content = inputMessageDiv.innerHTML;
			datas.append("content", message_content);
			
			//Check if the message includes an image
			if(message_content.includes("data:image/")){
				ComunicWeb.common.notificationSystem.showNotification("Please do not drag images directly in the message !", "danger");
				return;
			}

			//Check the text value
			if(textType.checked){
				
				//Check message content
				if(!ComunicWeb.components.posts.form._check_message(message_content)){
					ComunicWeb.common.notificationSystem.showNotification("The specified message is invalid !", "danger");
					return;
				}

				//Specify it is a text
				datas.append("kind", "text");
			}
			
			//Check for image
			else if(imageType.checked){

				//Check for image
				if(imgFileInput.files.length == 0){
					ComunicWeb.common.notificationSystem.showNotification("Please choose an image !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "image");
				datas.append("image", imgFileInput.files[0], imgFileInput.files[0].name);
			}

			//Check for YouTube video
			else if(youtubeType.checked){

				//Get the video ID
				var videoID = ComunicWeb.components.posts.form._get_youtube_video_id(youtubeLinkInput.value);

				//Check its validity
				if(!videoID){
					ComunicWeb.common.notificationSystem.showNotification("The specified Youtube link seems to be invalid !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "youtube");
				datas.append("youtube_id", videoID);
			}

			//Check for movie
			else if(movieType.checked){

				var movieID = movieIDInput.value;

				if(movieID == 0){
					ComunicWeb.common.notificationSystem.showNotification("Please choose a movie !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "movie");
				datas.append("movieID", movieID);

			}

			//Check for PDF
			else if(pdfType.checked){

				//Check for image
				if(pdfFileInput.files.length == 0){
					ComunicWeb.common.notificationSystem.showNotification("Please pick a PDF !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "pdf");
				datas.append("image", pdfFileInput.files[0], pdfFileInput.files[0].name);

			}

			//Check for weblink
			else if(linkType.checked){

				//Check the given url
				if(!check_url(linkInput.value)){
					ComunicWeb.common.notificationSystem.showNotification("Please check the given URL !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "weblink");
				datas.append("url", linkInput.value);
			}

			//Check for timer
			else if(countdownType.checked){

				//Check the given time
				if(timeEndInput.value.length < 10){
					ComunicWeb.common.notificationSystem.showNotification("Please specify a date for the countdown timer !", "danger");
					return;
				}

				//Append values
				datas.append("kind", "countdown");
				datas.append("date-end", timeEndInput.value);
			}

			//Check for survey
			else if(surveyType.checked){

				//Check the given question
				if(surveyQuestionInput.value.length < 5){
					ComunicWeb.common.notificationSystem.showNotification("Please specify a question for the survey !", "danger");
					return;
				}

				//Get the answers
				if(surveyAnswerInput.children.length < 2){
					ComunicWeb.common.notificationSystem.showNotification("Please specify at least two options for the survey !", "danger");
					return;
				}

				//Process the list of answers
				var answerData = $(surveyAnswerInput).select2("data");
				var answers = [];
				for(i = 0; i < answerData.length; i++){
					answers.push(removeHtmlTags(answerData[i].text));
				}

				//Append values
				datas.append("kind", "survey");
				datas.append("question", surveyQuestionInput.value);
				datas.append("answers", answers.join("<>"));

			}

			//The post type is not supported
			else {
				ComunicWeb.common.notificationSystem.showNotification("Please check you have chosen a post type !", "danger");
				return;
			}

			//Get the visibility level
			var visibilityLevel = visibility_choices_contener.querySelector("input:checked").value;
			datas.append("visibility", visibilityLevel);

			//Try to perform the request
			
		}
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

	/**
	 * Check a given message content
	 * 
	 * @param {string} message The message to check
	 * @return {boolean} TRUE if the message is valid / false else
	 */
	_check_message(message){

		//Remove break line tags
		message = message.replace("<br>", "")
			.replace("<br/>", "")
			.replace("<br />", "")
			.replace("<p>", "")
			.replace("</p>", "")
			.replace("<b>", "")
			.replace("</b>", "");

		//Check if the message is too short
		if(message.length < 5)
			return false;
		
		//The message is valid
		return true;

	},

	/**
	 * Try to get a youtube video ID from a given URL
	 * 
	 * @param {string} url The string to get
	 * @return {boolean|string} False if the URL is invalid / The video
	 * ID else
	 */
	_get_youtube_video_id: function(url){

		//Check if the youtube domain is included in the URL
		if(!url.includes("youtube.com/"))
			return false; //The link is considered as invalid
		
		//Check for ID specification
		if(!url.includes("v="))
			return false;
		
		//Extract video ID
		var videoID = url.split("v=")[1];

		//Check if there are other parametres after the video ID
		if(videoID.includes("&"))
			videoID = videoID.split("&")[0];
		
		//Check if the videoID is valid
		if(videoID.includes("/"))
			return false;

		//Return video ID
		return videoID;
	},
}