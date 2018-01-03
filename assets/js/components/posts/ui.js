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

			//Set the date of the countdown time
			var date = new Date();
			date.setFullYear(infos.year_end);
			date.setMonth(infos.month_end - 1); //Months starts from 0 (january) to 11 (december)
			date.setDate(infos.day_end);

			//Initialize countdown timer
			ComunicWeb.components.countdown.init(date, target);
		}

		//If the kind of post was not implemented
		else {
			//Log error
			ComunicWeb.debug.logMessage("Not implemented kind of post: " + infos.kind);
			ComunicWeb.common.error.submitError("notice", "Unimplemented kind of post" + infos.kind, 0, {});
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