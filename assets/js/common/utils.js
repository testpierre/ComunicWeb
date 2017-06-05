/**
 * Utilities functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a new HTML node
 * 
 * @param {String} nodeType The type of the HTML node
 * @param {HTMLElement} appendTo Optionnal, defines node on which the new node will be applied
 * @return {HTMLElement} The newly created element
 */
function createElem(nodeType, appendTo){
	var newElem = document.createElement(nodeType);

	if(appendTo)
		appendTo.appendChild(newElem);

	//Return result
	return newElem;
}

/**
 * Get an HTML element specified by an ID
 * 
 * @param {String} nodeName The ID of the element
 * @return {HTMLElement} The element / False for a failure
 */
function byId(nodeName){
	return document.getElementById(nodeName);
}

/**
 * Remove all nodes of a specified HTML element
 * 
 * @param {HTMLElement} container The container to empty
 * @return {Boolean} True for a success
 */
function emptyElem(container){
	//Get children references
	var children = container.childNodes;

	//Process each child
	for(i in children){
		if(children[i].remove)
			children[i].remove();
	}
		
	
	//Success
	return true;
}

/**
 * Check a given email address
 * 
 * @param {String} emailAddress The email address to check
 * @return {Boolean} True for a valid email address / false else
 */
function checkMail(emailAddress){
	return (emailAddress.match(/^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]{1,}[.][a-zA-Z]{2,5}$/) === null ? false : true);
}

/**
 * Create a formgroup element
 * 
 * @param {HTMLElement} target The target of the field
 * @param {String} label The label of the field
 * @param {String} placeholder The placeholder of the field
 * @param {String} type The type of the field
 * @return {HTMLElement} The input 
 */
function createFormGroup(target, label, placeholder, type){
	//Create formgroup
	var formGroup = createElem("div", target);
	formGroup.className = "form-group";

	//Add label
	var labelElem = createElem("label", formGroup);
	labelElem.innerHTML = label;

	//Create input group
	var inputGroup = createElem("div", formGroup);
	inputGroup.className = "input-group";

	//Create input
	var input = createElem("input", inputGroup);
	input.type = type;
	input.placeholder = placeholder;


	//Return input
	return input;
}