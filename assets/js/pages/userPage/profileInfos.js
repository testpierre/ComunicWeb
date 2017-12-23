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
	}
};