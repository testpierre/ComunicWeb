/**
 * Comunic specific text parser
 * 
 * @author Pierre HUBERT
 */

ComunicWeb.components.textParser = {

	/**
	 * Parse an element that contains some user input
	 * 
	 * @param {object} info Information about the element to parse
	 */
	parse: function(info){

		
		//Parse emojies
		ComunicWeb.components.emoji.parser.parse({
			element: info.element
		});

	}


}