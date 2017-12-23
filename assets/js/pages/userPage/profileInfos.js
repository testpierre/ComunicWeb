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

		//Add user account creation time
		var accountCreationLi = createElem2({
			appendTo: listInfos,
			type: "li",
			class: "list-group-item"
		});
		createElem2({
			appendTo: accountCreationLi,
			type: "b",
			innerHTML: "Member since"
		});
		createElem2({
			appendTo: accountCreationLi,
			type: "a",
			class: "pull-right",
			innerHTML: ComunicWeb.common.date.timeDiffToStr(infos.account_creation_time),
		});

		//Add user status informations (if required)
		if(signed_in()){
			if(userID() != infos.userID){
				var userStatus = createElem2({
					appendTo: boxBody,
					type: "div",
					innerHTML: "Loading...",
				});
				userStatus.style.textAlign = "center";
				ComunicWeb.pages.userPage.friendshipStatus.display(infos.userID, userStatus);
			}
		}
		
	}
};