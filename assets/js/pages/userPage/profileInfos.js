/**
 * Profile informations displaying handler
 * 
 * Handlers the rendering of informations such as
 * the name of the user, or account informations
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.userPage.profileInfos = {

	/**
	 * Display profile informations
	 * 
	 * @param {Object} infos Informations about the user
	 * @param {HTMLElement} target The target of the profile informations
	 */
	display: function(infos, target){

		//Create the main box
		this.createMainBox(infos, target);

		//About user box
		this.createAboutUserBox(infos, target);

	},

	/**
	 * Display the main informations about the user
	 * 
	 * @param {Object} infos Informations about the user
	 * @param {HTMLElement} target The target of the box
	 */
	createMainBox: function(infos, target){
		
		//Create box contener
		var boxContener = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary"
		});

		//Setup box body
		var boxBody = createElem2({
			appendTo: boxContener,
			type: "div",
			class: "box-body box-profile"
		});

		//Add user image
		var userImage = createElem2({
			appendTo: boxBody,
			type: "img",
			class: "profile-user-img img-responsive img-circle",
			src: infos.accountImage
		});

		//Add user name
		var userName = createElem2({
			appendTo: boxBody,
			type: "h3",
			class: "profile-username text-center",
			innerHTML: infos.firstName + " " + infos.lastName
		});

		//Add list of informations about user
		var listInfos = createElem2({
			appendTo: boxBody,
			type: "url",
			class: "list-group list-group-unbordered"
		});

		//Add number of friends
		var friendsLi = createElem2({
			appendTo: listInfos,
			type: "li",
			class: "list-group-item"
		});
		createElem2({
			appendTo: friendsLi,
			type: "b",
			innerHTML: "Friends"
		});
		createElem2({
			appendTo: friendsLi,
			type: "a",
			class: "pull-right",
			innerHTML: infos.number_friends
		});

		//Add user status informations (if required)
		if(signed_in()){
			if(userID() != infos.userID){

				// Get user status
				var userStatus = createElem2({
					appendTo: boxBody,
					type: "div",
					innerHTML: "Loading...",
				});
				userStatus.style.textAlign = "center";
				ComunicWeb.pages.userPage.friendshipStatus.display(infos.userID, userStatus);

				//Add separator
				userStatus.style.marginBottom = "5px";

				//Create conversation button
				var conversationButton = createElem2({
					appendTo: boxBody,
					type: "button",
					class: "btn btn-default btn-block",
					innerHTML: "<i class='fa fa-comments'></i> Conversation"
				});

				conversationButton.onclick = function(){
					ComunicWeb.components.conversations.manager.openPrivate(infos.userID);
				}
			}
		}
		
	},

	/**
	 * Create the about the user box
	 * 
	 * @param {Object} infos Informations about the user
	 * @param {HTMLElement} target The target for the box
	 */
	createAboutUserBox: function(infos, target){

		//Create box root
		var boxRoot = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary"
		});

		//Add box header
		var boxHeader = createElem2({
			appendTo: boxRoot,
			type: "div",
			class: "box-header with-border"
		});

		//Add box title
		createElem2({
			appendTo: boxHeader,
			type: "h3",
			class: "box-title",
			innerHTML: "About " + infos.firstName
		});

		//Create box body
		var boxBody = createElem2({
			appendTo: boxRoot,
			type: "div",
			class: "box-body"
		});

		
		//Add user website (if any)
		if(infos.personnalWebsite){
			var userWebsite = createElem2({
				appendTo: boxBody,
				type: "strong"
			});
			createElem2({
				appendTo: userWebsite,
				type: "i",
				class: "fa fa-link margin-r-5"
			});
			createElem2({
				appendTo: userWebsite,
				type: "span",
				innerHTML: "Website"
			});
			var websiteLinkContainer = createElem2({
				appendTo: boxBody,
				type: "p",
				class: "text-muted",
			});
			createElem2({
				appendTo: websiteLinkContainer,
				type: "a",
				href: infos.personnalWebsite,
				innerHTML: infos.personnalWebsite
			}).target="_blank";

			//Add separator
			createElem2({
				appendTo: boxBody,
				type: "hr",
			});
		}

		//Add informations about membership
		var membershipInfos = createElem2({
			appendTo: boxBody,
			type: "strong"
		});
		createElem2({
			appendTo: membershipInfos,
			type: "i",
			class: "fa fa-clock-o margin-r-5"
		});
		createElem2({
			appendTo: membershipInfos,
			type: "span",
			innerHTML: "Membership"
		});
		createElem2({
			appendTo: boxBody,
			type: "p",
			class: "text-muted",
			innerHTML: "Member for " + ComunicWeb.common.date.timeDiffToStr(infos.account_creation_time)
		});
		
	},
};