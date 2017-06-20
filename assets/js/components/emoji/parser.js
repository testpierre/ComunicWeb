/**
 * Emoji parser system
 * 
 * Based on the work of Twitter Emoji
 * https://github.com/twitter/twemoji
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.emoji.parser = {

	/**
	 * Define twemoji base
	 */
	__twemojiBase: ComunicWeb.__config.assetsURL + "3rdparty/twemoji/2/",

	/**
	 * Parse emojies
	 * 
	 * @param {Object} infos Informations about the area to parse
	 * @info {HTMLElement} element The element to parser
	 * @return {Boolean} True for a success
	 */
	parse: function(infos){


		//Perform Twitter parsing
		this.twitterEmojiesParsing(infos.element);

		//Success
		return true;
	},

	/**
	 * Perform Twitter emojies parsing
	 * 
	 * @param {Object} target The target of the parsing
	 * @return {Boolean} True for a success
	 */
	twitterEmojiesParsing: function(target){

		//Call Twitter
		twemoji.parse(target, {
        	base: this.__twemojiBase
      	});

		//Success
		return true;
	},

}