/**
 * Mail caching controller
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.mailCaching = {

	/**
	 * @var Mail caching variable name
	 */
	__mailCachingVarName: "lastLoginMail",

	/**
	 * Get current cached value
	 * 
	 * @return {String} The current stored mail / Empty string if it doesn't exist
	 */
	get: function(){
		//Try to get mail value
		var mail = localStorage.getItem(this.__mailCachingVarName);

		//If not any mail was defined
		if(!mail)
			return ""; //Empty value
		
		return mail;
	},

	/**
	 * Set a new mail value
	 * 
	 * @param {String} mail The mail address
	 * @return {Boolean} True for a success
	 */
	set: function(mail){
		
		//Check mail first
		if(!checkMail(mail))
			return false;

		//Try to save mail
		localStorage.setItem(this.__mailCachingVarName, mail);
		return true;
	},

}