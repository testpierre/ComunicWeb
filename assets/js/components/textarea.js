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
 * @info {Integer} minHeight The minimal height for the textarea
 * @info {Integer} maxHeight The maximal height for the textarea
 * @info {Boolean} autosize Enable textarea auto-size plugin
 * @return {Boolean} True for a success
 */
textArea2.prototype.init = function(infos){
	
	//Save Textarea element
	this.element = infos.element;

	//Adapt textarea style
	this.element.style.overflow = "hidden";
	this.element.style.resize = "none";

	//Check for minimal and maximal height
	if(infos.minHeight){
		this.element.style.height = infos.minHeight;
		this.element.style.minHeight = infos.minHeight;
	}
	if(infos.maxHeight)
		this.element.style.maxHeight = infos.maxHeight;

	//Initializate textarea auto-size
	if(infos.autosize === undefined || infos.autosize)
		$(this.element).textareaAutoSize();

	//Success
	return true;
};

/**
 * Get the textarea value
 * 
 * @return {String} Textarea value
 */
textArea2.prototype.getValue = function(){
	return this.element.innerText;
};

/**
 * Reset textarea height to its minimal height
 */
textArea2.prototype.resetHeight = function(){
	this.element.style.height = this.element.style.minHeight;
}

//Save the function in the system
ComunicWeb.components.textarea = textArea2;
