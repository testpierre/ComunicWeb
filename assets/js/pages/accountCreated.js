/**
 * Account created page
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.pages.accountCreated = {

	/**
	 * Open the account created page
	 * 
	 * @param {Object} additionnalData Additionnal data passed in the method
	 * @param {element} target Where the page will be applied
	 */
	open: function(additionnalData, target){

		var data = {

			//Background image URL
			background_img_url: ComunicWeb.__config.assetsURL + "img/pages/accountCreated/background.jpg"

		};

		//Apply the template
		ComunicWeb.common.page.getAndShowTemplate(target, data, "pages/accountCreated.tpl", null, true);
	}

}