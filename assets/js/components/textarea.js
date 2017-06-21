/**
 * Modern textarea handler
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a modern textarea element object
 */
var textArea2 = function(infos){
	//Nothing now
};

/**
 * Initializate textarea 2.0 element
 * 
 * @param {Object} infos Informations about the textarea to enable
 * @info {HTMLElement} element The element to make modern
 */
textArea2.prototype.init = function(infos){
	
	//Save Textarea element
	this.element = infos.element;

	//Adapt textarea style
	this.element.style.overflow = "hidden";

	//Initializate textarea auto-size
	$(this.element).textareaAutoSize();

};

/**
 * Get the textarea value
 * 
 * @return {String} Textarea value
 */
textArea2.prototype.getValue = function(){
	return this.element.innerText;
};

//Save the function in the system
ComunicWeb.components.textarea = textArea2;
