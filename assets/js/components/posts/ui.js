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
			videojs(video);

		}

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