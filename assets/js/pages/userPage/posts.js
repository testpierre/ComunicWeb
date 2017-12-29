/**
 * Posts function
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.userPage.posts = {

	/**
	 * Display the posts
	 * 
	 * @param {Object} userInfos Informations about the user
	 * @param {Object} params Additionnal parametres passed with the request
	 * @param {HTMLElement} target The target where the posts will be applied
	 */
	display: function(userInfos, params, target){

		//Create posts blocks
		var postsBlock = createElem2({
			appendTo: target,
			type: "div",
			class: "box box-primary"
		});

		//Check whether a precise post has to be opened or not
		//TODO implement
		
	}



};