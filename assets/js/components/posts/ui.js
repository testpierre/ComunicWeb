/**
 * Posts UI
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.posts.ui = {

	/**
	 * Show a single post
	 * 
	 * @param {Object} infos Informations about the post
	 * @param {HTMLElement} target The target for the post
	 */
	display_post: function(infos, target){

		//Check if it is required to create a post root element or not
		if(target.className.includes("post"))
			postRoot = target;

		else
			//Create post root element
			var postRoot = createElem2({
				appendTo: target,
				type: "div",
				class: "post"
			});

		//Display user block
		var userBlock = createElem2({
			appendTo: postRoot,
			type: "div",
			class: "user-block"
		});

		//Display user account image
		var userAccountImage = createElem2({
			appendTo: userBlock,
			type: "img",
			class: "img-circle img-bordered-sm",
			src: ComunicWeb.__config.assetsURL + "img/defaultAvatar.png"
		});

		//Add user name
		var userNameBlock = createElem2({
			appendTo: userBlock,
			type: "span",
			class: "username",
		});

		var userName = createElem2({
			appendTo: userNameBlock,
			type: "a",
			innerHTML: "Loading"
		});

		//Add post description
		var postDescription = createElem2({
			appendTo: userBlock,
			type: "span",
			class: "description"
		});

		//Show the age of the post
		postDescription.innerHTML = ComunicWeb.common.date.timeDiffToStr(infos.post_time) + " ago";

		//Load user informations
		ComunicWeb.user.userInfos.getUserInfos(infos.userID, function(result){
			if(result.firstName){
				userAccountImage.src = result.accountImage;
				userName.innerHTML = result.firstName + " " + result.lastName;

				userName.onclick = function(){
					openUserPage(userIDorPath(result));
				}
			}
		});

		//Create top right area
		var topRightArea = createElem2({
			insertAsFirstChild: userBlock,
			type: "div",
			class: "pull-right top-right-buttons",
		});

		//Load informations about visibility
		var visibilityTarget = createElem2({
			appendTo: topRightArea,
			type: "div",
			class: "visibility"
		});


		//Get informations about the current visibility level
		var visibilityInfos = ComunicWeb.components.posts.visibilityLevels[infos.visibility_level];

		//Check user level access
		if(infos.user_access != "full"){

			//The user can't change the visibility level of the post
			//Display visibility level as a simple icon
			createElem2({
				appendTo: visibilityTarget,
				type: "i",
				class: "read-only fa "+visibilityInfos.icon
			});

		}
		else {

			//The user can change the visibility level of the post
			//Create button gropu
			var visibilityButtonGroup = createElem2({
				appendTo: visibilityTarget,
				type: "div",
				class: "btn-group"
			});

			//Visibility choose button
			var visibilityChooseButton = createElem2({
				appendTo: visibilityButtonGroup,
				type: "button",
				class: "btn btn-default dropdown-toggle",
				elemType: "button",
			});
			visibilityChooseButton.setAttribute("data-toggle", "dropdown");

			//Set the current value of the button
			visibilityChooseButton.innerHTML = "<i class='fa " + visibilityInfos.icon + "'></i>";

			//Add dropdown menu
			var visibilityDropdown = createElem2({
				appendTo: visibilityButtonGroup,
				type: "ul",
				class: "dropdown-menu"
			});

			//Process all visibility levels
			var privateChoice = this._add_visibility_menu_item(visibilityDropdown, "private");
			var friendsChoice = this._add_visibility_menu_item(visibilityDropdown, "friends");
			var publicChoice = this._add_visibility_menu_item(visibilityDropdown, "public");

			var onVisibilityLevelChoice = function(){

				//Get the new visibility level
				var new_level = this.getAttribute("data-level");

				//Lock button
				visibilityChooseButton.disabled = true;

				//Make a request on the server to update the level
				ComunicWeb.components.posts.interface.set_visibility_level(infos.ID, new_level, function(response){

					//Unlock button
					visibilityChooseButton.disabled = false;

					//Check for errors
					if(response.error){
						ComunicWeb.common.notificationSystem.showNotification("Couldn't change post visibility level !", "danger");
						return;
					}

					//Change the level on the button
					visibilityChooseButton.innerHTML = "<i class='fa " + ComunicWeb.components.posts.visibilityLevels[new_level].icon + "'></i>";

				});
			}

			//Set the items lives
			privateChoice.onclick = onVisibilityLevelChoice;
			friendsChoice.onclick = onVisibilityLevelChoice;
			publicChoice.onclick = onVisibilityLevelChoice;
			
		}

		//Add a button to edit the post if the user is allowed
		if(infos.user_access == "full"){

			var editButtonDiv = createElem2({
				appendTo: topRightArea,
				type: "div",
				class: "edit-post-div"
			});

			var editButtonLink = createElem2({
				appendTo: editButtonDiv,
				type: "a",
				innerHTML: "<i class='fa fa-pencil'></i>"
			});


			//Make buttons lives
			editButtonLink.onclick = function(){

				//Open post editor
				ComunicWeb.components.posts.edit.open(infos, postRoot);

			};
		}

		//Add a button to delete the post if the user is allowed
		if(infos.user_access == "full" || infos.user_access == "intermediate"){

			var deleteButtonDiv = createElem2({
				appendTo: topRightArea,
				type: "div",
				class: "del-post-div"
			});

			var deleteButtonLink = createElem2({
				appendTo: deleteButtonDiv,
				type: "a",
				innerHTML: "<i class='fa fa-trash'></i>"
			});

			//Make delete button lives
			deleteButtonLink.onclick = function(){
				
				//Create a confirmation dialog
				ComunicWeb.common.messages.confirm("Are you sure do you want to delete this post? The operation can not be reverted !", function(accept){
					
					//Check if the user cancelled the operation
					if(!accept)
						return;
					
					postRoot.style.visibility = "hidden";

					//Delete the post
					ComunicWeb.components.posts.interface.delete(infos.ID, function(response){

						//Check for error
						if(response.error){

							//Display an error
							ComunicWeb.common.notificationSystem.showNotification("An error occured while trying to delete post !", "danger");
							
							//Make the post visible
							postRoot.style.visibility = "visible";

							return;
						}
						
						//Delete the post
						emptyElem(postRoot);
						postRoot.remove();

					});
				});

			}
		}

		//Add post attachement (if any)
		if(infos.kind == "text"){
			//Do nothing
		}

		//In case of image
		else if(infos.kind == "image"){

			//Image link
			var imageLink = createElem2({
				appendTo: postRoot,
				type:"a",
				href: infos.file_path_url,
			});

			//Image element
			createElem2({
				appendTo: imageLink,
				type: "img",
				src: infos.file_path_url,
				class: "post-image"
			});

			//Enable lightbox
			imageLink.onclick = function(){
				$(this).ekkoLightbox({
					alwaysShowClose: true,
				});
				return false;
			}
		}

		//In case of video
		else if(infos.kind == "movie"){

			var videoContener = createElem2({
				appendTo: postRoot,
				type: "div",
				class: "post-video"
			});

			//Create video element
			var video = createElem2({
				appendTo: videoContener,
				type: "video",
				class: "video-js vjs-default-skin"
			});
			video.setAttribute("controls", "");

			//Add source
			var video_src = createElem2({
				appendTo: video,
				type: "source",
				src: infos.video_infos.url
			});
			video_src.type = infos.video_infos.file_type;

			//Enable videoJS
			//videojs(video);

		}

		//In case of YouTube video
		else if(infos.kind == "youtube"){

			//Create iframe
			var youtube_iframe = createElem2({
				appendTo: postRoot,
				type: "iframe",
				class: "post-youtube",
				src: "https://www.youtube-nocookie.com/embed/"+infos.file_path+"?rel=0"
			});
			youtube_iframe.setAttribute("frameborder", 0);
			youtube_iframe.setAttribute("gesture", "media");
			youtube_iframe.setAttribute("allow", "encrypted-media");
			youtube_iframe.setAttribute("allowfullscreen", "");

		}

		//In case of PDF
		else if(infos.kind == "pdf"){

			//Create PDF button
			var buttonContainer = createElem2({
				appendTo: postRoot,
				type: "div",
				class: "post-pdf",
			});

			var button = createElem2({
				appendTo: buttonContainer,
				type: "a",
				class: "btn btn-app",
				href: infos.file_path_url,
			});
			button.target = "_blank";

			createElem2({
				appendTo: button,
				type: "i",
				class: "fa fa-file-pdf-o"
			});

			createElem2({
				appendTo: button,
				type: "span",
				innerHTML: "PDF"
			});

		}

		//In case of weblink
		else if(infos.kind == "weblink"){

			var linkContainer = createElem2({
				appendTo: postRoot,
				type: "div",
				class: "attachment-block clearfix"
			});

			//Link image
			var link_img = createElem2({
				appendTo: linkContainer,
				type: "img",
				src: (infos.link_image != "default" ? infos.link_image : ComunicWeb.__config.assetsURL + "img/world.png"),
				class: "attachment-img",
			});

			//Link heading
			var link_heading = createElem2({
				appendTo: linkContainer,
				type: "h4",
				class: "attachment-heading",
				innerHTML: (infos.link_title != "default" ? infos.link_title : "Web page")
			});


			//Add attachement text
			var link_attachment_text = createElem2({
				appendTo: linkContainer,
				type: "div",
				class: "attachment_text",
			});

			var link_a_url = createElem2({
				appendTo: link_attachment_text,
				type: "a",
				href: infos.link_url,
				innerHTML: infos.link_url
			});
			link_a_url.target = "_blank";

			//Add description (if any)
			if(infos.link_description != "default"){
				var link_description = createElem2({
					appendTo: link_attachment_text,
					type: "p",
					innerHTML: infos.link_description
				});
			}


		}

		//In case of countdown timer
		else if (infos.kind == "countdown"){

			//Create countdown target
			var target = createElem2({
				appendTo: postRoot,
				type: "div",
				class: "post-countdown"
			});

			//Initialize countdown timer
			ComunicWeb.components.countdown.init(infos.time_end, target);
		}

		//In case of survey
		else if(infos.kind == "survey"){
			
			//Add survey question
			var surveyQuestion = createElem2({
				appendTo: postRoot,
				type: "h4",
				innerHTML: infos.data_survey.infos.question,
				class: "post-survey-question"
			});

			//Create row
			var row = createElem2({
				appendTo: postRoot,
				type: "div",
				class: "row post-survey-chart-contener"
			});

			//Create canvas column
			var leftColumn = createElem2({
				appendTo: row,
				type: "div",
				class: "col-md-8"
			});

			//Chart contener
			var chartContener = createElem2({
				appendTo: leftColumn,
				type: "div",
				class: "chart-responsive"
			});

			//Create canvas
			var canvas = createElem2({
				appendTo: chartContener,
				type: "canvas",
			});
			canvas.style.height = "150px";

			//Create data column
			var rightColumn = createElem2({
				appendTo: row,
				type: "div",
				class: "col-md-4"
			});

			//Initialize legend
			var charLegend = createElem2({
				appendTo: rightColumn,
				type: "ul",
				class: "chart-legend clearfix"
			});

			//Define chart options
			var pieOptions = {
				//Boolean - Whether we should show a stroke on each segment
				segmentShowStroke: true,
				//String - The colour of each segment stroke
				segmentStrokeColor: "#fff",
				//Number - The width of each segment stroke
				segmentStrokeWidth: 1,
				//Number - The percentage of the chart that we cut out of the middle
				percentageInnerCutout: 50, // This is 0 for Pie charts
				//Number - Amount of animation steps
				animationSteps: 100,
				//String - Animation easing effect
				animationEasing: "easeOutBounce",
				//Boolean - Whether we animate the rotation of the Doughnut
				animateRotate: true,
				//Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale: false,
				//Boolean - whether to make the chart responsive to window resizing
				responsive: true,
				// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
				maintainAspectRatio: false,
				//String - A legend template
				legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
				//String - A tooltip template
				tooltipTemplate: "<%=value %> <%=label%>"
			  };

			//Generate survey data
			var colors = [
				{fg: "#f56954", bg: "#f56954"},
				{fg: "#00a65a", bg: "#00a65a"},
				{fg: "#f39c12", bg: "#f39c12"},
				{fg: "#00c0ef", bg: "#00c0ef"},
				{fg: "#3c8dbc", bg: "#3c8dbc"},
				{fg: "#d2d6de", bg: "#d2d6de"}
			];

			var surveyData = [];
			var survey_choices = infos.data_survey.choices;
			var color_id = 0;
			var i;
			for (i in survey_choices){
				
				//Get the color
				if(!colors[color_id])
					color_id = 0;
				var curr_color = colors[color_id];

				//Generate choice informations
				var choiceInfos = {
					value: survey_choices[i].responses,
					label: survey_choices[i].name,
					color: curr_color.fg,
					highlight: curr_color.bg,
				}

				//Add the choice to the list
				surveyData.push(choiceInfos);

				//Increment color
				color_id++;

			}

			//Initialie chart
			var pieChart = new Chart(canvas.getContext("2d"));
			pieChart.Doughnut(surveyData, pieOptions);

			//Fill legend
			var i;
			for(i in surveyData){
				
				//Legend list elem
				var lengendLi = createElem2({
					appendTo: charLegend,
					type: "li"
				});

				createElem2({
					appendTo: lengendLi,
					type: "i",
					class: "fa fa-circle-o"
				}).style.color = surveyData[i].color;

				createElem2({
					appendTo: lengendLi,
					type: "span",
					innerHTML: " "+surveyData[i].label
				});

			}

		}

		//If the kind of post was not implemented
		else {
			//Log error
			ComunicWeb.debug.logMessage("Not implemented kind of post: " + infos.kind);
			ComunicWeb.common.error.submitError("notice", "Unimplemented kind of post: " + infos.kind, 0, {});
		}


		//Add post content
		var postContent = createElem2({
			appendTo: postRoot,
			type: "div",
			class: "post_content",
			innerHTML: infos.content
		});



		//Add bottom elements container
		var bottomArea = createElem2({
			appendTo: postRoot,
			type: "ul",
			class: "list-inline post-buttons"
		});

		//Load likes
		var likesTarget = createElem2({
			appendTo: bottomArea,
			type: "li",
		});

		var userLiking = null;
		if(signed_in()){
			userLiking = infos.userlike;
		}

		//Call component
		ComunicWeb.components.like.button.display(
			"post",
			infos.ID,
			infos.likes,
			userLiking,
			likesTarget
		);
	},

	/**
	 * Add a visibility level choice to a dropodown menu
	 * 
	 * @param {HTMLElement} target The target menu
	 * @param {Object} name The name of the visibility level
	 * @return {HTMLElement} The created element container
	 */
	_add_visibility_menu_item: function(target, name){

		//Create container
		var itemContainer = createElem2({
			appendTo: target,
			type: "li",
		});

		//Create link container
		var itemLink = createElem2({
			appendTo: itemContainer,
			type: "a"
		});
		itemLink.setAttribute("data-level", name);

		//Add visibility icon
		createElem2({
			appendTo: itemLink,
			type: "i",
			class: "fa " + ComunicWeb.components.posts.visibilityLevels[name].icon
		});

		//Add visibility label
		createElem2({
			appendTo: itemLink,
			type: "span",
			innerHTML: ComunicWeb.components.posts.visibilityLevels[name].name
		});

		return itemLink;

	},

}