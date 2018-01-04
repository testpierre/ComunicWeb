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

			//Create video element
			var video = createElem2({
				appendTo: postRoot,
				type: "video",
				class: "video-js vjs-default-skin post-video"
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
	}

}