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
	 * EmojiConvertor instance
	 */
	__emojiConvertor: null,

	/**
	 * Parse emojies
	 * 
	 * @param {Object} infos Informations about the area to parse
	 * @info {HTMLElement} element The element to parse
	 * @return {Boolean} True for a success
	 */
	parse: function(infos){

		//Peform string parsing
		infos.element.innerHTML = this.shorcutToHTMLcode(infos.element.innerHTML);

		//Perform colon conversion
		infos.element.innerHTML = this.colonConversion(infos.element.innerHTML);

		//Perform Twitter parsing
		this.twitterEmojiesParsing(infos.element);

		//Success
		return true;
	},

	/**
	 * Perform the conversion from colon code to Emoji code
	 * 
	 * @param {string} string The string to convert
	 * @return {string} Converted string
	 */
	colonConversion: function(string){

		//Check if the emoji convertor has to be created
		if(this.__emojiConvertor == null){
			this.__emojiConvertor = new EmojiConvertor();
			this.__emojiConvertor.init_env(); // else auto-detection will trigger when we first convert
			this.__emojiConvertor.replace_mode = 'unified';
			this.__emojiConvertor.allow_native = true;
		}

		return this.__emojiConvertor.replace_colons(string);
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