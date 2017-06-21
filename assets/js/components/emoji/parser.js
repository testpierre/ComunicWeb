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

		//Peform string parsing
		infos.element.innerHTML = this.shorcutToHTMLcode(infos.element.innerHTML);

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

	/**
	 * Perform shorcut emoji to HTML code parsing
	 * 
	 * @param {String} string The input string
	 * @return {String} The output string
	 */
	shorcutToHTMLcode: function(string){

		//Process all emojie list
		var i;
		for(i in ComunicWeb.components.emoji.list.translation){

			//Change smileys as many time as required
			while(string.includes(i))
				string = string.replace(i, ComunicWeb.components.emoji.list.translation[i]);

		}

		//Return result
		return string;
	}


}